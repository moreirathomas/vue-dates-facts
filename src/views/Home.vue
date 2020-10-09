<template>
  <section class="content-header">
    <div class="text-wrapper">
      <h3>Enter dates separated by commas:</h3>
      <p>
        Use <code>month/day</code> format for better results. For example:
        <code>05/11, {{ today }}</code
        >.
      </p>
    </div>

    <div class="actions-wrapper">
      <input type="text" v-model="input" @keyup.enter="handleSearch" />
      <button class="primary" @click="handleSearch" :disabled="!input">Search</button>
      <button @click="clearCurrent" :disabled="!listState.factsList.length">
        Clear search
      </button>
      <p class="error" v-if="errorMessage"><strong>Error:</strong> {{ errorMessage }}.</p>
    </div>
  </section>

  <section class="cards-container" v-if="currentList.length">
    <FactCard v-for="(element, index) in currentList" :element="element" :key="index" />
  </section>
</template>

<script>
import FactCard from '../components/FactCard.vue';
import store from '../store';
import { fetchData, checkDuplicate } from '../utils/api';
import { addOneToStorage } from '../utils/storage';

export default {
  name: 'Home',
  components: { FactCard },

  data() {
    return {
      currentList: [],
      input: '',
      errorMessage: '',
      loading: false,
    };
  },

  computed: {
    today() {
      const today = new Date();
      return today.getMonth() + 1 + '/' + today.getDate();
    },
  },

  methods: {
    splitInputs() {
      return this.input.split(',').map((string) => string.trim());
    },
    async handleSearch() {
      if (this.loading === false) {
        this.loading === true;
        this.errorMessage = '';

        // create new array from inputs string, Set has no duplicates
        let inputs = [...new Set(this.splitInputs())];
        // remove all duplicates, ie date already in current list
        inputs = inputs.filter(
          (input) => !checkDuplicate(input, this.listState.factsList)
        );
        if (inputs.length) {
          const res = await fetchData(inputs);
          res.map((el) => this.currentList.push(el));
          res.map((el) => this.addToStateAndStorage(el));
        } else {
          this.errorMessage = 'Invalid input or already in history';
        }
        this.loading === false;
        this.input = '';
      } else {
        this.errorMessage = 'Wwaiting for request to end';
      }
    },
    clearCurrent() {
      this.currentList.length = 0;
    },
  },

  setup() {
    const addToStateAndStorage = (element) => {
      store.addOne(element);
      addOneToStorage(element);
    };

    return { listState: store.getState(), addToStateAndStorage };
  },
};
</script>

<style scoped>
.actions-wrapper {
  display: flex;
}
.error {
  margin: 0;
  color: var(--red);
  max-height: 3rem;
  max-width: 10.5625rem;
  margin: 0.25rem 0.25rem 0.25rem auto;
  overflow-x: scroll;
  overflow-y: hidden;
}
.cards-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
