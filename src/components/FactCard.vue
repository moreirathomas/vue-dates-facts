<template>
  <div class="fact-card">
    <h3>{{ data.date }}</h3>
    <p>{{ data.fact }}</p>
  </div>
</template>

<script>
export default {
  name: 'FactCard',
  props: ['data'],
};
</script>

<style scoped>
.fact-card {
  max-width: 25vw;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 8px;
  background-color: #2c3e50;
  color: #f5f5f5;
}
h3 {
  margin: 0;
}
p {
  margin: 0;
}
</style>
