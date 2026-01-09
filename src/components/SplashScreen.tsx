import { type Component, createSignal, onMount } from 'solid-js'

import { useTheme, chakraColors } from '~/stores/theme'

interface SplashScreenProps {
  onComplete: () => void
}

export const SplashScreen: Component<SplashScreenProps> = (props) => {
  const { chakraColor, effectiveTheme } = useTheme()
  const [isVisible, setIsVisible] = createSignal(true)

  onMount(() => {
    // Show splash for 2 seconds
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => props.onComplete(), 500) // Wait for fade out
    }, 2000)
  })

  const color = () => chakraColors[chakraColor()]
  const isDark = () => effectiveTheme() === 'dark'

  return (
    <div
      class="fixed inset-0 z-50 flex transition-opacity duration-500"
      classList={{
        'opacity-100': isVisible(),
        'opacity-0': !isVisible(),
      }}
    >
      {/* Left side - Cha (Yin) */}
      <div
        class="flex w-1/2 items-center justify-start px-8"
        style={{
          'background-color': isDark() ? color() : '#000000',
        }}
      >
        <h1
          class="text-6xl font-bold tracking-wider"
          style={{
            color: isDark() ? '#000000' : '#ffffff',
          }}
        >
          Cha
        </h1>
      </div>

      {/* Right side - Kra (Yang) */}
      <div
        class="flex w-1/2 items-center justify-end px-8"
        style={{
          'background-color': isDark() ? '#000000' : color(),
        }}
      >
        <h1
          class="text-6xl font-bold tracking-wider"
          style={{
            color: isDark() ? '#ffffff' : '#000000',
          }}
        >
          Kra
        </h1>
      </div>
    </div>
  )
}
