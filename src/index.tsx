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

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

render(() => <App />, root)
