import {
  Play,
  Pause,
  CloudRain,
  Waves,
  TreePine,
  Flame,
  Wind,
  Droplets,
  CloudLightning,
  Radio,
} from "lucide-solid";
import { type Component, createSignal, Show } from "solid-js";

import { type NoiseRecipe, create_audio } from "~/stores/audio_engine";
import { BackArrow } from "~/components/BackArrow";

const sounds: {
  id: string;
  name: string;
  icon: Component<{ size?: number; class?: string }>;
  recipe: NoiseRecipe;
}[] = [
  {
    id: "rain",
    name: "Rain",
    icon: CloudRain,
    recipe: {
      type: "noise",
      color: "pink",
      filter: { type: "lowpass", freq: 600 },
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    icon: Waves,
    recipe: {
      type: "noise",
      color: "brown",
      filter: { type: "lowpass", freq: 300 },
    },
  },
  {
    id: "forest",
    name: "Forest",
    icon: TreePine,
    recipe: {
      type: "noise",
      color: "pink",
      filter: { type: "bandpass", freq: 800 },
    },
  },
  {
    id: "fire",
    name: "Fire",
    icon: Flame,
    recipe: {
      type: "noise",
      color: "brown",
      filter: { type: "bandpass", freq: 400 },
    },
  },
  {
    id: "wind",
    name: "Wind",
    icon: Wind,
    recipe: {
      type: "noise",
      color: "white",
      filter: { type: "lowpass", freq: 500 },
    },
  },
  {
    id: "stream",
    name: "Stream",
    icon: Droplets,
    recipe: {
      type: "noise",
      color: "white",
      filter: { type: "bandpass", freq: 2000 },
    },
  },
  {
    id: "thunder",
    name: "Thunder",
    icon: CloudLightning,
    recipe: { type: "noise", color: "brown" },
  },
  {
    id: "white",
    name: "White Noise",
    icon: Radio,
    recipe: { type: "noise", color: "white" },
  },
];

const SoundGrid: Component<{
  selected: string | null;
  onSelect: (id: string) => void;
}> = (props) => {
  return (
    <div class="border-chakra/20 rounded-3xl border bg-white/50 p-8 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {sounds.map((sound) => (
          <button
            onClick={() => props.onSelect(sound.id)}
            class="flex flex-col items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.05]"
            classList={{
              "bg-chakra text-white shadow-lg shadow-chakra/30":
                props.selected === sound.id,
              "bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
                props.selected !== sound.id,
            }}
          >
            <sound.icon
              size={32}
              class={props.selected === sound.id ? "text-white" : "opacity-60"}
            />
            <span class="text-sm font-medium">{sound.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const PlayerControls: Component<{
  selected: string | null;
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}> = (props) => {
  const currentSound = () => sounds.find((s) => s.id === props.selected);

  return (
    <div class="border-chakra/20 flex flex-col items-center justify-center gap-8 rounded-3xl border bg-white/50 p-12 shadow-sm backdrop-blur-md lg:min-h-[400px] dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <Show
        when={props.selected}
        fallback={
          <div class="text-center opacity-40">
            <Radio size={64} class="mx-auto mb-4" />
            <p>Select a sound to begin</p>
          </div>
        }
      >
        <div class="animate-in fade-in w-full max-w-xs text-center duration-500">
          <div class="bg-chakra/10 text-chakra mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl">
            <Show when={currentSound()} keyed>
              {(s) => <s.icon size={48} />}
            </Show>
          </div>

          <h2 class="mb-8 text-2xl font-bold">{currentSound()?.name}</h2>

          <div class="flex flex-col items-center gap-6">
            <button
              onClick={props.onToggle}
              class="border-chakra bg-chakra/10 hover:bg-chakra/20 text-chakra flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {props.isPlaying ? (
                <Pause size={32} />
              ) : (
                <Play size={32} class="ml-1" />
              )}
            </button>

            <div class="w-full space-y-2">
              <div class="flex justify-between text-xs font-medium tracking-widest uppercase opacity-50">
                <span>Volume</span>
                <span>{Math.round(props.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(props.volume * 100)}
                onInput={(e) =>
                  props.onVolumeChange(parseInt(e.currentTarget.value) / 100)
                }
                class="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-[var(--color-chakra)] dark:bg-white/10"
              />
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export const WhiteNoise: Component = () => {
  const [selected, set_selected] = createSignal<string | null>(null);
  const [volume, set_volume] = createSignal(0.5);
  const audio = create_audio();

  const is_playing = audio.playing;

  const handle_select = (id: string) => {
    set_selected(id);
    const sound = sounds.find((s) => s.id === id);
    if (sound) {
      audio.play(sound.recipe);
    }
  };

  const handle_toggle = () => {
    if (is_playing()) {
      audio.stop();
    } else {
      const sound = sounds.find((s) => s.id === selected());
      if (sound) {
        audio.play(sound.recipe);
      }
    }
  };

  const handle_volume_change = (v: number) => {
    set_volume(v);
    audio.set_volume(v);
  };

  return (
    <div class="space-y-6">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Ambient Sounds</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        <SoundGrid selected={selected()} onSelect={handle_select} />

        <PlayerControls
          selected={selected()}
          isPlaying={is_playing()}
          volume={volume()}
          onToggle={handle_toggle}
          onVolumeChange={handle_volume_change}
        />
      </div>
    </div>
  );
};
