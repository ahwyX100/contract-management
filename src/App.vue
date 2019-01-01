<template>
  <div id="app">
    <div>
      <router-link :to="{ name: 'contract' }">Contract List</router-link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <router-link :to="{ name: 'exchange' }">ETH/USD Exchange Rate Chart</router-link>
    </div>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  text-decoration: none;
  color: #1e1e1e;
}

.router-link-active {
  color: #1976d2;
}
</style>
