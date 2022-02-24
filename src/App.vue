<template>
  <div>
    <NetworkGraph />
  </div>
</template>

<script>
import NetworkGraph from '@/components/NetworkGraph'

export default {
  name: 'App',
  components: {
    NetworkGraph
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

VNetworkGraph {
  height: 500px;
  width: 500px;
}
</style>
