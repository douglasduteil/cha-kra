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

export const Mantra: Component = () => {
  return (
    <div class="flex min-h-full flex-col px-6 pb-6">
      <div class="mb-4">
        <BackArrow />
      </div>

      <h1 class="mb-8 text-2xl font-bold">Mantra Meditation</h1>

      <div class="flex flex-1 flex-col items-center space-y-10">
        {mantras.map((mantra) => (
          <button class="w-full max-w-md text-center transition-all duration-200 hover:scale-[1.01]">
            <p class="text-chakra text-3xl leading-snug font-light">
              {mantra.name}
            </p>
            <p class="mt-3 text-sm opacity-60">{mantra.description}</p>
            <p class="mt-1 text-xs font-medium tracking-wider uppercase opacity-40">
              {mantra.chakra}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
