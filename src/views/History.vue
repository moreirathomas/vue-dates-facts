<template>
  <div class="history">
    <h2>Search history:</h2>
    <p v-if="listState.dataList.length">
      You searched for {{ listState.dataList.length }} date{{
        listState.dataList.length > 1 ? 's' : ''
      }}
      total.
    </p>
    <button @click="clearData">Clear all</button>
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
    const clearData = () => {
      store.clear();
    };
    return { listState: store.getState(), clearData };
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
button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c84d2e;
  color: #f5f5f5;
  padding: 0.2rem 1rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  margin: 0.5rem auto;
}
</style>
