import { type Component, createSignal } from "solid-js";
import { Play, Pause } from "lucide-solid";

import { type TampuraRecipe, create_audio } from "~/stores/audio_engine";
import { BackArrow } from "~/components/BackArrow";

const NOTE_FREQUENCIES: Record<string, number> = {
  C: 130.81,
  "C#": 138.59,
  D: 146.83,
  "D#": 155.56,
  E: 164.81,
  F: 174.61,
  "F#": 185.0,
  G: 196.0,
  "G#": 207.65,
  A: 220.0,
  "A#": 233.08,
  B: 246.94,
};

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function note_recipe(note: string): TampuraRecipe {
  const frequency = NOTE_FREQUENCIES[note] ?? 130.81;
  return {
    type: "tampura",
    frequency,
    strings: [
      { ratio: 1, detune_cents: -4, amplitude: 0.35 },
      { ratio: 1.5, detune_cents: 3, amplitude: 0.22 },
      { ratio: 1, detune_cents: 2, amplitude: 0.3 },
      { ratio: 0.5, detune_cents: -6, amplitude: 0.25 },
    ],
    filter_freq: 1200,
    lfo: { min_rate: 0.01, max_rate: 0.1, depth: 0.6 },
  };
}

const TampuraPlayer: Component<{
  note: string;
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}> = (props) => {
  return (
    <div class="border-chakra/20 flex flex-col items-center justify-center gap-10 rounded-3xl border bg-white/50 p-12 shadow-sm backdrop-blur-md lg:min-h-[400px] dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <div class="text-center">
        <p class="mb-4 text-sm font-semibold tracking-[0.2em] uppercase opacity-50">
          Currently Playing
        </p>
        <p class="text-chakra text-7xl font-light tracking-tight">
          {props.note}
        </p>
      </div>

      <button
        onClick={props.onToggle}
        class="border-chakra bg-chakra/10 hover:bg-chakra/20 text-chakra flex h-32 w-32 items-center justify-center rounded-full border-2 transition-all duration-500 hover:scale-110 active:scale-95"
        classList={{
          "shadow-[0_0_60px_var(--color-chakra)] animate-pulse":
            props.isPlaying,
        }}
        aria-label={props.isPlaying ? "Pause" : "Play"}
      >
        {props.isPlaying ? (
          <Pause size={48} />
        ) : (
          <Play size={48} class="ml-2" />
        )}
      </button>

      <div class="w-full max-w-xs space-y-2">
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
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

const NoteSelector: Component<{
  selectedNote: string;
  onSelect: (note: string) => void;
}> = (props) => {
  return (
    <div class="border-chakra/20 rounded-3xl border bg-white/50 p-10 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <h3 class="mb-8 text-center text-sm font-semibold tracking-wider uppercase opacity-50">
        Select Root Note
      </h3>
      <div class="grid grid-cols-4 gap-4">
        {notes.map((note) => (
          <button
            onClick={() => props.onSelect(note)}
            class="aspect-square rounded-2xl text-lg font-medium transition-all duration-200 hover:scale-105"
            classList={{
              "bg-chakra text-white shadow-lg shadow-chakra/30":
                props.selectedNote === note,
              "bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
                props.selectedNote !== note,
            }}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Tampura: Component = () => {
  const [selected_note, set_selected_note] = createSignal("C");
  const [volume, set_volume] = createSignal(0.5);
  const audio = create_audio();

  const is_playing = audio.playing;

  const handle_toggle = () => {
    if (is_playing()) {
      audio.stop();
    } else {
      audio.play(note_recipe(selected_note()));
      audio.set_volume(volume());
    }
  };

  const handle_note_select = (note: string) => {
    set_selected_note(note);
    if (is_playing()) {
      audio.play(note_recipe(note));
      audio.set_volume(volume());
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
        <h1 class="text-center text-2xl font-bold">Tampura Drone</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        <TampuraPlayer
          note={selected_note()}
          isPlaying={is_playing()}
          volume={volume()}
          onToggle={handle_toggle}
          onVolumeChange={handle_volume_change}
        />

        <NoteSelector
          selectedNote={selected_note()}
          onSelect={handle_note_select}
        />
      </div>
    </div>
  );
};
