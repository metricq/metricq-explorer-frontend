import { createApp } from 'vue'
import App from './App.vue'
import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import { getMetricQBackendConfig } from '@/configuration'

async function startup () {
  const metricqBackendConfig = await getMetricQBackendConfig()

  const app = createApp(App)
  app.config.globalProperties.backend = metricqBackendConfig.backend
  app.use(VNetworkGraph)
  app.use(SimpleTypeahead)

  app.mount('#app')
}

startup()
