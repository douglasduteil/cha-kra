import { type Component } from "solid-js";
import { A } from "@solidjs/router";

import { useTheme, chakraColors, chakraNames } from "~/stores/theme";

export const Home: Component = () => {
  const { effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";

  return (
    <div class="flex min-h-full flex-col items-center justify-center">
      {/* Yin-Yang inspired logo */}
      <div class="mb-16 flex w-full max-w-lg items-center justify-center gap-2">
        <div
          class="flex h-32 w-32 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          classList={{
            "bg-gray-900 text-white": !isDark(),
            "bg-white text-gray-900": isDark(),
          }}
        >
          <h1 class="text-4xl font-bold tracking-tight">Cha</h1>
        </div>
        <div
          class="flex h-32 w-32 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          classList={{
            "bg-white text-gray-900": !isDark(),
            "bg-gray-900 text-white": isDark(),
          }}
        >
          <h1 class="text-4xl font-bold tracking-tight">Kra</h1>
        </div>
      </div>

      {/* Welcome message */}
      <div class="max-w-xl text-center">
        <h2 class="mb-6 text-3xl font-bold tracking-tight">
          Welcome to Balance
        </h2>
        <p
          class="mb-12 text-xl leading-relaxed"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          Find your inner peace through mindful practices. Choose a path to
          begin your journey.
        </p>

        <A
          href="/breathing"
          class="inline-block rounded-full px-10 py-5 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          classList={{
            "bg-gray-900 text-white hover:bg-gray-800": !isDark(),
            "bg-white text-gray-900 hover:bg-gray-100": isDark(),
          }}
        >
          Start Practice
        </A>
      </div>
    </div>
  );
};
