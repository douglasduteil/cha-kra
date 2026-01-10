import { render } from 'solid-js/web'

import App from '~/App'

import './index.css'

// Register service worker for PWA (only in production)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, app will still work without offline support
    })
  })
}

console.log('[index.tsx] Starting app initialization')

const root = document.getElementById('root')
console.log('[index.tsx] Root element:', root)

if (!root) {
  throw new Error('Root element not found')
}

console.log('[index.tsx] Calling render()')
render(() => <App />, root)
console.log('[index.tsx] Render complete')
