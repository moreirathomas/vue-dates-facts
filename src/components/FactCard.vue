<template>
  <div class="fact-card">
    <h4>{{ data.date }}</h4>
    <blockquote>{{ data.fact }}</blockquote>
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
  margin-bottom: 1rem;
  padding: 0 0.75rem;
  background-color: #eee;
  border-radius: 0.375rem;
}
</style>
