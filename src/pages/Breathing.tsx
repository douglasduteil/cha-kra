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

export const Breathing: Component = () => {
  const [selected, setSelected] = createSignal(0);
  const reduced_motion = createMediaQuery("(prefers-reduced-motion: reduce)");
  const current = createMemo(() => exercises[selected()] ?? exercises[0]!);

  return (
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <BackArrow />
        <h1 class="text-2xl font-bold">Breathing Exercises</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Visual Area */}
        <div class="border-chakra/20 flex aspect-square w-full items-center justify-center rounded-3xl border bg-white/50 shadow-sm backdrop-blur-md lg:aspect-auto lg:h-full lg:min-h-[400px] dark:border-white/10 dark:bg-black/20 dark:shadow-none">
          <div
            class={`border-chakra bg-chakra/10 flex h-64 w-64 items-center justify-center rounded-full border-4 transition-all duration-1000 ${reduced_motion() ? "" : "animate-[pulse_4s_ease-in-out_infinite]"}`}
          >
            <div class="p-4 text-center">
              <p class="text-chakra text-2xl font-bold">{current().name}</p>
              <p class="mt-2 text-sm font-medium tracking-widest uppercase opacity-60">
                {current().duration}
              </p>
            </div>
          </div>
        </div>

        {/* List Area */}
        <div class="space-y-4">
          <For each={exercises}>
            {(exercise, i) => (
              <button
                onClick={() => setSelected(i())}
                class="group flex w-full flex-col gap-1 rounded-2xl border p-5 text-left transition-all duration-300 hover:scale-[1.02]"
                classList={{
                  "border-chakra bg-chakra/10 shadow-md": selected() === i(),
                  "border-transparent bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10":
                    selected() !== i(),
                }}
              >
                <div class="flex items-center justify-between">
                  <span class="text-lg font-semibold">{exercise.name}</span>
                  <span class="rounded-full bg-black/5 px-2 py-1 text-xs font-medium opacity-60 dark:bg-white/10">
                    {exercise.duration}
                  </span>
                </div>
                <p class="text-sm leading-relaxed opacity-60">
                  {exercise.description}
                </p>
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
