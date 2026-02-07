import { type Component, createSignal, onMount } from "solid-js";
import { Sparkles } from "lucide-solid";

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

const QuoteCard: Component<{
  quote: (typeof quotes)[number];
}> = (props) => {
  return (
    <div class="border-chakra/20 relative flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl border bg-white/50 p-8 shadow-sm backdrop-blur-md sm:p-16 dark:border-white/10 dark:bg-black/20 dark:shadow-none">
      <Sparkles class="text-chakra absolute -top-6 -right-6 h-12 w-12 rotate-12 opacity-50" />

      <blockquote class="text-center">
        <p class="text-2xl leading-relaxed font-light italic sm:text-4xl">
          "{props.quote.text}"
        </p>

        <div class="mt-10 flex items-center gap-4 opacity-60">
          <div class="bg-chakra h-px flex-1" />
          <cite class="text-chakra text-lg font-medium tracking-widest uppercase not-italic">
            {props.quote.author}
          </cite>
          <div class="bg-chakra h-px flex-1" />
        </div>
      </blockquote>
    </div>
  );
};

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
    <div class="flex min-h-[60vh] flex-col items-center justify-center space-y-8">
      <div class="flex w-full items-center justify-start">
        <BackArrow />
      </div>

      <QuoteCard quote={daily_quote()} />
    </div>
  );
};
