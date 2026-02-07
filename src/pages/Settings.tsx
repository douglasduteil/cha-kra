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

const AppearanceSettings: Component<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}> = (props) => {
  return (
    <section class="border-chakra/20 rounded-3xl border bg-white/50 p-8 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <h2 class="mb-6 text-xl font-bold">Appearance</h2>
      <div class="grid grid-cols-3 gap-4">
        <For each={theme_options}>
          {(option) => (
            <button
              onClick={() => props.setTheme(option.value)}
              class="flex flex-col items-center gap-3 rounded-2xl py-6 transition-all duration-300 hover:scale-[1.05]"
              classList={{
                "bg-chakra text-white shadow-lg shadow-chakra/30":
                  props.theme === option.value,
                "bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
                  props.theme !== option.value,
              }}
            >
              <option.Icon size={24} />
              <span class="text-sm font-semibold">{option.label}</span>
            </button>
          )}
        </For>
      </div>
    </section>
  );
};

const AppInfo: Component = () => {
  return (
    <section class="border-chakra/20 rounded-3xl border bg-white/50 p-8 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <h3 class="mb-2 text-lg font-bold">Cha-Kra</h3>
      <p class="text-sm opacity-60">Version 1.0.0</p>
      <p class="mt-4 text-sm font-medium opacity-60">
        Find balance through mindful practice
      </p>
    </section>
  );
};

const EnergyCenterSettings: Component<{
  chakraColor: ChakraColor;
  setChakraColor: (chakra: ChakraColor) => void;
  swatchColor: (chakra: ChakraColor) => string;
}> = (props) => {
  return (
    <section class="border-chakra/20 rounded-3xl border bg-white/50 p-8 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <h2 class="mb-2 text-xl font-bold">Energy Center</h2>
      <p class="mb-6 text-sm opacity-60">
        Choose a chakra to set your app's color theme
      </p>
      <div class="space-y-3">
        <For each={chakras}>
          {(chakra) => (
            <button
              onClick={() => props.setChakraColor(chakra)}
              class="group flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left transition-all duration-300 hover:scale-[1.02]"
              classList={{
                "bg-chakra/10 border-chakra border":
                  props.chakraColor === chakra,
                "bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10 border-transparent border":
                  props.chakraColor !== chakra,
              }}
            >
              <div
                class="h-10 w-10 shrink-0 rounded-full shadow-sm transition-transform group-hover:scale-110"
                style={{ "background-color": props.swatchColor(chakra) }}
              />
              <span class="text-lg font-medium">{chakraNames[chakra]}</span>
              {props.chakraColor === chakra && (
                <div class="bg-chakra ml-auto h-2 w-2 rounded-full" />
              )}
            </button>
          )}
        </For>
      </div>
    </section>
  );
};

export const Settings: Component = () => {
  const { theme, setTheme, effectiveTheme, chakraColor, setChakraColor } =
    useTheme();

  const swatch_color = (chakra: ChakraColor) => {
    const mode = effectiveTheme();
    return chakraColors[chakra][mode];
  };

  return (
    <div class="space-y-6">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Settings</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left Column */}
        <div class="space-y-8">
          <AppearanceSettings theme={theme()} setTheme={setTheme} />
          <AppInfo />
        </div>

        {/* Right Column: Chakra Selection */}
        <EnergyCenterSettings
          chakraColor={chakraColor()}
          setChakraColor={setChakraColor}
          swatchColor={swatch_color}
        />
      </div>
    </div>
  );
};
