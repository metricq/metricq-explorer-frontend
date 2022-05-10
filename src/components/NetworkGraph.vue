<template>
  <div class="NetGraph">
    <nav class="navbar navbar-light bg-light">
      <div>
        <img
          src="../../public/img/metricq-logo.png"
          width="35"
          height="35"
          alt="MetricQ-Logo"
          style="border-radius: .25rem;"
        >
        MetricQ-Explorer
      </div>
      <div>
        <input
          v-model="metric"
          placeholder="Metricname"
        >
        <label
          id="node_export"
          class="btn btn-outline-primary btn-navbar"
          @click="nodeButtonClicked"
        >Metrik hinzufügen</label>
      </div>
    </nav>
    <VNetworkGraph
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
      style="height: 500px"
    />
  </div>
</template>

<script>

import { reactive } from 'vue'
import * as vNG from 'v-network-graph'

export default {
  name: 'NetworkGraph',
  components: {},
  data: function () {
    return {
      nodes: {},
      edges: {},
      layouts: {
        nodes: {
          node1: { x: 0, y: 0 },
          node2: { x: 50, y: 50 },
          node3: { x: 100, y: 0 },
          node4: { x: 150, y: 50 }
        }
      },
      configs: reactive(
        vNG.defineConfigs({
          node: {
            dragable: true,
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
              direction: node => node.direction
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
            }
          }
        })
      ),
      metric: ''
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
    }
  }
}

</script>

<style scoped>

VNetworkGraph {
  height: 500px;
  width: 500px;
}

.btn {
  margin-left: 10px;
}

</style>
