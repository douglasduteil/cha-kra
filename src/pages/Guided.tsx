import { Headphones } from "lucide-solid";
import { type Component } from "solid-js";

import { BackArrow } from "~/components/BackArrow";

const meditations = [
  {
    name: "Body Scan",
    description: "Progressive relaxation meditation",
    duration: "15 min",
  },
  {
    name: "Loving Kindness",
    description: "Cultivate compassion for all beings",
    duration: "12 min",
  },
  {
    name: "Chakra Journey",
    description: "Travel through all seven energy centers",
    duration: "25 min",
  },
  {
    name: "Sleep Meditation",
    description: "Drift into peaceful rest",
    duration: "30 min",
  },
  {
    name: "Morning Intention",
    description: "Set your purpose for the day",
    duration: "10 min",
  },
];

export const Guided: Component = () => {
  return (
    <div class="flex min-h-full flex-col px-6 pb-6">
      <div class="mb-4">
        <BackArrow />
      </div>

      <h1 class="mb-6 text-2xl font-bold">Guided Meditations</h1>

      <div class="flex-1 space-y-4">
        {meditations.map((meditation) => (
          <button class="flex w-full gap-4 rounded-2xl bg-black/5 p-5 text-left transition-all duration-200 hover:scale-[1.01] hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
            <div class="bg-chakra/15 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
              <Headphones size={24} class="text-chakra" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold">{meditation.name}</h3>
              <p class="mt-1 text-sm opacity-60">{meditation.description}</p>
              <span class="bg-chakra/10 text-chakra mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium">
                {meditation.duration}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
