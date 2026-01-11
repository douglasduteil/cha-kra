import { type Component } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Mantra: Component = () => {
  const { effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";

  return (
    <div class="flex min-h-full flex-col">
      <div class="mb-10">
        <h1 class="mb-3 text-3xl font-bold tracking-tight">
          Mantra Meditation
        </h1>
        <p
          class="text-xl"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          Sacred sounds for inner transformation
        </p>
      </div>

      <div class="flex-1 space-y-5">
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
            class="w-full rounded-2xl p-7 text-left shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            classList={{
              "bg-white hover:bg-gray-50": !isDark(),
              "bg-gray-900 hover:bg-gray-800": isDark(),
            }}
          >
            <div class="mb-3 flex items-center justify-between gap-4">
              <h3 class="text-xl font-semibold tracking-tight">{mantra.name}</h3>
              <span
                class="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium"
                classList={{
                  "bg-gray-900 text-white": !isDark(),
                  "bg-white text-gray-900": isDark(),
                }}
              >
                {mantra.chakra}
              </span>
            </div>
            <p
              classList={{
                "text-gray-600": !isDark(),
                "text-gray-400": isDark(),
              }}
            >
              {mantra.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
