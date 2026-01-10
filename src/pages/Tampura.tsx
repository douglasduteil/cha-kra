import { type Component, createSignal } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Tampura: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();
  const [isPlaying, setIsPlaying] = createSignal(false);

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];

  return (
    <div class="flex min-h-full flex-col items-center justify-center p-6">
      <div class="mb-12 text-center">
        <h1 class="mb-2 text-3xl font-bold">Tampura Drone</h1>
        <p class="text-lg opacity-70">Harmonious background for meditation</p>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying())}
        class="mb-12 flex h-40 w-40 items-center justify-center rounded-full text-6xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          "background-color": color(),
          color: isDark() ? "#000000" : "#ffffff",
          "box-shadow": isPlaying() ? `0 0 40px ${color()}` : "none",
        }}
      >
        {isPlaying() ? "⏸" : "▶"}
      </button>

      {/* Note selection */}
      <div class="w-full max-w-md space-y-4">
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
              class="rounded-xl p-4 text-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{
                "background-color": isDark()
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                border: `2px solid ${color()}`,
              }}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Volume control */}
      <div class="mt-8 w-full max-w-md">
        <label class="mb-2 block text-center text-lg font-semibold">
          Volume
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value="50"
          class="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={{
            background: `linear-gradient(to right, ${color()} 0%, ${color()} 50%, ${isDark() ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} 50%, ${isDark() ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} 100%)`,
          }}
        />
      </div>
    </div>
  );
};
