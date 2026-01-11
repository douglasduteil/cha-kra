import { type Component, For } from "solid-js";

import {
  useTheme,
  type Theme,
  type ChakraColor,
  chakraColors,
  chakraNames,
} from "~/stores/theme";

export const Settings: Component = () => {
  const { theme, setTheme, effectiveTheme, chakraColor, setChakraColor } =
    useTheme();

  const isDark = () => effectiveTheme() === "dark";

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "system", label: "System", icon: "💻" },
  ];

  const chakras: ChakraColor[] = [
    "root",
    "sacral",
    "solar",
    "heart",
    "throat",
    "third",
    "crown",
  ];

  return (
    <div class="flex min-h-full flex-col">
      <div class="mb-10">
        <h1 class="mb-3 text-3xl font-bold tracking-tight">Settings</h1>
        <p
          class="text-xl"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          Customize your experience
        </p>
      </div>

      <div class="space-y-12">
        {/* Theme selection */}
        <section>
          <h2 class="mb-5 text-2xl font-semibold">Theme</h2>
          <div class="grid grid-cols-3 gap-4">
            <For each={themes}>
              {(themeOption) => (
                <button
                  onClick={() => setTheme(themeOption.value)}
                  class="rounded-xl p-5 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                  classList={{
                    "bg-gray-900 text-white":
                      !isDark() && theme() === themeOption.value,
                    "bg-white text-gray-900":
                      isDark() && theme() === themeOption.value,
                    "bg-white hover:bg-gray-50":
                      !isDark() && theme() !== themeOption.value,
                    "bg-gray-900 hover:bg-gray-800":
                      isDark() && theme() !== themeOption.value,
                  }}
                >
                  <div class="mb-2 text-3xl">{themeOption.icon}</div>
                  <div class="font-semibold">{themeOption.label}</div>
                </button>
              )}
            </For>
          </div>
        </section>

        {/* Chakra color selection */}
        <section>
          <h2 class="mb-5 text-2xl font-semibold">Energy Center</h2>
          <p
            class="mb-5"
            classList={{
              "text-gray-600": !isDark(),
              "text-gray-400": isDark(),
            }}
          >
            Choose a chakra to set your app's color theme
          </p>
          <div class="space-y-3">
            <For each={chakras}>
              {(chakra) => (
                <button
                  onClick={() => setChakraColor(chakra)}
                  class="w-full rounded-xl p-5 text-left shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                  classList={{
                    "bg-white hover:bg-gray-50":
                      !isDark() && chakraColor() !== chakra,
                    "bg-gray-900 hover:bg-gray-800":
                      isDark() && chakraColor() !== chakra,
                    "ring-2": chakraColor() === chakra,
                  }}
                  style={{
                    "background-color":
                      chakraColor() === chakra ? chakraColors[chakra] : undefined,
                    color:
                      chakraColor() === chakra
                        ? isDark()
                          ? "#000000"
                          : "#ffffff"
                        : undefined,
                    "ring-color": chakraColors[chakra],
                  }}
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="h-12 w-12 shrink-0 rounded-full shadow-md"
                      style={{ "background-color": chakraColors[chakra] }}
                    />
                    <div class="flex-1">
                      <div class="text-lg font-semibold">
                        {chakraNames[chakra]}
                      </div>
                    </div>
                  </div>
                </button>
              )}
            </For>
          </div>
        </section>

        {/* App info */}
        <section class="pt-8">
          <div
            class="rounded-xl p-8 text-center shadow-md"
            classList={{
              "bg-white": !isDark(),
              "bg-gray-900": isDark(),
            }}
          >
            <h3 class="mb-2 text-xl font-semibold">Cha-Kra</h3>
            <p
              class="mb-1"
              classList={{
                "text-gray-600": !isDark(),
                "text-gray-400": isDark(),
              }}
            >
              Version 1.0.0
            </p>
            <p
              classList={{
                "text-gray-600": !isDark(),
                "text-gray-400": isDark(),
              }}
            >
              Find balance through mindful practice
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
