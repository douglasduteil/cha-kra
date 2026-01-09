import { type Component, createSignal, onMount } from 'solid-js'

import { useTheme, chakraColors } from '~/stores/theme'

export const Inspiration: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme()

  const isDark = () => effectiveTheme() === 'dark'
  const color = () => chakraColors[chakraColor()]

  const quotes = [
    {
      text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.',
      author: 'Thích Nhất Hạnh',
    },
    {
      text: 'Meditation is not a means to an end. It is both the means and the end.',
      author: 'Jiddu Krishnamurti',
    },
    {
      text: 'Your calm mind is the ultimate weapon against your challenges.',
      author: 'Bryant McGill',
    },
    {
      text: 'In the midst of movement and chaos, keep stillness inside of you.',
      author: 'Deepak Chopra',
    },
    {
      text: 'Peace comes from within. Do not seek it without.',
      author: 'Buddha',
    },
    {
      text: 'The mind is everything. What you think you become.',
      author: 'Buddha',
    },
    {
      text: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.',
      author: 'Thích Nhất Hạnh',
    },
  ]

  const [dailyQuote, setDailyQuote] = createSignal(quotes[0])

  onMount(() => {
    // Get quote based on day of year for consistency
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)
    const quoteIndex = dayOfYear % quotes.length
    setDailyQuote(quotes[quoteIndex])
  })

  return (
    <div class="flex min-h-full flex-col items-center justify-center p-6">
      <div class="mb-12 max-w-2xl text-center">
        <h1 class="mb-8 text-3xl font-bold">Daily Inspiration</h1>

        {/* Quote card */}
        <div
          class="rounded-3xl p-8 shadow-2xl transition-all duration-300"
          style={{
            'background-color': isDark() ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            border: `3px solid ${color()}`,
          }}
        >
          <div class="mb-6 text-6xl" style={{ color: color() }}>
            "
          </div>

          <p class="mb-6 text-2xl leading-relaxed font-light">{dailyQuote().text}</p>

          <div class="flex items-center justify-center gap-3">
            <div class="h-px flex-1" style={{ 'background-color': color() }} />
            <p class="text-lg font-semibold" style={{ color: color() }}>
              {dailyQuote().author}
            </p>
            <div class="h-px flex-1" style={{ 'background-color': color() }} />
          </div>
        </div>

        {/* Info text */}
        <p class="mt-8 text-lg opacity-70">A new inspiring thought awaits you each day</p>
      </div>
    </div>
  )
}
