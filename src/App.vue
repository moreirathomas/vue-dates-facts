<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<script>
import Header from './components/Header';
export default {
  name: 'App',
  components: { Header },
};
</script>

<style>
@import './style/main.css';
</style>
