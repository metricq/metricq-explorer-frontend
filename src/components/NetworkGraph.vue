<template>
  <div class="NetGraph">
    <nav class="navbar navbar-light bg-light">
      <input v-model="inputNode" placeholder="Knoten">
      <label
          id="node_export"
          class="btn btn-outline-primary btn-navbar"
          @click="nodeButtonClicked"
      >neuer Knoten</label>
      <input v-model="inputEdge1" placeholder="Start">
      <input v-model="inputEdge2" placeholder="Ziel">
      <label
          id="edge_export"
          class="btn btn-outline-primary btn-navbar"
          @click="edgeButtonClicked"
      >neue Verbindung</label>
    </nav>
    <VNetworkGraph
        :nodes="nodes"
        :edges="edges"
        style="height: 500px"
    />
  </div>

</template>

<script>

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
      inputEdge2: ''
    }
  },
  methods: {
    nodeButtonClicked: function () {
      const newNodeKey = 'node' + this.inputNode
      const newNodeValue = { name: 'Node ' + this.inputNode }
      this.nodes[newNodeKey] = newNodeValue
    },
    edgeButtonClicked: function () {
      const newEdgeKey = 'edge' + this.inputEdge1 + 'to' + this.inputEdge2
      const newEdgeValue = { source: 'node' + this.inputEdge1, target: 'node' + this.inputEdge2 }
      this.edges[newEdgeKey] = newEdgeValue
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
