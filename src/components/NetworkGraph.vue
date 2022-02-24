<template>
  <div class="NetGraph">
    <nav class="navbar navbar-light bg-light">
      <input
        v-model="inputNode"
        placeholder="Knoten"
      >
      <label
        id="node_export"
        class="btn btn-outline-primary btn-navbar"
        @click="nodeButtonClicked"
      >neuer Knoten</label>
      <input
        v-model="inputEdge1"
        placeholder="Start"
      >
      <input
        v-model="inputEdge2"
        placeholder="Ziel"
      >
      <label
        id="edge_export"
        class="btn btn-outline-primary btn-navbar"
        @click="edgeButtonClicked"
      >neue Verbindung</label>
      <input
        v-model="randomNode"
        placeholder="Anzahl Knoten"
      >
      <input
        v-model="randomEdge"
        placeholder="Anzahl Verbindungen"
      >
      <label
        id="random_btn"
        class="btn btn-outline-primary btn-navbar"
        @click="randomButtonClicked"
      >Zufall!</label>
    </nav>
    <VNetworkGraph
      :nodes="nodes"
      :edges="edges"
      style="height: 500px"
    />
  </div>
</template>

<script>

// Endpoint erzeugt JSON mit zufälligen Werten
// in Vue Anzahl nodes/edges
export default {
  name: 'NetworkGraph',
  components: {},
  data: function () {
    return {
      nodes: {
        node1: { name: 'Node 1' },
        node2: { name: 'Node 2' },
        node3: { name: 'Node 3' },
        node4: { name: 'Node 4' }
      },
      edges: {
        edge1to2: { source: 'node1', target: 'node2' },
        edge2to3: { source: 'node2', target: 'node3' },
        edge3to4: { source: 'node3', target: 'node4' }
      },
      inputNode: '',
      inputEdge1: '',
      inputEdge2: '',
      randomNode: '',
      randomEdge: ''
    }
  },
  methods: {
    nodeButtonClicked: function () {
      this.nodes = {}
      const newNodeKey = 'node' + this.inputNode
      const newNodeValue = { name: 'Node ' + this.inputNode }
      this.nodes[newNodeKey] = newNodeValue
    },
    edgeButtonClicked: function () {
      this.edges = {}
      const newEdgeKey = 'edge' + this.inputEdge1 + 'to' + this.inputEdge2
      const newEdgeValue = { source: 'node' + this.inputEdge1, target: 'node' + this.inputEdge2 }
      this.edges[newEdgeKey] = newEdgeValue
    },
    randomButtonClicked: function () {
      const NodeCount = this.randomNode === '' ? 3 : this.randomNode
      const EdgeCount = this.randomEdge === '' ? 3 : this.randomEdge
      const url = 'http://localhost:8080/' + NodeCount + '*' + EdgeCount
      fetch(url)
        .then(response => response.json())
        .then(data => this.readJson(data))
    },
    readJson: function (data) {
      this.nodes = data.nodes
      this.edges = data.edges
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
