<template>
  <div class="NetGraph">
    <div
      ref="overlay"
      class="overlay"
    >
      <div class="loader" />
    </div>
    <nav class="navbar navbar-light bg-light">
      <div class="navbar-brand">
        <img
          src="../../public/img/metricq-logo.png"
          width="35"
          height="35"
          alt="MetricQ-Logo"
          style="border-radius: .25rem;"
        >
        MetricQ-Explorer
      </div>
      <div class="typeahead">
        <vue3-simple-typeahead
          id="typeahead_id"
          placeholder="Metrik-Namen eingeben"
          :items="options"
          :min-input-length="1"
          @selectItem="requestData"
          @onInput="onInput"
          @onFocus="onFocus"
        />
      </div>
      <div
        id="node_export"
        class="btn btn-outline-primary btn-navbar"
        @click="requestData(metric)"
      >
        Metrik hinzufügen
      </div>
    </nav>
    <VNetworkGraph
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
      :event-handlers="eventHandlers"
      style="height: 90vh"
    />
  </div>
</template>

<script>

import { reactive } from 'vue'
import * as vNG from 'v-network-graph'

export default {
  name: 'NetworkGraph',
  components: {
  },
  data () {
    return {
      nodes: {},
      edges: {},
      layouts: {
        nodes: {}
      },
      configs: reactive(
        vNG.defineConfigs({
          view: {
            doubleClickZoomEnabled: false
          },
          node: {
            dragable: true,
            selectable: true,
            normal: {
              type: node => node.type,
              radius: 20,
              // for type is "rect" -->
              width: 32,
              height: 32,
              borderRadius: 4,
              // <-- for type is "rect"
              color: node => node.color
            },
            label: {
              visible: true,
              direction: node => node.direction,
              background: {
                visible: true,
                color: 'white',
                padding: {
                  vertical: 1,
                  horizontal: 2
                }
              }
            },
            hover: {
              color: 'yellow'
            }
          },
          edge: {
            marker: {
              target: {
                type: 'arrow',
                width: 4,
                height: 4,
                margin: -1,
                units: 'strokeWidth',
                color: null
              }
            },
            hover: {
              color: 'yellow'
            }
          }
        })
      ),
      eventHandlers: {
        'node:dblclick': ({ node }) => {
          this.requestData(node)
        }
      },
      metric: '',
      options: [],
      requestCount: 0
    }
  },
  methods: {
    requestData (requestMetric) {
      this.metric = requestMetric
      this.$refs.overlay.style.display = 'block'
      const url = this.backend + '/explorer/' + requestMetric
      fetch(url).then(response => {
        this.read(response.json()).then(() => { this.$refs.overlay.style.display = 'none' })
      })
    },
    async read (response) {
      const data = await response
      this.nodes = data.nodes
      this.edges = data.edges
      for (const [key, value] of Object.entries(data.layout)) {
        this.layouts.nodes[key] = value
      }
    },
    onInput (event) {
      this.metric = event.input
      this.changeOptions(event.input)
    },
    onFocus (event) {
      this.changeOptions(event.input)
    },
    changeOptions (infix) {
      const requestId = ++this.requestCount
      const url = this.backend + '/metrics?'
      fetch(url + new URLSearchParams({ infix: infix, limit: 20 })).then(response => response.json()).then(data => {
        if (requestId < this.requestCount) {
          return
        }
        this.options.length = 0
        for (let i = 0; i < Object.keys(data).length; ++i) {
          this.options.push(Object.values(data)[i].id)
        }
      })
    }
  }
}

</script>

<style scoped>
.NetGraph {
  display: flex;
  flex-direction: column;
  height: 99vh;
}

.navbar {
  align-items: center;
  justify-content: flex-start;
}

.navbar-brand {
  align-self: flex-start;
  margin-right: auto;
}

.btn {
  margin-left: 10px;
}

.typeahead {
  text-align: left;
}

.vue3-simple-typeahead ::v-deep(.simple-typeahead) {
  width: 300px;
}

.overlay {
  position: absolute;
  left:0;
  background: rgba(0,0,0,.5);
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
