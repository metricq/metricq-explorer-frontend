<template>
  <div class="NetGraph">
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
          @selectItem="selectItem"
          @onInput="onInput"
          @onFocus="onFocus"
        />
      </div>
      <div
        id="node_export"
        class="btn btn-outline-primary btn-navbar"
        @click="nodeButtonClicked"
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
  data: function () {
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
          this.changeMetric(node)
        }
      },
      metric: '',
      options: [],
      requestCount: 0
    }
  },
  methods: {
    nodeButtonClicked: function () {
      const url = 'http://localhost:8000/api/explorer/' + this.metric
      fetch(url).then(response => response.json()).then(data => this.readJson(data))
    },
    readJson: function (data) {
      this.nodes = data.nodes
      this.edges = data.edges
      for (const [key, value] of Object.entries(data.layout)) {
        this.layouts.nodes[key] = value
      }
    },
    changeMetric: function (node) {
      if (this.nodes[node].type === 'circle') {
        const url = 'http://localhost:8000/api/explorer/' + node
        fetch(url).then(response => response.json()).then(data => this.readJson(data))
      }
    },
    selectItem (item) {
      this.metric = item
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
      const url = 'http://localhost:8000/api/metrics?'
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

</style>
