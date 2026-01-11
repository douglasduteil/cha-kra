import { type Component, createSignal } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const WhiteNoise: Component = () => {
  const { effectiveTheme } = useTheme();
  const [selectedNoise, setSelectedNoise] = createSignal<string | null>(null);
  const [isPlaying, setIsPlaying] = createSignal(false);

  const isDark = () => effectiveTheme() === "dark";

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
    <div class="flex min-h-full flex-col">
      <div class="mb-10">
        <h1 class="mb-3 text-3xl font-bold tracking-tight">Ambient Sounds</h1>
        <p
          class="text-xl"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          Natural soundscapes for focus and calm
        </p>
      </div>

      <div class="mb-8 grid grid-cols-2 gap-4">
        {noises.map((noise) => (
          <button
            onClick={() => {
              setSelectedNoise(noise.id);
              setIsPlaying(true);
            }}
            class="rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            classList={{
              "bg-white hover:bg-gray-50":
                !isDark() && selectedNoise() !== noise.id,
              "bg-gray-900 hover:bg-gray-800":
                isDark() && selectedNoise() !== noise.id,
              "bg-gray-900 text-white ring-2 ring-gray-900":
                !isDark() && selectedNoise() === noise.id,
              "bg-white text-gray-900 ring-2 ring-white":
                isDark() && selectedNoise() === noise.id,
            }}
          >
            <div class="mb-2 text-4xl">{noise.icon}</div>
            <h3 class="mb-1 text-lg font-semibold">{noise.name}</h3>
            <p
              class="text-sm"
              classList={{
                "text-gray-600": !isDark() && selectedNoise() !== noise.id,
                "text-gray-400": isDark() && selectedNoise() !== noise.id,
                "text-gray-300": !isDark() && selectedNoise() === noise.id,
                "text-gray-600": isDark() && selectedNoise() === noise.id,
              }}
            >
              {noise.description}
            </p>
          </button>
        ))}
      </div>

      {selectedNoise() && (
        <div class="mt-auto space-y-6">
          {/* Play/Pause control */}
          <div class="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying())}
              class="flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
              classList={{
                "bg-gray-900 text-white": !isDark(),
                "bg-white text-gray-900": isDark(),
              }}
            >
              {isPlaying() ? "⏸" : "▶"}
            </button>
          </div>

          {/* Volume control */}
          <div class="w-full">
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
      )}
    </div>
  );
};
