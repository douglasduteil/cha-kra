import { type Component, createSignal } from "solid-js";
import { Play, Pause } from "lucide-solid";

import { BackArrow } from "~/components/BackArrow";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const Tampura: Component = () => {
  const [is_playing, set_is_playing] = createSignal(false);
  const [selected_note, set_selected_note] = createSignal("C");

  return (
    <div class="flex min-h-full flex-col bg-gray-950/50 px-6 pb-6 dark:bg-transparent">
      <div class="mb-4">
        <BackArrow />
      </div>

      {/* Immersive audio layout */}
      <div class="flex flex-1 flex-col items-center justify-center">
        <p class="mb-2 text-sm font-medium tracking-widest uppercase opacity-50">
          Tampura Drone
        </p>
        <p class="text-chakra mb-10 text-lg">{selected_note()}</p>

        {/* Large play/pause button */}
        <button
          onClick={() => set_is_playing(!is_playing())}
          class="border-chakra bg-chakra/15 hover:bg-chakra/25 flex h-32 w-32 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-105 active:scale-95"
          classList={{
            "shadow-[0_0_40px_var(--color-chakra,transparent)]": is_playing(),
          }}
          aria-label={is_playing() ? "Pause" : "Play"}
        >
          {is_playing() ? (
            <Pause size={40} class="text-chakra" />
          ) : (
            <Play size={40} class="text-chakra ml-1" />
          )}
        </button>
      </div>

      {/* Note selector grid */}
      <div class="mx-auto w-full max-w-sm">
        <h3 class="mb-3 text-center text-sm font-medium tracking-wider uppercase opacity-50">
          Root Note
        </h3>
        <div class="grid grid-cols-4 gap-2">
          {notes.map((note) => (
            <button
              onClick={() => set_selected_note(note)}
              class="rounded-lg py-3 text-center text-sm font-semibold transition-colors"
              classList={{
                "bg-chakra/20 text-chakra border border-chakra/40":
                  selected_note() === note,
                "bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10":
                  selected_note() !== note,
              }}
            >
              {note}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
