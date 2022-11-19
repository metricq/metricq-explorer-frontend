import jquery from 'jquery'

const METRICQ_BACKEND = process.env.VUE_APP_METRICQ_WIZARD_BACKEND

class MetricQBackendConfig {
  constructor () {
    this.backend = METRICQ_BACKEND
  }
}

export async function getMetricQBackendConfig () {
  const config = new MetricQBackendConfig()
  try {
    const json = await jquery.ajax({
      url: 'configuration.json',
      type: 'GET',
      dataType: 'json'
    })
    config.backend = json.backend
  } catch (exc) {
    console.log('Could not load backend config.')
    console.log(exc)
  }

  return config
}
