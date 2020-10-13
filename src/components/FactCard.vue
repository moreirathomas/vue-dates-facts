<template>
  <div class="fact-card">
    <div class="card-header">
      <h4>“{{ element.date }}”</h4>
      <div class="slot-wrapper">
        <slot></slot>
      </div>
    </div>
    <blockquote>{{ element.fact }}</blockquote>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // for typescript support
import { Fact } from '../types';

export default defineComponent({
  name: 'FactCard',
  props: {
    element: Object as () => Fact,
  },
});
</script>

<style scoped>
.fact-card {
  margin-bottom: 1rem;
  padding: 0 0.75rem;
  background-color: #eee;
  border-radius: 0.375rem;
}
.card-header {
  display: flex;
  align-items: center;
}
.slot-wrapper {
  margin-left: auto;
}
</style>
