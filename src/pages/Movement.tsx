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

const MovementCard: Component<{
  exercise: (typeof exercises)[number];
}> = (props) => {
  return (
    <button class="group hover:border-chakra/40 dark:hover:border-chakra/40 dark:hover:shadow-chakra/20 flex w-full flex-col gap-6 rounded-3xl border border-black/5 bg-white/50 p-8 text-left shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/20 dark:shadow-none dark:hover:bg-black/40">
      <div class="flex w-full items-start justify-between">
        <div class="bg-chakra/10 text-chakra flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110">
          <Activity size={24} />
        </div>
        <span class="bg-chakra/10 text-chakra rounded-full px-3 py-1 text-sm font-medium">
          {props.exercise.duration}
        </span>
      </div>

      <div>
        <h3 class="text-xl font-bold tracking-tight">{props.exercise.name}</h3>
        <p class="mt-3 text-sm leading-relaxed opacity-60">
          {props.exercise.description}
        </p>
      </div>
    </button>
  );
};

export const Movement: Component = () => {
  return (
    <div class="space-y-8">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Movement & Yoga</h1>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <MovementCard exercise={exercise} />
        ))}
      </div>
    </div>
  );
};
