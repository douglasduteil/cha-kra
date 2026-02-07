import { type Component, createSignal, createMemo } from "solid-js";
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
  const current = createMemo(() => exercises[selected()] ?? exercises[0]);

  return (
    <div class="flex min-h-full flex-col px-6 pb-6">
      {/* Back arrow */}
      <div class="mb-4">
        <BackArrow />
      </div>

      {/* Canvas area - centered breathing circle */}
      <div class="flex flex-1 flex-col items-center justify-center">
        <div
          class={`border-chakra bg-chakra/10 flex h-56 w-56 items-center justify-center rounded-full border-4 ${reduced_motion() ? "" : "animate-[pulse_4s_ease-in-out_infinite]"}`}
        >
          <div class="text-center">
            <p class="text-chakra text-2xl font-semibold">{current().name}</p>
            <p class="mt-1 text-sm opacity-60">{current().duration}</p>
          </div>
        </div>
      </div>

      {/* Exercise list - secondary */}
      <div class="mt-6 space-y-2">
        {exercises.map((exercise, i) => (
          <button
            onClick={() => setSelected(i)}
            class="w-full rounded-xl px-4 py-3 text-left transition-colors"
            classList={{
              "bg-chakra/15 border border-chakra/30": selected() === i,
              "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10":
                selected() !== i,
            }}
          >
            <div class="flex items-center justify-between">
              <span class="font-medium">{exercise.name}</span>
              <span class="text-sm opacity-60">{exercise.duration}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
