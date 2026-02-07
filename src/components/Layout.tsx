import { type ParentComponent } from "solid-js";
import { Settings } from "lucide-solid";
import { A } from "@solidjs/router";

import { useTheme } from "~/stores/theme";

export const Layout: ParentComponent = (props) => {
  useTheme();

  return (
    <div class="bg-bg-base dark:bg-bg-base-dark flex min-h-screen flex-col text-gray-900 dark:text-gray-100">
      {/* Top bar */}
      <header class="flex items-center justify-between px-6 py-4">
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
      </header>

      {/* Main content area */}
      <main class="flex-1 overflow-y-auto">{props.children}</main>
    </div>
  );
};
