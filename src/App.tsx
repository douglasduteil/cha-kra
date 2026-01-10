import { type Component } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import { Inspiration } from '~/pages/Inspiration'
import { initializeTheme } from '~/stores/theme'
import { WhiteNoise } from '~/pages/WhiteNoise'
import { Breathing } from '~/pages/Breathing'
import { Layout } from '~/components/Layout'
import { Settings } from '~/pages/Settings'
import { Movement } from '~/pages/Movement'
import { Tampura } from '~/pages/Tampura'
import { Mantra } from '~/pages/Mantra'
import { Guided } from '~/pages/Guided'
import { Home } from '~/pages/Home'

const App: Component = () => {
  // Initialize theme system
  initializeTheme()

  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/breathing" component={Breathing} />
      <Route path="/movement" component={Movement} />
      <Route path="/mantra" component={Mantra} />
      <Route path="/guided" component={Guided} />
      <Route path="/tampura" component={Tampura} />
      <Route path="/white-noise" component={WhiteNoise} />
      <Route path="/inspiration" component={Inspiration} />
      <Route path="/settings" component={Settings} />
    </Router>
  )
}

export default App
