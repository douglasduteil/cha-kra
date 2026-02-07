import { createSignal, onCleanup } from "solid-js";

// --- Recipe types ---

type NoiseColor = "white" | "pink" | "brown";
type FilterType = "lowpass" | "highpass" | "bandpass";

export type NoiseRecipe = {
  type: "noise";
  color: NoiseColor;
  filter?: { type: FilterType; freq: number };
};

export type OscillatorRecipe = {
  type: "oscillator";
  wave: OscillatorType;
  frequency: number;
};

export type TampuraRecipe = {
  type: "tampura";
  frequency: number;
  strings: {
    ratio: number;
    detune_cents: number;
    amplitude: number;
  }[];
  filter_freq: number;
  lfo: { min_rate: number; max_rate: number; depth: number };
};

export type Recipe = NoiseRecipe | OscillatorRecipe | TampuraRecipe;

// --- Lazy singleton AudioContext ---

let audio_ctx: AudioContext | null = null;

function get_audio_context(): AudioContext {
  if (!audio_ctx) {
    audio_ctx = new AudioContext();
  }
  return audio_ctx;
}

// --- Noise buffer cache ---

const buffer_cache = new Map<NoiseColor, AudioBuffer>();

function get_or_create_buffer(
  ctx: AudioContext,
  color: NoiseColor,
): AudioBuffer {
  const cached = buffer_cache.get(color);
  if (cached) return cached;

  const sample_rate = ctx.sampleRate;
  const length = sample_rate * 2; // 2 seconds
  const buffer = ctx.createBuffer(1, length, sample_rate);
  const data = buffer.getChannelData(0);

  switch (color) {
    case "white":
      generate_white_noise(data);
      break;
    case "pink":
      generate_pink_noise(data);
      break;
    case "brown":
      generate_brown_noise(data);
      break;
  }

  buffer_cache.set(color, buffer);
  return buffer;
}

// --- Noise generation ---

function generate_white_noise(data: Float32Array): void {
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
}

function generate_pink_noise(data: Float32Array): void {
  // Voss-McCartney algorithm
  const num_rows = 16;
  const rows = new Float32Array(num_rows);
  let running_sum = 0;

  for (let i = 0; i < num_rows; i++) {
    rows[i] = Math.random() * 2 - 1;
    running_sum += rows[i] as number;
  }

  for (let i = 0; i < data.length; i++) {
    // Find the lowest set bit to determine which row to update
    const changed_bit = ctz(i);
    if (changed_bit < num_rows) {
      running_sum -= rows[changed_bit] as number;
      rows[changed_bit] = Math.random() * 2 - 1;
      running_sum += rows[changed_bit] as number;
    }
    data[i] = running_sum / num_rows;
  }
}

// Count trailing zeros
function ctz(n: number): number {
  if (n === 0) return 32;
  let count = 0;
  while ((n & 1) === 0) {
    count++;
    n >>= 1;
  }
  return count;
}

function generate_brown_noise(data: Float32Array): void {
  let value = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    value += white * 0.02;
    // Clamp to prevent drift
    if (value > 1) value = 1;
    if (value < -1) value = -1;
    data[i] = value;
  }

  // Normalize
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    const abs = Math.abs(data[i]!);
    if (abs > max) max = abs;
  }
  if (max > 0) {
    for (let i = 0; i < data.length; i++) {
      data[i]! /= max;
    }
  }
}

// --- Audio graph building ---

interface ActiveSource {
  sources: (AudioBufferSourceNode | OscillatorNode)[];
  gain: GainNode;
  filter: BiquadFilterNode | undefined;
  extra_nodes: AudioNode[];
  cleanup?: () => void;
}

function build_noise_source(
  ctx: AudioContext,
  recipe: NoiseRecipe,
  gain: GainNode,
): ActiveSource {
  const buffer = get_or_create_buffer(ctx, recipe.color);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  let last_node: AudioNode = source;

  let filter: BiquadFilterNode | undefined;
  if (recipe.filter) {
    filter = ctx.createBiquadFilter();
    filter.type = recipe.filter.type;
    filter.frequency.value = recipe.filter.freq;
    last_node.connect(filter);
    last_node = filter;
  }

  last_node.connect(gain);

  return { sources: [source], gain, filter, extra_nodes: [] };
}

function build_oscillator_source(
  ctx: AudioContext,
  recipe: OscillatorRecipe,
  gain: GainNode,
): ActiveSource {
  const source = ctx.createOscillator();
  source.type = recipe.wave;
  source.frequency.value = recipe.frequency;
  source.connect(gain);

  return { sources: [source], gain, filter: undefined, extra_nodes: [] };
}

function build_tampura_source(
  ctx: AudioContext,
  recipe: TampuraRecipe,
  gain: GainNode,
): ActiveSource {
  const mix = ctx.createGain();
  // Fade in over ~2 seconds for silky onset
  mix.gain.setValueAtTime(0, ctx.currentTime);
  mix.gain.setTargetAtTime(1, ctx.currentTime, 0.5);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = recipe.filter_freq;

  mix.connect(filter);
  filter.connect(gain);

  const oscillators: OscillatorNode[] = [];
  const extra_nodes: AudioNode[] = [mix];

  for (let si = 0; si < recipe.strings.length; si++) {
    const s = recipe.strings[si]!;

    // One sawtooth per string — naturally rich in harmonics
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = recipe.frequency * s.ratio;
    osc.detune.value = s.detune_cents;

    const string_gain = ctx.createGain();
    string_gain.gain.value = s.amplitude;
    extra_nodes.push(string_gain);

    osc.connect(string_gain);
    string_gain.connect(mix);
    oscillators.push(osc);

    // Per-string slow random LFO for organic breathing
    const lfo_rate =
      recipe.lfo.min_rate +
      Math.random() * (recipe.lfo.max_rate - recipe.lfo.min_rate);
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = lfo_rate;

    const lfo_scale = ctx.createGain();
    lfo_scale.gain.value = s.amplitude * recipe.lfo.depth;
    extra_nodes.push(lfo_scale);

    lfo.connect(lfo_scale);
    lfo_scale.connect(string_gain.gain);
    oscillators.push(lfo);
  }

  return { sources: oscillators, gain, filter, extra_nodes };
}

// --- Reactive primitive ---

export function create_audio(): {
  play: (recipe: Recipe) => void;
  stop: () => void;
  set_volume: (volume: number) => void;
  playing: () => boolean;
} {
  const [playing, set_playing] = createSignal(false);
  let active: ActiveSource | null = null;
  let component_gain: GainNode | null = null;

  function teardown(): void {
    if (active) {
      for (const src of active.sources) {
        try {
          src.stop();
        } catch {
          // Already stopped
        }
        src.disconnect();
      }
      if (active.filter) active.filter.disconnect();
      for (const node of active.extra_nodes) {
        node.disconnect();
      }
      if (active.cleanup) active.cleanup();
      active = null;
    }
    set_playing(false);
  }

  function play(recipe: Recipe): void {
    teardown();

    const ctx = get_audio_context();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    if (!component_gain) {
      component_gain = ctx.createGain();
      component_gain.connect(ctx.destination);
    }

    if (recipe.type === "noise") {
      active = build_noise_source(ctx, recipe, component_gain);
    } else if (recipe.type === "oscillator") {
      active = build_oscillator_source(ctx, recipe, component_gain);
    } else {
      active = build_tampura_source(ctx, recipe, component_gain);
    }

    for (const src of active.sources) {
      src.start();
    }
    set_playing(true);
  }

  function stop(): void {
    teardown();
  }

  function set_volume(volume: number): void {
    if (component_gain) {
      component_gain.gain.value = volume;
    }
  }

  // Automatic cleanup on component unmount
  onCleanup(() => {
    teardown();
    if (component_gain) {
      component_gain.disconnect();
      component_gain = null;
    }
  });

  return { play, stop, set_volume, playing };
}
