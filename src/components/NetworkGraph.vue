<template>
  <div class="NetGraph">
    <nav class="navbar navbar-light bg-light">
      <input
        v-model="metric"
        placeholder="Metricname"
      >
      <label
        id="node_export"
        class="btn btn-outline-primary btn-navbar"
        @click="nodeButtonClicked"
      >Metrik hinzufügen</label>
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

// Endpoint erzeugt JSON mit zufälligen Werten
// in Vue Anzahl nodes/edges

import { reactive } from 'vue'
import * as vNG from 'v-network-graph'
import { Nodes, Edges, Layouts } from 'v-network-graph'

export default {
  name: 'NetworkGraph',
  components: {},
  data: function () {
    return {
      nodes: {
        node1: { name: 'Node 1', type: 'circle', color: 'gray', size: 100 },
        node2: { name: 'Node 2', type: 'rect' },
        node3: { name: 'Node 3', type: 'circle', size: 20 },
        node4: { name: 'Node 4', type: 'rect' }
      },
      edges: {
        edge1to2: { source: 'node1', target: 'node2' },
        edge2to3: { source: 'node2', target: 'node3' },
        edge3to4: { source: 'node3', target: 'node4' }
      },
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
              strokeWidth: 0,
              strokeColor: '#000000',
              strokeDasharray: '0',
              color: '#4466cc'
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

</style>
