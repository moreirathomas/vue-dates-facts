<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/history">History</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  height: 10vh;
  text-align: center;
  padding: 1rem;
}
main {
  min-height: 90vh;
}
</style>
