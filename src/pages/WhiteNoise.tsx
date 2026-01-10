import { type Component, createSignal } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const WhiteNoise: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();
  const [selectedNoise, setSelectedNoise] = createSignal<string | null>(null);
  const [isPlaying, setIsPlaying] = createSignal(false);

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];

  const noises = [
    { id: "rain", name: "Rain", icon: "🌧️", description: "Gentle rainfall" },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: "🌊",
      description: "Calming sea sounds",
    },
    {
      id: "forest",
      name: "Forest",
      icon: "🌲",
      description: "Birds and rustling leaves",
    },
    {
      id: "fire",
      name: "Crackling Fire",
      icon: "🔥",
      description: "Warm fireplace ambiance",
    },
    { id: "wind", name: "Wind", icon: "💨", description: "Soft breeze sounds" },
    { id: "stream", name: "Stream", icon: "💧", description: "Babbling brook" },
    {
      id: "thunder",
      name: "Thunder",
      icon: "⛈️",
      description: "Distant storm",
    },
    {
      id: "white",
      name: "White Noise",
      icon: "📻",
      description: "Pure static sound",
    },
  ];

  return (
    <div class="flex min-h-full flex-col p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Ambient Sounds</h1>
        <p class="text-lg opacity-70">Natural soundscapes for focus and calm</p>
      </div>

      <div class="mb-6 grid grid-cols-2 gap-4">
        {noises.map((noise) => (
          <button
            onClick={() => {
              setSelectedNoise(noise.id);
              setIsPlaying(true);
            }}
            class="rounded-2xl p-6 text-center transition-all duration-200 hover:scale-[1.02]"
            classList={{
              "ring-2": selectedNoise() === noise.id,
            }}
            style={{
              "background-color": isDark()
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
              border: `2px solid ${selectedNoise() === noise.id ? color() : "transparent"}`,
              "ring-color": color(),
            }}
          >
            <div class="mb-2 text-4xl">{noise.icon}</div>
            <h3 class="mb-1 text-lg font-semibold">{noise.name}</h3>
            <p class="text-sm opacity-70">{noise.description}</p>
          </button>
        ))}
      </div>

      {selectedNoise() && (
        <div class="mt-auto space-y-4">
          {/* Play/Pause control */}
          <div class="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying())}
              class="flex h-16 w-16 items-center justify-center rounded-full text-3xl transition-all duration-200 hover:scale-110"
              style={{
                "background-color": color(),
                color: isDark() ? "#000000" : "#ffffff",
              }}
            >
              {isPlaying() ? "⏸" : "▶"}
            </button>
          </div>

          {/* Volume control */}
          <div class="w-full">
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
      )}
    </div>
  );
};
