<template>
  <header>
    <div class="title">
      <h1>Dates Facts</h1>
      <span>
        With
        <a v-bind:href="vue" target="_blank" rel="noopener noreferrer"
          >Vue.js</a
        >
        and
        <a v-bind:href="numbersapi" target="_blank" rel="noopener noreferrer"
          >Numbers API</a
        >.
      </span>
      <span>
        Visit the
        <a v-bind:href="repository" target="_blank" rel="noopener noreferrer">
          repository</a
        >.
      </span>
    </div>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/history">History</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      vue: 'https://v3.vuejs.org/',
      numbersapi: ' http://numbersapi.com/#42',
      repository: 'https://github.com/moreirathomas/vue-dates-facts',
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

nav {
  display: inline-flex;
  align-items: flex-end;
  gap: 1.5rem;
}
</style>
