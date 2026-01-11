import { A, useLocation } from "@solidjs/router";
import { type Component, For } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: "/breathing", label: "Breathing", icon: "🫁" },
  { path: "/movement", label: "Movement", icon: "🧘" },
  { path: "/mantra", label: "Mantra", icon: "🕉️" },
  { path: "/guided", label: "Guided", icon: "🎧" },
  { path: "/tampura", label: "Tampura", icon: "🎵" },
  { path: "/white-noise", label: "Noise", icon: "🌊" },
  { path: "/inspiration", label: "Inspire", icon: "✨" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export const Navigation: Component = () => {
  const location = useLocation();
  const { effectiveTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;
  const isDark = () => effectiveTheme() === "dark";

  return (
    <nav
      class="fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur-sm transition-colors duration-300"
      classList={{
        "bg-white/80 border-gray-200": !isDark(),
        "bg-gray-950/80 border-gray-800": isDark(),
      }}
    >
      <div class="mx-auto flex max-w-4xl justify-around overflow-x-auto px-2">
        <For each={navItems}>
          {(item) => (
            <A
              href={item.path}
              class="flex min-w-[70px] flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-xs transition-all duration-200 hover:scale-105"
              classList={{
                "bg-gray-900 text-white": isActive(item.path) && !isDark(),
                "bg-gray-100 text-gray-900": isActive(item.path) && isDark(),
                "text-gray-600 hover:text-gray-900": !isActive(item.path) && !isDark(),
                "text-gray-400 hover:text-gray-100": !isActive(item.path) && isDark(),
              }}
            >
              <span class="text-xl">{item.icon}</span>
              <span class="truncate text-center font-medium">{item.label}</span>
            </A>
          )}
        </For>
      </div>
    </nav>
  );
};
