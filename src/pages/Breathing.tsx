import { type Component } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Breathing: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];

  return (
    <div class="flex min-h-full flex-col p-6">
      {/* Header */}
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Breathing Exercises</h1>
        <p class="text-lg opacity-70">Control your breath, control your mind</p>
      </div>

      {/* Breathing exercises list */}
      <div class="flex-1 space-y-4">
        {[
          {
            name: "4-7-8 Breathing",
            description: "Inhale for 4, hold for 7, exhale for 8",
            duration: "5 min",
          },
          {
            name: "Box Breathing",
            description: "Equal counts for inhale, hold, exhale, hold",
            duration: "10 min",
          },
          {
            name: "Alternate Nostril",
            description: "Balance left and right energy channels",
            duration: "8 min",
          },
          {
            name: "Deep Belly Breathing",
            description: "Engage diaphragm for full oxygen exchange",
            duration: "7 min",
          },
        ].map((exercise) => (
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
              <h3 class="text-xl font-semibold">{exercise.name}</h3>
              <span
                class="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  "background-color": color(),
                  color: isDark() ? "#000000" : "#ffffff",
                }}
              >
                {exercise.duration}
              </span>
            </div>
            <p class="opacity-70">{exercise.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
