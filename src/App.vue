<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // for typescript support
import AppHeader from './components/AppHeader.vue';
import store from './store';
import { getAllStorage } from './utils/storage';
import { Fact } from './types';

export default defineComponent({
  name: 'App',
  components: { AppHeader },

  setup() {
    const addToState = (element: Fact) => {
      store.addOne(element);
    };

    return { listState: store.getState(), addToState };
  },

  created() {
    const storage = getAllStorage();
    storage.map((el) => this.addToState(el));
  },
});
</script>

<style>
@import './style/main.css';
</style>
