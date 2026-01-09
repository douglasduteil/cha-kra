import { type Component } from 'solid-js'

import { useTheme, chakraColors } from '~/stores/theme'

export const Movement: Component = () => {
  const { chakraColor, effectiveTheme } = useTheme()

  const isDark = () => effectiveTheme() === 'dark'
  const color = () => chakraColors[chakraColor()]

  return (
    <div class="flex min-h-full flex-col p-6">
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Movement & Yoga</h1>
        <p class="text-lg opacity-70">Flow with intention and grace</p>
      </div>

      <div class="flex-1 space-y-4">
        {[
          {
            name: 'Sun Salutation',
            description: 'Energize your body and mind',
            duration: '15 min',
          },
          { name: 'Gentle Flow', description: 'Easy movements for relaxation', duration: '20 min' },
          {
            name: 'Chakra Alignment',
            description: 'Poses to balance energy centers',
            duration: '30 min',
          },
          { name: 'Yin Yoga', description: 'Deep stretches and stillness', duration: '45 min' },
        ].map((exercise) => (
          <button
            class="w-full rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02]"
            style={{
              'background-color': isDark() ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: `2px solid ${color()}`,
            }}
          >
            <div class="mb-2 flex items-center justify-between">
              <h3 class="text-xl font-semibold">{exercise.name}</h3>
              <span
                class="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  'background-color': color(),
                  color: isDark() ? '#000000' : '#ffffff',
                }}
              >
                {exercise.duration}
              </span>
            </div>
            <p class="opacity-70">{exercise.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
