import { type Component } from "solid-js";

import { BackArrow } from "~/components/BackArrow";

const mantras = [
  {
    name: "Om (Aum)",
    description: "The primordial sound of the universe",
    chakra: "Crown",
  },
  {
    name: "So Hum",
    description: "I am that — breath awareness",
    chakra: "Heart",
  },
  {
    name: "Om Mani Padme Hum",
    description: "Compassion and wisdom",
    chakra: "Heart",
  },
  {
    name: "Gayatri Mantra",
    description: "Illumination and guidance",
    chakra: "Third Eye",
  },
  {
    name: "Lam",
    description: "Root chakra activation",
    chakra: "Root",
  },
];

const MantraCard: Component<{
  mantra: (typeof mantras)[number];
}> = (props) => {
  return (
    <button class="group hover:border-chakra/40 dark:hover:border-chakra/40 dark:hover:shadow-chakra/20 flex w-full flex-col items-center gap-6 rounded-3xl border border-black/5 bg-white/50 p-10 text-center shadow-sm backdrop-blur-md transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-black/20 dark:shadow-none dark:hover:bg-black/40">
      <h3 class="text-chakra text-3xl leading-snug font-light tracking-wide transition-transform duration-500 group-hover:scale-105">
        {props.mantra.name}
      </h3>
      <p class="text-base leading-relaxed opacity-60">
        {props.mantra.description}
      </p>
      <span class="bg-chakra/10 text-chakra mt-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
        {props.mantra.chakra}
      </span>
    </button>
  );
};

export const Mantra: Component = () => {
  return (
    <div class="space-y-8">
      <div class="relative flex items-center justify-center py-2">
        <div class="absolute left-0">
          <BackArrow />
        </div>
        <h1 class="text-center text-2xl font-bold">Mantra Meditation</h1>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mantras.map((mantra) => (
          <MantraCard mantra={mantra} />
        ))}
      </div>
    </div>
  );
};
