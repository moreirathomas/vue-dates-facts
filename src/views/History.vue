<template>
  <section class="content-header">
    <div class="text-wrapper">
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
    </div>
    <div class="actions-wrapper">
      <button @click="clearStateAndStorage" :disabled="!listState.factsList.length">
        Clear all
      </button>
    </div>
  </section>

  <section class="cards-container" v-if="listState.factsList.length">
    <FactCard
      v-for="(element, index) in listState.factsList"
      :element="element"
      :key="index"
    >
      <button @click="removeFromStateAndState(index, element.date)">Remove one</button>
    </FactCard>
  </section>
</template>

<script>
import FactCard from '../components/FactCard.vue';
import store from '../store';
import { removeOneFromStorage, clearAllStorage } from '../utils/storage';

export default {
  name: 'History',
  components: { FactCard },

  setup() {
    const removeFromStateAndState = (index, key) => {
      store.removeOne(index);
      removeOneFromStorage(key);
    };

    const clearStateAndStorage = () => {
      store.clearAll();
      clearAllStorage();
    };

    return { listState: store.getState(), removeFromStateAndState, clearStateAndStorage };
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
.cards-container button {
  background-color: #fff;
}
</style>
