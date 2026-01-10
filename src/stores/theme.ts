import { createSignal, createEffect, onMount } from 'solid-js'

export type Theme = 'light' | 'dark' | 'system'
export type ChakraColor = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third' | 'crown'

const THEME_STORAGE_KEY = 'cha-kra-theme'
const CHAKRA_STORAGE_KEY = 'cha-kra-chakra-color'

// Get initial theme from localStorage or default to system
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return (stored as Theme) || 'system'
}

// Get initial chakra color or default to root
const getInitialChakra = (): ChakraColor => {
  if (typeof window === 'undefined') return 'root'
  const stored = localStorage.getItem(CHAKRA_STORAGE_KEY)
  return (stored as ChakraColor) || 'root'
}

// Determine if system preference is dark
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Theme store
const [theme, setTheme] = createSignal<Theme>(getInitialTheme())
const [chakraColor, setChakraColor] = createSignal<ChakraColor>(getInitialChakra())
const [effectiveTheme, setEffectiveTheme] = createSignal<'light' | 'dark'>(getSystemTheme())

// Update effective theme based on theme setting
export const updateEffectiveTheme = () => {
  const currentTheme = theme()
  const effective = currentTheme === 'system' ? getSystemTheme() : currentTheme
  setEffectiveTheme(effective)

  // Apply theme to document
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(effective)
  }
}

// Initialize theme on mount
export const initializeTheme = () => {
  onMount(() => {
    updateEffectiveTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme() === 'system') {
        updateEffectiveTheme()
      }
    }
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange)
  })
}

// Theme management functions
export const useTheme = () => {
  createEffect(() => {
    const currentTheme = theme()
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme)
    updateEffectiveTheme()
  })

  createEffect(() => {
    const color = chakraColor()
    localStorage.setItem(CHAKRA_STORAGE_KEY, color)
  })

  return {
    theme,
    setTheme,
    effectiveTheme,
    chakraColor,
    setChakraColor,
  }
}

export const chakraColors: Record<ChakraColor, string> = {
  root: '#FF0000',
  sacral: '#FF7F00',
  solar: '#FFFF00',
  heart: '#00FF00',
  throat: '#0000FF',
  third: '#4B0082',
  crown: '#9400D3',
}

export const chakraNames: Record<ChakraColor, string> = {
  root: 'Muladhara (Root)',
  sacral: 'Svadhisthana (Sacral)',
  solar: 'Manipura (Solar Plexus)',
  heart: 'Anahata (Heart)',
  throat: 'Vishuddha (Throat)',
  third: 'Ajna (Third Eye)',
  crown: 'Sahasrara (Crown)',
}
