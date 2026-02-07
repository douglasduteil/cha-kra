import { type Component, createSignal } from "solid-js";
import { Play, Pause } from "lucide-solid";

import { BackArrow } from "~/components/BackArrow";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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
        {/* Player Area */}
        <div class="border-chakra/20 flex flex-col items-center justify-center gap-8 rounded-3xl border bg-white/50 p-12 shadow-sm backdrop-blur-md lg:min-h-[400px] dark:border-white/10 dark:bg-black/20 dark:shadow-none">
          <div class="text-center">
            <p class="mb-2 text-sm font-medium tracking-widest uppercase opacity-50">
              Currently Playing
            </p>
            <p class="text-chakra text-6xl font-light">{selected_note()}</p>
          </div>

          <button
            onClick={() => set_is_playing(!is_playing())}
            class="border-chakra bg-chakra/10 hover:bg-chakra/20 text-chakra flex h-32 w-32 items-center justify-center rounded-full border-2 transition-all duration-500 hover:scale-110 active:scale-95"
            classList={{
              "shadow-[0_0_50px_var(--color-chakra)] animate-pulse":
                is_playing(),
            }}
            aria-label={is_playing() ? "Pause" : "Play"}
          >
            {is_playing() ? (
              <Pause size={48} />
            ) : (
              <Play size={48} class="ml-2" />
            )}
          </button>
        </div>

        {/* Note Selector */}
        <div class="border-chakra/20 rounded-3xl border bg-white/50 p-8 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
          <h3 class="mb-6 text-center text-sm font-medium tracking-wider uppercase opacity-50">
            Select Root Note
          </h3>
          <div class="grid grid-cols-4 gap-3">
            {notes.map((note) => (
              <button
                onClick={() => set_selected_note(note)}
                class="aspect-square rounded-xl text-lg font-medium transition-all duration-200 hover:scale-105"
                classList={{
                  "bg-chakra text-white shadow-lg shadow-chakra/30":
                    selected_note() === note,
                  "bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
                    selected_note() !== note,
                }}
              >
                {note}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
