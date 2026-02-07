import { type Component, createSignal } from "solid-js";
import { Play, Pause } from "lucide-solid";

import { BackArrow } from "~/components/BackArrow";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const TampuraPlayer: Component<{
  note: string;
  isPlaying: boolean;
  onToggle: () => void;
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
  const [is_playing, set_is_playing] = createSignal(false);
  const [selected_note, set_selected_note] = createSignal("C");

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
          onToggle={() => set_is_playing(!is_playing())}
        />

        <NoteSelector
          selectedNote={selected_note()}
          onSelect={set_selected_note}
        />
      </div>
    </div>
  );
};
