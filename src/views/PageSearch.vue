<template>
  <section class="content-header">
    <div class="text-wrapper">
      <h3>Enter dates separated by commas:</h3>
      <p>
        Use months and days, i.e. <code>mm/dd</code>, <code>m/d</code>,
        <code>mm/d</code> or <code>m/dd</code> formats. For example:
        <code class="copy" @click="copyInput" ref="toCopy">05/11, {{ today }}</code
        >.
        <code class="copied" v-if="showCopied">Text copied!</code>
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

<script lang="ts">
import FactCard from '../components/FactCard.vue';
import store from '../store';
import { fetchData } from '../utils/api';
import { addOneToStorage } from '../utils/storage';
import { computeTerms } from '../utils/terms';
import { Fact } from '../types';

export default {
  name: 'PageSearch',
  components: { FactCard },

  data() {
    return {
      currentList: [] as Fact[],
      inputString: '',
      errorMessage: '',
      loading: false,
      showCopied: false,
    };
  },

  computed: {
    today(): string {
      const today = new Date();
      return today.getMonth() + 1 + '/' + today.getDate();
    },
  },

  methods: {
    async handleSearch(): Promise<void> {
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

    clearCurrent(): void {
      this.currentList.length = 0;
    },

    copyInput(): void {
      this.showCopied = true;
      const copyString = this.$refs.toCopy.innerHTML;
      navigator.clipboard.writeText(copyString);
      setTimeout(() => (this.showCopied = false), 1500);
    },
  },

  setup() {
    const addToStateAndStorage = (element: Fact): void => {
      store.addOne(element);
      addOneToStorage(element);
    };

    const canAdd = (term: string): boolean => {
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
.copy {
  cursor: pointer;
}
.copied {
  color: var(--green);
  float: right;
}
.error {
  margin: 0;
  color: var(--red);
  max-height: 3rem;
  max-width: 10.5625rem;
  margin: 0.25rem 0.25rem 0.25rem auto;
}
.cards-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
