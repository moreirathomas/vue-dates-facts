<template>
  <div class="search">
    <h2>Please enter date separted by commas:</h2>
    <p>e.g. "04/17, 4/13, 10/4" (format month/day)</p>
    <!-- <input type="text" v-model="input" @keyup.enter="fetchData(splitInput)" /> -->
    <input type="text" v-model="input" @keyup.enter="handleFetch" />

    <!-- <div class="error" v-if="errorMessage">{{ errorMessage }}</div> -->
  </div>

  <div class="cards-container" v-if="listState.dataList.length">
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
// import axios from 'axios';

// const url = 'http://numbersapi.com/';

export default {
  name: 'Home',
  components: { FactCard },

  data() {
    return {
      input: '',
      errorMessage: '',
    };
  },

  // computed: {
  //   splitInput() {
  //     return this.input.split(',').map((string) => string.trim());
  //   },
  // },

  methods: {
    // async fetchData(inputs) {
    //   try {
    //     await inputs.map(async (input) => {
    //       const data = await axios
    //         .get(url + input + '/date')
    //         .then((res) => res.data);

    //       this.addData({ date: input, fact: data });
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     // this.errorMessage = 'Invalid syntax detected for at least one date';
    //   }
    // },
    splitInput() {
      return this.input.split(',').map((string) => string.trim());
    },
    handleFetch() {
      const inputs = this.splitInput();
      const newData = fetchData(inputs);
      console.log(newData);

      newData.map((data, index) =>
        this.addData({ date: inputs[index], fact: data })
      );
    },
  },

  setup() {
    const addData = (data) => {
      store.add(data);
    };
    return { listState: store.getState(), addData };
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
</style>
