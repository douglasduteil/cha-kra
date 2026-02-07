import {
  Play,
  Pause,
  CloudRain,
  Waves,
  TreePine,
  Flame,
  Wind,
  Droplets,
  CloudLightning,
  Radio,
} from "lucide-solid";
import { type Component, createSignal, Show } from "solid-js";

import { BackArrow } from "~/components/BackArrow";

const sounds = [
  { id: "rain", name: "Rain", icon: CloudRain },
  { id: "ocean", name: "Ocean", icon: Waves },
  { id: "forest", name: "Forest", icon: TreePine },
  { id: "fire", name: "Fire", icon: Flame },
  { id: "wind", name: "Wind", icon: Wind },
  { id: "stream", name: "Stream", icon: Droplets },
  { id: "thunder", name: "Thunder", icon: CloudLightning },
  { id: "white", name: "White Noise", icon: Radio },
];

export const WhiteNoise: Component = () => {
  const [selected, set_selected] = createSignal<string | null>(null);
  const [is_playing, set_is_playing] = createSignal(false);

  return (
    <div class="flex min-h-full flex-col bg-gray-950/50 px-6 pb-6 dark:bg-transparent">
      <div class="mb-4">
        <BackArrow />
      </div>

      <h1 class="mb-6 text-center text-sm font-medium tracking-widest uppercase opacity-50">
        Ambient Sounds
      </h1>

      {/* Sound tile grid */}
      <div class="mx-auto grid w-full max-w-sm grid-cols-2 gap-3">
        {sounds.map((sound) => (
          <button
            onClick={() => {
              set_selected(sound.id);
              set_is_playing(true);
            }}
            class="flex flex-col items-center gap-2 rounded-xl py-5 transition-all duration-200 hover:scale-[1.02]"
            classList={{
              "bg-chakra/15 border border-chakra/40": selected() === sound.id,
              "bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10":
                selected() !== sound.id,
            }}
          >
            <sound.icon
              size={28}
              class={selected() === sound.id ? "text-chakra" : "opacity-60"}
            />
            <span
              class="text-sm font-medium"
              classList={{
                "text-chakra": selected() === sound.id,
              }}
            >
              {sound.name}
            </span>
          </button>
        ))}
      </div>

      {/* Play control - appears on selection */}
      <Show when={selected()}>
        <div class="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={() => set_is_playing(!is_playing())}
            class="border-chakra bg-chakra/15 flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label={is_playing() ? "Pause" : "Play"}
          >
            {is_playing() ? (
              <Pause size={24} class="text-chakra" />
            ) : (
              <Play size={24} class="text-chakra ml-0.5" />
            )}
          </button>

          {/* Volume */}
          <div class="w-full max-w-xs">
            <input
              type="range"
              min="0"
              max="100"
              value="50"
              class="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[var(--color-chakra)]"
              aria-label="Volume"
            />
          </div>
        </div>
      </Show>
    </div>
  );
};
