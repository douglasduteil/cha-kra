import { type Component, createSignal } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Tampura: Component = () => {
  const { effectiveTheme } = useTheme();
  const [isPlaying, setIsPlaying] = createSignal(false);

  const isDark = () => effectiveTheme() === "dark";

  return (
    <div class="flex min-h-full flex-col items-center justify-center">
      <div class="mb-16 text-center">
        <h1 class="mb-3 text-3xl font-bold tracking-tight">Tampura Drone</h1>
        <p
          class="text-xl"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          Harmonious background for meditation
        </p>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying())}
        class="mb-16 flex h-40 w-40 items-center justify-center rounded-full text-6xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
        classList={{
          "bg-gray-900 text-white": !isDark(),
          "bg-white text-gray-900": isDark(),
          "shadow-2xl": isPlaying(),
        }}
      >
        {isPlaying() ? "⏸" : "▶"}
      </button>

      {/* Note selection */}
      <div class="w-full max-w-lg space-y-6">
        <h3 class="text-center text-xl font-semibold">Select Root Note</h3>
        <div class="grid grid-cols-4 gap-3">
          {[
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
          ].map((note) => (
            <button
              class="rounded-xl p-5 text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              classList={{
                "bg-white hover:bg-gray-50": !isDark(),
                "bg-gray-900 hover:bg-gray-800": isDark(),
              }}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Volume control */}
      <div class="mt-12 w-full max-w-lg">
        <label class="mb-3 block text-center text-lg font-semibold">
          Volume
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value="50"
          class="h-2 w-full cursor-pointer appearance-none rounded-lg transition-all"
          classList={{
            "bg-gray-300": !isDark(),
            "bg-gray-700": isDark(),
          }}
        />
      </div>
    </div>
  );
};
