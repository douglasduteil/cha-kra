import {
  Wind,
  Activity,
  AudioLines,
  Headphones,
  Music,
  Waves,
  Sparkles,
} from "lucide-solid";
import { type Component, For } from "solid-js";
import { A } from "@solidjs/router";

const practices = [
  { name: "Breathing", path: "/breathing", icon: Wind },
  { name: "Movement", path: "/movement", icon: Activity },
  { name: "Mantra", path: "/mantra", icon: AudioLines },
  { name: "Guided", path: "/guided", icon: Headphones },
  { name: "Tampura", path: "/tampura", icon: Music },
  { name: "White Noise", path: "/white-noise", icon: Waves },
  { name: "Inspiration", path: "/inspiration", icon: Sparkles },
] as const;

export const Home: Component = () => {
  return (
    <div class="flex flex-1 flex-col items-center px-6 py-8">
      <div class="grid w-full max-w-lg grid-cols-2 gap-4 max-[375px]:grid-cols-1">
        <For each={practices}>
          {(practice) => (
            <A
              href={practice.path}
              class="hover:border-chakra/30 dark:hover:border-chakra/30 flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 bg-black/5 p-6 transition-all duration-200 hover:scale-[1.02] dark:border-white/10 dark:bg-white/5"
            >
              <practice.icon size={32} class="text-chakra" />
              <span class="text-lg font-medium">{practice.name}</span>
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
