import { A, useLocation } from '@solidjs/router'
import { type Component, For } from 'solid-js'

import { useTheme, chakraColors } from '~/stores/theme'

interface NavItem {
  path: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { path: '/breathing', label: 'Breathing', icon: '🫁' },
  { path: '/movement', label: 'Movement', icon: '🧘' },
  { path: '/mantra', label: 'Mantra', icon: '🕉️' },
  { path: '/guided', label: 'Guided', icon: '🎧' },
  { path: '/tampura', label: 'Tampura', icon: '🎵' },
  { path: '/white-noise', label: 'Noise', icon: '🌊' },
  { path: '/inspiration', label: 'Inspire', icon: '✨' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
]

export const Navigation: Component = () => {
  const location = useLocation()
  const { chakraColor, effectiveTheme } = useTheme()

  const isActive = (path: string) => location.pathname === path
  const color = () => chakraColors[chakraColor()]
  const isDark = () => effectiveTheme() === 'dark'

  return (
    <nav
      class="fixed right-0 bottom-0 left-0 z-40 border-t"
      classList={{
        'bg-white border-gray-200': !isDark(),
        'bg-black border-gray-800': isDark(),
      }}
    >
      <div class="flex justify-around overflow-x-auto">
        <For each={navItems}>
          {(item) => (
            <A
              href={item.path}
              class="flex min-w-[60px] flex-col items-center gap-1 px-2 py-3 text-xs transition-all duration-200"
              classList={{
                'opacity-100': isActive(item.path),
                'opacity-60': !isActive(item.path),
              }}
              style={{
                color: isActive(item.path) ? color() : isDark() ? '#ffffff' : '#000000',
              }}
            >
              <span class="text-xl">{item.icon}</span>
              <span class="truncate text-center font-medium">{item.label}</span>
            </A>
          )}
        </For>
      </div>
    </nav>
  )
}
