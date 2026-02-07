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

const GuidedCard: Component<{
  meditation: (typeof meditations)[number];
}> = (props) => {
  return (
    <button class="group hover:border-chakra/40 dark:hover:border-chakra/40 dark:hover:shadow-chakra/20 flex w-full flex-col gap-6 rounded-3xl border border-black/5 bg-white/50 p-8 text-left shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/20 dark:shadow-none dark:hover:bg-black/40">
      <div class="flex w-full items-start justify-between">
        <div class="bg-chakra/10 text-chakra flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
          <Headphones size={28} />
        </div>
        <span class="bg-chakra/10 text-chakra rounded-full px-3 py-1 text-xs font-semibold tracking-wide">
          {props.meditation.duration}
        </span>
      </div>

      <div>
        <h3 class="text-xl font-bold tracking-tight">
          {props.meditation.name}
        </h3>
        <p class="mt-3 text-sm leading-relaxed opacity-60">
          {props.meditation.description}
        </p>
      </div>
    </button>
  );
};

export const Guided: Component = () => {
  return (
    <div class="space-y-8">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Guided Meditations</h1>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meditations.map((meditation) => (
          <GuidedCard meditation={meditation} />
        ))}
      </div>
    </div>
  );
};
