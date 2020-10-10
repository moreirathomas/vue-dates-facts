<template>
  <section class="content-header">
    <div class="text-wrapper">
      <h3>Enter dates separated by commas:</h3>
      <p>
        Use month and day, i.e. <code>mm/dd</code>, <code>m/d</code>, <code>mm/d</code> or
        <code>m/dd</code> formats. For example: <code>05/11, {{ today }}</code
        >.
      </p>
    </div>

    <div class="actions-wrapper">
      <input type="text" v-model="inputString" @keyup.enter="handleSearch" />
      <button class="primary" @click="handleSearch" :disabled="!inputString">
        Search
      </button>
      <button @click="clearCurrent" :disabled="!currentList.length">
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
import { fetchData } from '../utils/api';
import { addOneToStorage } from '../utils/storage';
import { computeTerms } from '../utils/terms';

export default {
  name: 'Home',
  components: { FactCard },

  data() {
    return {
      currentList: [],
      inputString: '',
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
    async handleSearch() {
      if (this.loading === false) {
        this.loading === true;
        this.errorMessage = '';

        let terms = computeTerms(this.inputString);
        terms = terms.filter((term) => this.canAdd(term));

        if (terms.length) {
          const res = await fetchData(terms);
          res.map((el) => this.currentList.push(el));
          res.map((el) => this.addToStateAndStorage(el));
        } else {
          this.errorMessage = 'Invalid input or already in history';
        }

        this.loading === false;
        this.inputString = '';
      } else {
        this.errorMessage = 'Waiting for request to end';
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

    const canAdd = (term) => {
      return !store.isInStore(term);
    };

    return { listState: store.getState(), addToStateAndStorage, canAdd };
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
