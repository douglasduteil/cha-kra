import { type Component } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Guided: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];

  return (
    <div class="flex min-h-full flex-col p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Guided Meditations</h1>
        <p class="text-lg opacity-70">Let gentle voices guide your journey</p>
      </div>

      <div class="flex-1 space-y-4">
        {[
          {
            name: "Body Scan",
            description: "Progressive relaxation meditation",
            duration: "15 min",
          },
          {
            name: "Loving Kindness",
            description: "Cultivate compassion for all beings",
            duration: "12 min",
          },
          {
            name: "Chakra Journey",
            description: "Travel through all seven energy centers",
            duration: "25 min",
          },
          {
            name: "Sleep Meditation",
            description: "Drift into peaceful rest",
            duration: "30 min",
          },
          {
            name: "Morning Intention",
            description: "Set your purpose for the day",
            duration: "10 min",
          },
        ].map((meditation) => (
          <button
            class="w-full rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02]"
            style={{
              "background-color": isDark()
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
              border: `2px solid ${color()}`,
            }}
          >
            <div class="mb-2 flex items-center justify-between">
              <h3 class="text-xl font-semibold">{meditation.name}</h3>
              <span
                class="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  "background-color": color(),
                  color: isDark() ? "#000000" : "#ffffff",
                }}
              >
                {meditation.duration}
              </span>
            </div>
            <p class="opacity-70">{meditation.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
