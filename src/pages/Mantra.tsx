import { type Component } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Mantra: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];

  return (
    <div class="flex min-h-full flex-col p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Mantra Meditation</h1>
        <p class="text-lg opacity-70">Sacred sounds for inner transformation</p>
      </div>

      <div class="flex-1 space-y-4">
        {[
          {
            name: "Om (Aum)",
            description: "The primordial sound of the universe",
            chakra: "Crown",
          },
          {
            name: "So Hum",
            description: "I am that - breath awareness",
            chakra: "Heart",
          },
          {
            name: "Om Mani Padme Hum",
            description: "Compassion and wisdom",
            chakra: "Heart",
          },
          {
            name: "Gayatri Mantra",
            description: "Illumination and guidance",
            chakra: "Third Eye",
          },
          {
            name: "Lam",
            description: "Root chakra activation",
            chakra: "Root",
          },
        ].map((mantra) => (
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
              <h3 class="text-xl font-semibold">{mantra.name}</h3>
              <span
                class="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  "background-color": color(),
                  color: isDark() ? "#000000" : "#ffffff",
                }}
              >
                {mantra.chakra}
              </span>
            </div>
            <p class="opacity-70">{mantra.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
