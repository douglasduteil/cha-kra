import { type Component } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Movement: Component = () => {
  const { effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";

  return (
    <div class="flex min-h-full flex-col">
      <div class="mb-10">
        <h1 class="mb-3 text-3xl font-bold tracking-tight">Movement & Yoga</h1>
        <p
          class="text-xl"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          Flow with intention and grace
        </p>
      </div>

      <div class="flex-1 space-y-5">
        {[
          {
            name: "Sun Salutation",
            description: "Energize your body and mind",
            duration: "15 min",
          },
          {
            name: "Gentle Flow",
            description: "Easy movements for relaxation",
            duration: "20 min",
          },
          {
            name: "Chakra Alignment",
            description: "Poses to balance energy centers",
            duration: "30 min",
          },
          {
            name: "Yin Yoga",
            description: "Deep stretches and stillness",
            duration: "45 min",
          },
        ].map((exercise) => (
          <button
            class="w-full rounded-2xl p-7 text-left shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            classList={{
              "bg-white hover:bg-gray-50": !isDark(),
              "bg-gray-900 hover:bg-gray-800": isDark(),
            }}
          >
            <div class="mb-3 flex items-center justify-between gap-4">
              <h3 class="text-xl font-semibold tracking-tight">
                {exercise.name}
              </h3>
              <span
                class="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium"
                classList={{
                  "bg-gray-900 text-white": !isDark(),
                  "bg-white text-gray-900": isDark(),
                }}
              >
                {exercise.duration}
              </span>
            </div>
            <p
              classList={{
                "text-gray-600": !isDark(),
                "text-gray-400": isDark(),
              }}
            >
              {exercise.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
