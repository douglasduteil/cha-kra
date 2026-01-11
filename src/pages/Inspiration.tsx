import { type Component, createSignal, onMount } from "solid-js";

import { useTheme, chakraColors } from "~/stores/theme";

export const Inspiration: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme();

  const isDark = () => effectiveTheme() === "dark";
  const color = () => chakraColors[chakraColor()];

  const quotes = [
    {
      text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
      author: "Thích Nhất Hạnh",
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
      author: "Thích Nhất Hạnh",
    },
  ];

  const [dailyQuote, setDailyQuote] = createSignal(quotes[0]);

  onMount(() => {
    // Get quote based on day of year for consistency
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % quotes.length;
    setDailyQuote(quotes[quoteIndex]);
  });

  return (
    <div class="flex min-h-full flex-col items-center justify-center">
      <div class="w-full max-w-2xl text-center">
        <h1 class="mb-12 text-3xl font-bold tracking-tight">
          Daily Inspiration
        </h1>

        {/* Quote card */}
        <div
          class="rounded-3xl p-10 shadow-xl transition-all duration-300"
          classList={{
            "bg-white": !isDark(),
            "bg-gray-900": isDark(),
          }}
        >
          <div
            class="mb-8 text-6xl font-serif"
            classList={{
              "text-gray-400": !isDark(),
              "text-gray-600": isDark(),
            }}
          >
            "
          </div>

          <p class="mb-8 text-2xl font-light leading-relaxed">
            {dailyQuote().text}
          </p>

          <div class="flex items-center justify-center gap-4">
            <div
              class="h-px flex-1"
              classList={{
                "bg-gray-300": !isDark(),
                "bg-gray-700": isDark(),
              }}
            />
            <p
              class="text-lg font-semibold"
              classList={{
                "text-gray-700": !isDark(),
                "text-gray-300": isDark(),
              }}
            >
              {dailyQuote().author}
            </p>
            <div
              class="h-px flex-1"
              classList={{
                "bg-gray-300": !isDark(),
                "bg-gray-700": isDark(),
              }}
            />
          </div>
        </div>

        {/* Info text */}
        <p
          class="mt-10 text-lg"
          classList={{
            "text-gray-600": !isDark(),
            "text-gray-400": isDark(),
          }}
        >
          A new inspiring thought awaits you each day
        </p>
      </div>
    </div>
  );
};
