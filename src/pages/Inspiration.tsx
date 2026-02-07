import { type Component, createSignal, onMount } from "solid-js";

import { BackArrow } from "~/components/BackArrow";

const quotes = [
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Meditation is not a means to an end. It is both the means and the end.",
    author: "Jiddu Krishnamurti",
  },
  {
    text: "Your calm mind is the ultimate weapon against your challenges.",
    author: "Bryant McGill",
  },
  {
    text: "In the midst of movement and chaos, keep stillness inside of you.",
    author: "Deepak Chopra",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thich Nhat Hanh",
  },
];

export const Inspiration: Component = () => {
  const [daily_quote, set_daily_quote] = createSignal(quotes[0]!);

  onMount(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const one_day = 1000 * 60 * 60 * 24;
    const day_of_year = Math.floor(diff / one_day);
    set_daily_quote(quotes[day_of_year % quotes.length]!);
  });

  return (
    <div class="flex min-h-full flex-col px-6 pb-6">
      <div class="mb-4">
        <BackArrow />
      </div>

      {/* Editorial quote layout - fills viewport */}
      <div class="flex flex-1 flex-col items-center justify-center px-4">
        <blockquote class="max-w-lg text-center">
          <p class="text-3xl leading-relaxed font-light">
            "{daily_quote().text}"
          </p>

          <div class="mt-8 flex items-center gap-4">
            <div class="bg-chakra/30 h-px flex-1" />
            <cite class="text-chakra text-lg font-medium not-italic">
              {daily_quote().author}
            </cite>
            <div class="bg-chakra/30 h-px flex-1" />
          </div>
        </blockquote>
      </div>
    </div>
  );
};
