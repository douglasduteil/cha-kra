import { Sun, Moon, Monitor } from "lucide-solid";
import { type Component, For } from "solid-js";

import {
  useTheme,
  type Theme,
  type ChakraColor,
  chakraColors,
  chakraNames,
} from "~/stores/theme";
import { BackArrow } from "~/components/BackArrow";

const theme_options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
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

export const Settings: Component = () => {
  const { theme, setTheme, effectiveTheme, chakraColor, setChakraColor } =
    useTheme();

  const swatch_color = (chakra: ChakraColor) => {
    const mode = effectiveTheme();
    return chakraColors[chakra][mode];
  };

  return (
    <div class="flex min-h-full flex-col px-6 pb-6">
      <div class="mb-4">
        <BackArrow />
      </div>

      <h1 class="mb-6 text-2xl font-bold">Settings</h1>

      <div class="space-y-8">
        {/* Theme selection */}
        <section>
          <h2 class="mb-4 text-xl font-semibold">Theme</h2>
          <div class="grid grid-cols-3 gap-3">
            <For each={theme_options}>
              {(option) => (
                <button
                  onClick={() => setTheme(option.value)}
                  class="flex flex-col items-center gap-2 rounded-xl py-4 transition-all duration-200 hover:scale-105"
                  classList={{
                    "bg-chakra/20 border border-chakra/40":
                      theme() === option.value,
                    "bg-black/5 dark:bg-white/5": theme() !== option.value,
                  }}
                >
                  <option.Icon
                    size={24}
                    class={
                      theme() === option.value ? "text-chakra" : "opacity-60"
                    }
                  />
                  <span class="text-sm font-semibold">{option.label}</span>
                </button>
              )}
            </For>
          </div>
        </section>

        {/* Chakra color selection */}
        <section>
          <h2 class="mb-2 text-xl font-semibold">Energy Center</h2>
          <p class="mb-4 text-sm opacity-60">
            Choose a chakra to set your app's color theme
          </p>
          <div class="space-y-2">
            <For each={chakras}>
              {(chakra) => (
                <button
                  onClick={() => setChakraColor(chakra)}
                  class="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:scale-[1.01]"
                  classList={{
                    "bg-chakra/15 border border-chakra/30":
                      chakraColor() === chakra,
                    "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10":
                      chakraColor() !== chakra,
                  }}
                >
                  <div
                    class="h-8 w-8 shrink-0 rounded-full"
                    style={{ "background-color": swatch_color(chakra) }}
                  />
                  <span class="font-medium">{chakraNames[chakra]}</span>
                </button>
              )}
            </For>
          </div>
        </section>

        {/* App info */}
        <section class="pt-4">
          <div class="rounded-xl bg-black/5 p-6 text-center dark:bg-white/5">
            <h3 class="mb-1 text-lg font-semibold">Cha-Kra</h3>
            <p class="text-sm opacity-60">Version 1.0.0</p>
            <p class="text-sm opacity-60">
              Find balance through mindful practice
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
