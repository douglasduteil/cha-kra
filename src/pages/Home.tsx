import { type Component } from "solid-js";
import { A } from "@solidjs/router";

import { useTheme, chakraColors, chakraNames } from "~/stores/theme";

export const Home: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];
  const name = () => chakraNames[chakraColor()];

  return (
    <div class="flex min-h-full flex-col items-center justify-center p-6">
      {/* Cha-Kra logo */}
      <div class="mb-12 flex w-full max-w-md items-center justify-between">
        <div
          class="flex-1 rounded-l-2xl p-6 text-left"
          style={{
            "background-color": isDark() ? color() : "#000000",
            color: isDark() ? "#000000" : "#ffffff",
          }}
        >
          <h1 class="text-4xl font-bold">Cha</h1>
        </div>
        <div
          class="flex-1 rounded-r-2xl p-6 text-right"
          style={{
            "background-color": isDark() ? "#000000" : color(),
            color: isDark() ? "#ffffff" : "#000000",
          }}
        >
          <h1 class="text-4xl font-bold">Kra</h1>
        </div>
      </div>

      {/* Current chakra */}
      <div class="mb-8 text-center">
        <p class="mb-2 text-lg opacity-70">Current Energy</p>
        <div
          class="inline-block rounded-full px-6 py-3 text-xl font-semibold"
          style={{
            "background-color": color(),
            color: isDark() ? "#000000" : "#ffffff",
          }}
        >
          {name()}
        </div>
      </div>

      {/* Welcome message */}
      <div class="max-w-md text-center">
        <h2 class="mb-4 text-2xl font-semibold">Welcome to Balance</h2>
        <p class="mb-8 text-lg leading-relaxed opacity-80">
          Find your inner peace through mindful practices. Choose a path below
          to begin your journey.
        </p>

        <A
          href="/breathing"
          class="inline-block rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105"
          style={{
            "background-color": color(),
            color: isDark() ? "#000000" : "#ffffff",
          }}
        >
          Start Practice
        </A>
      </div>
    </div>
  );
};
