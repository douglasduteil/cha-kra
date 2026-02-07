import { type Component, createSignal, createMemo, For } from "solid-js";
import { createMediaQuery } from "@solid-primitives/media";

import { BackArrow } from "~/components/BackArrow";

const exercises = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8",
    duration: "5 min",
  },
  {
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, hold",
    duration: "10 min",
  },
  {
    name: "Alternate Nostril",
    description: "Balance left and right energy channels",
    duration: "8 min",
  },
  {
    name: "Deep Belly Breathing",
    description: "Engage diaphragm for full oxygen exchange",
    duration: "7 min",
  },
];

const BreathingVisual: Component<{
  name: string;
  duration: string;
  reduced_motion: boolean;
}> = (props) => {
  return (
    <div class="border-chakra/20 flex aspect-square w-full items-center justify-center rounded-3xl border bg-white/50 shadow-sm backdrop-blur-md lg:aspect-auto lg:h-full lg:min-h-[400px] dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <div
        class={`border-chakra bg-chakra/10 flex h-64 w-64 items-center justify-center rounded-full border-4 transition-all duration-1000 ${props.reduced_motion ? "" : "animate-[pulse_4s_ease-in-out_infinite]"}`}
      >
        <div class="p-4 text-center">
          <p class="text-chakra text-2xl font-bold">{props.name}</p>
          <p class="mt-2 text-sm font-medium tracking-widest uppercase opacity-60">
            {props.duration}
          </p>
        </div>
      </div>
    </div>
  );
};

const ExerciseCard: Component<{
  exercise: (typeof exercises)[number];
  isSelected: boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      class="group flex w-full flex-col gap-3 rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-[1.02]"
      classList={{
        "border-chakra bg-chakra/10 shadow-md": props.isSelected,
        "border-transparent bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
          !props.isSelected,
      }}
    >
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{props.exercise.name}</span>
        <span class="rounded-full bg-black/5 px-3 py-1 text-xs font-medium opacity-60 dark:bg-white/10">
          {props.exercise.duration}
        </span>
      </div>
      <p class="text-sm leading-relaxed opacity-60">
        {props.exercise.description}
      </p>
    </button>
  );
};

export const Breathing: Component = () => {
  const [selected, setSelected] = createSignal(0);
  const reduced_motion = createMediaQuery("(prefers-reduced-motion: reduce)");
  const current = createMemo(() => exercises[selected()] ?? exercises[0]!);

  return (
    <div class="space-y-6">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Breathing Exercises</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        <BreathingVisual
          name={current().name}
          duration={current().duration}
          reduced_motion={reduced_motion()}
        />

        <div class="space-y-4">
          <For each={exercises}>
            {(exercise, i) => (
              <ExerciseCard
                exercise={exercise}
                isSelected={selected() === i()}
                onClick={() => setSelected(i())}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
