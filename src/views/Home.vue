<template>
  <div class="search">
    <h2>Please enter date separted by commas:</h2>
    <input type="text" v-model="input" @keyup.enter="fetchData(splitInput)" />
    <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
  </div>

  <div class="cards-container" v-if="dataList.length">
    <fact-card v-for="(data, index) in dataList" :data="data" :key="index" />
  </div>
</template>

<script>
import FactCard from '../components/FactCard.vue';
import axios from 'axios';

const url = 'http://numbersapi.com/';

export default {
  name: 'Home',
  components: { FactCard },

  data() {
    return {
      dataList: [],
      input: '',
      errorMessage: '',
    };
  },
  computed: {
    splitInput() {
      return this.input.split(',').map((string) => string.trim());
    },
  },
  methods: {
    async fetchData(inputs) {
      try {
        await inputs.map(async (input) => {
          const data = await axios
            .get(url + input + '/date')
            .then((res) => res.data);
          this.dataList.push({ date: input, fact: data });
        });
      } catch (error) {
        console.log(error);
        this.errorMessage = 'Invalid syntax detected for at least one date';
      }
    },
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
</style>
