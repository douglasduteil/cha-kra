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
    <div class="space-y-6">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Ambient Sounds</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Sound Grid */}
        <div class="border-chakra/20 rounded-3xl border bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/20 dark:shadow-none">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {sounds.map((sound) => (
              <button
                onClick={() => {
                  set_selected(sound.id);
                  set_is_playing(true);
                }}
                class="flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.05]"
                classList={{
                  "bg-chakra text-white shadow-lg shadow-chakra/30":
                    selected() === sound.id,
                  "bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
                    selected() !== sound.id,
                }}
              >
                <sound.icon
                  size={32}
                  class={selected() === sound.id ? "text-white" : "opacity-60"}
                />
                <span class="text-sm font-medium">{sound.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Player Controls */}
        <div class="border-chakra/20 flex flex-col items-center justify-center gap-8 rounded-3xl border bg-white/50 p-12 shadow-sm backdrop-blur-md lg:min-h-[400px] dark:border-white/10 dark:bg-black/20 dark:shadow-none">
          <Show
            when={selected()}
            fallback={
              <div class="text-center opacity-40">
                <Radio size={64} class="mx-auto mb-4" />
                <p>Select a sound to begin</p>
              </div>
            }
          >
            <div class="animate-in fade-in w-full max-w-xs text-center duration-500">
              <div class="bg-chakra/10 text-chakra mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl">
                {(() => {
                  const s = sounds.find((s) => s.id === selected());
                  return s ? <s.icon size={48} /> : null;
                })()}
              </div>

              <h2 class="mb-8 text-2xl font-bold">
                {sounds.find((s) => s.id === selected())?.name}
              </h2>

              <div class="flex flex-col items-center gap-6">
                <button
                  onClick={() => set_is_playing(!is_playing())}
                  class="border-chakra bg-chakra/10 hover:bg-chakra/20 text-chakra flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  {is_playing() ? (
                    <Pause size={32} />
                  ) : (
                    <Play size={32} class="ml-1" />
                  )}
                </button>

                <div class="w-full space-y-2">
                  <div class="flex justify-between text-xs font-medium tracking-widest uppercase opacity-50">
                    <span>Volume</span>
                    <span>50%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="50"
                    class="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-[var(--color-chakra)] dark:bg-white/10"
                  />
                </div>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};
