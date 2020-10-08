<template>
  <div class="fact-card">
    <h4>{{ element.date }}</h4>
    <blockquote>{{ element.fact }}</blockquote>
  </div>
</template>

<script>
export default {
  name: 'FactCard',
  props: ['element'],
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
