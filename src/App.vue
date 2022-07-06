<template>
  <NetworkGraph />
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
}
</style>
