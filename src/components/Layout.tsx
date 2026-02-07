import { type ParentComponent } from "solid-js";
import { Settings } from "lucide-solid";
import { A } from "@solidjs/router";

import { useTheme } from "~/stores/theme";

export const Layout: ParentComponent = (props) => {
  useTheme();

  return (
    <div class="bg-bg-base dark:bg-bg-base-dark grid min-h-screen grid-rows-[auto_1fr] text-gray-900 dark:text-gray-100">
      {/* Top bar */}
      <header class="bg-bg-base/80 dark:bg-bg-base-dark/80 sticky top-0 z-50 grid place-items-center border-b border-black/5 backdrop-blur-md dark:border-white/5">
        <div class="flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <A href="/" class="text-xl font-bold tracking-wide">
            Cha-Kra
          </A>
          <A
            href="/settings"
            class="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Settings"
          >
            <Settings size={22} class="text-chakra" />
          </A>
        </div>
      </header>

      {/* Main content area */}
      <main class="grid place-items-center px-4 py-8 sm:px-6 lg:px-8">
        <div class="w-full max-w-6xl">{props.children}</div>
      </main>
    </div>
  );
};
