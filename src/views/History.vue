<template>
  <div class="history">
    <h2>Search history:</h2>
    <p v-if="listState.dataList.length">
      You searched for {{ listState.dataList.length }} date{{
        listState.dataList.length > 1 ? 's' : ''
      }}
      total.
    </p>
  </div>

  <div class="cards-container" v-if="listState.dataList.length">
    <fact-card
      v-for="(data, index) in listState.dataList"
      :data="data"
      :key="index"
    />
  </div>
  <div class="no-history" v-else>
    No history yet, try to search for dates from homepage.
  </div>
</template>

<script>
import FactCard from '../components/FactCard.vue';
import store from '../store';

export default {
  name: 'History',
  components: { FactCard },
  setup() {
    return { listState: store.getState() };
  },
};
</script>

<style scoped>
.history {
  text-align: center;
  margin-bottom: 1rem;
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.no-history {
  text-align: center;
}
</style>
