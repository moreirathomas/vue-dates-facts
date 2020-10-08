<template>
  <div class="search">
    <h2>Please enter date separted by commas:</h2>
    <p>e.g. "04/17, 4/13, 10/4" (format month/day)</p>
    <input type="text" v-model="input" @keyup.enter="handleFetch" />

    <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
  </div>

  <div class="cards-container" v-if="listState?.dataList.length">
    <fact-card
      v-for="(data, index) in listState.dataList"
      :data="data"
      :key="index"
    />
  </div>
</template>

<script>
import FactCard from '../components/FactCard.vue';
import store from '../store';
import fetchData from '../api';

export default {
  name: 'Home',
  components: { FactCard },

  data() {
    return {
      input: '',
      errorMessage: '',
      loading: false,
    };
  },

  methods: {
    splitInput() {
      return this.input.split(',').map((string) => string.trim());
    },
    async handleFetch() {
      if (this.loading === false) {
        this.loading === true;
        const inputs = [...new Set(this.splitInput())]; // Set doesnt allow duplicates
        const res = await fetchData(inputs);

        res.map((el) => this.addData(el));
        this.loading === false;
      } else {
        this.errorMessage = 'Please wait';
        return;
      }
    },
  },

  setup() {
    const addData = (data) => {
      store.add(data);
    };

    const clearData = () => {
      store.clear();
    };
    return { listState: store.getState(), addData, clearData };
  },
};
</script>

<style scoped>
.search {
  text-align: center;
  margin-bottom: 1rem;
}
.cards-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
input {
  padding: 0.2rem 1rem;
  border-radius: 0.8rem;
  width: 25vw;
  border: 1px solid #2c3e50;
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
