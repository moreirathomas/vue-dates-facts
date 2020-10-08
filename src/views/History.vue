<template>
  <div class="content-header">
    <h3>Search history:</h3>
    <p v-if="listState.factsList.length">
      You searched for <code>{{ listState.factsList.length }}</code> date{{
        listState.factsList.length > 1 ? 's' : ''
      }}
      in total.
    </p>
    <p v-else>
      <code>0</code> search in history, try searching for dates from the
      <router-link to="/">homepage</router-link>.
    </p>
    <button @click="clearState">Clear all</button>
  </div>

  <div class="cards-container" v-if="listState.factsList.length">
    <FactCard
      v-for="(data, index) in listState.factsList"
      :element="data"
      :key="index"
    />
  </div>
</template>

<script>
import FactCard from '../components/FactCard.vue';
import store from '../store';

export default {
  name: 'History',
  components: { FactCard },

  setup() {
    const clearState = () => {
      store.clear();
    };
    return { listState: store.getState(), clearState };
  },
};
</script>

<style scoped>
.cards-container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
}
</style>
