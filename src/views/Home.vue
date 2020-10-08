<template>
  <section class="content-header">
    <h3>Enter dates separted by commas:</h3>
    <p>
      Use <code>month/day</code> format. For example:
      <code>04/17, 4/13, 10/4</code>.
    </p>
    <input type="text" v-model="input" @keyup.enter="handleSearch" />
    <button @click="clearState">Clear all</button>
    <span class="error" v-if="errorMessage">{{ errorMessage }}.</span>
  </section>

  <section class="cards-container" v-if="listState.factsList.length">
    <FactCard
      v-for="(element, index) in listState.factsList"
      :element="element"
      :key="index"
    />
  </section>
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
    splitInputs() {
      return this.input.split(',').map((string) => string.trim());
    },
    async handleSearch() {
      if (this.loading === false) {
        this.loading === true;
        const inputs = [...new Set(this.splitInputs())]; // Set doesnt allow duplicates
        const res = await fetchData(inputs);

        res.map((el) => this.addToState(el));
        this.loading === false;
        this.input = '';
      } else {
        this.errorMessage = 'Please wait';
        console.log('request blocked!');
        return;
      }
    },
  },

  setup() {
    const addToState = (element) => {
      store.add(element);
    };

    const clearState = () => {
      store.clear();
    };
    return { listState: store.getState(), addToState, clearState };
  },
};
</script>

<style scoped>
.cards-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
