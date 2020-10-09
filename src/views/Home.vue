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
      <button @click="clearState" :disabled="!listState.factsList.length">
        Clear all
      </button>
      <pre class="error" v-if="errorMessage">
        <strong>Error:</strong> {{ errorMessage }}.
      </pre>
    </div>
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
import { fetchData, checkDuplicate } from '../api';

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

        // create new array from inputs string, Set has no duplicates
        let inputs = [...new Set(this.splitInputs())];
        // remove all duplicates, ie date already in current list
        inputs = inputs.filter(
          (input) => !checkDuplicate(input, this.listState.factsList)
        );
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
      store.addOne(element);
    };

    const clearState = () => {
      store.clearAll();
    };
    return { listState: store.getState(), addToState, clearState };
  },
};
</script>

<style scoped>
.actions-wrapper {
  display: flex;
}
.error {
  margin: 0;
  color: #f56a6a;
  max-height: 3rem;
  max-width: 26.24rem;
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
