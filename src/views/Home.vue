<template>
  <div class="search">
    <h2>Please enter date separted by commas:</h2>
    <p>e.g. "04/17, 4/13, 10/4" (format month/day)</p>
    <input type="text" v-model="input" @keyup.enter="fetchData(splitInput)" />
    <button @click="clearData">Clear all</button>

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
import axios from 'axios';

const url = 'http://numbersapi.com/';

export default {
  name: 'Home',
  components: { FactCard },

  data() {
    return {
      input: '',
      errorMessage: '',
      pending: false,
    };
  },

  computed: {
    splitInput() {
      return this.input.split(',').map((string) => string.trim());
    },
  },

  methods: {
    async fetchData(inputs) {
      if (this.pending === true) {
        this.errorMessage = 'Please wait';
        return;
      } else {
        try {
          this.pending = true;

          await inputs.map(async (input) => {
            const data = await axios
              .get(url + input + '/date')
              .then((res) => res.data);

            this.addData({ date: input, fact: data });

            this.pending = false;
          });
        } catch (error) {
          console.log(error);
          this.errorMessage = 'Invalid syntax detected for at least one date';
        }
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
