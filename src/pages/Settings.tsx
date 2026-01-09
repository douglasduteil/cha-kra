import { type Component, For } from 'solid-js'

import { useTheme, type Theme, type ChakraColor, chakraColors, chakraNames } from '~/stores/theme'

export const Settings: Component = () => {
  const { theme, setTheme, effectiveTheme, chakraColor, setChakraColor } = useTheme()

  const isDark = () => effectiveTheme() === 'dark'
  const color = () => chakraColors[chakraColor()]

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ]

  const chakras: ChakraColor[] = ['root', 'sacral', 'solar', 'heart', 'throat', 'third', 'crown']

  return (
    <div class="flex min-h-full flex-col p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Settings</h1>
        <p class="text-lg opacity-70">Customize your experience</p>
      </div>

      <div class="space-y-8">
        {/* Theme selection */}
        <section>
          <h2 class="mb-4 text-2xl font-semibold">Theme</h2>
          <div class="grid grid-cols-3 gap-3">
            <For each={themes}>
              {(themeOption) => (
                <button
                  onClick={() => setTheme(themeOption.value)}
                  class="rounded-xl p-4 text-center transition-all duration-200 hover:scale-105"
                  classList={{
                    'ring-2': theme() === themeOption.value,
                  }}
                  style={{
                    'background-color':
                      theme() === themeOption.value
                        ? color()
                        : isDark()
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.05)',
                    color:
                      theme() === themeOption.value
                        ? isDark()
                          ? '#000000'
                          : '#ffffff'
                        : 'inherit',
                    'ring-color': color(),
                  }}
                >
                  <div class="mb-2 text-3xl">{themeOption.icon}</div>
                  <div class="font-semibold">{themeOption.label}</div>
                </button>
              )}
            </For>
          </div>
        </section>

        {/* Chakra color selection */}
        <section>
          <h2 class="mb-4 text-2xl font-semibold">Energy Center</h2>
          <p class="mb-4 opacity-70">Choose a chakra to set your app's color theme</p>
          <div class="space-y-3">
            <For each={chakras}>
              {(chakra) => (
                <button
                  onClick={() => setChakraColor(chakra)}
                  class="w-full rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]"
                  classList={{
                    'ring-2': chakraColor() === chakra,
                  }}
                  style={{
                    'background-color':
                      chakraColor() === chakra
                        ? chakraColors[chakra]
                        : isDark()
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.05)',
                    color:
                      chakraColor() === chakra ? (isDark() ? '#000000' : '#ffffff') : 'inherit',
                    'ring-color': chakraColors[chakra],
                  }}
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="h-10 w-10 flex-shrink-0 rounded-full"
                      style={{ 'background-color': chakraColors[chakra] }}
                    />
                    <div class="flex-1">
                      <div class="font-semibold">{chakraNames[chakra]}</div>
                    </div>
                  </div>
                </button>
              )}
            </For>
          </div>
        </section>

        {/* App info */}
        <section class="pt-8">
          <div
            class="rounded-xl p-6 text-center"
            style={{
              'background-color': isDark() ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }}
          >
            <h3 class="mb-2 text-xl font-semibold">Cha-Kra</h3>
            <p class="mb-1 opacity-70">Version 1.0.0</p>
            <p class="opacity-70">Find balance through mindful practice</p>
          </div>
        </section>
      </div>
    </div>
  )
}
