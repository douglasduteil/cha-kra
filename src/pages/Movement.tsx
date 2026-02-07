import { type Component } from "solid-js";
import { Activity } from "lucide-solid";

import { BackArrow } from "~/components/BackArrow";

const exercises = [
  {
    name: "Sun Salutation",
    description: "Energize your body and mind",
    duration: "15 min",
  },
  {
    name: "Gentle Flow",
    description: "Easy movements for relaxation",
    duration: "20 min",
  },
  {
    name: "Chakra Alignment",
    description: "Poses to balance energy centers",
    duration: "30 min",
  },
  {
    name: "Yin Yoga",
    description: "Deep stretches and stillness",
    duration: "45 min",
  },
];

export const Movement: Component = () => {
  return (
    <div class="flex min-h-full flex-col px-6 pb-6">
      <div class="mb-4">
        <BackArrow />
      </div>

      <h1 class="mb-6 text-2xl font-bold">Movement & Yoga</h1>

      <div class="flex-1 space-y-4">
        {exercises.map((exercise) => (
          <button class="border-chakra flex w-full items-center gap-4 rounded-2xl border-l-4 bg-black/5 p-5 text-left transition-all duration-200 hover:scale-[1.01] hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
            <div class="bg-chakra/15 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <Activity size={22} class="text-chakra" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold">{exercise.name}</h3>
              <p class="mt-1 text-sm opacity-60">{exercise.description}</p>
            </div>
            <span class="bg-chakra/15 text-chakra shrink-0 rounded-full px-3 py-1 text-sm font-medium">
              {exercise.duration}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
