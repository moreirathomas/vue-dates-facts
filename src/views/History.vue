<template>
  <div class="history">
    <h2>Search history:</h2>
  </div>
  <!-- <div class="cards-container" v-if="dataList.length">
    <fact-card v-for="(data, index) in dataList" :data="data" :key="index" />
  </div> -->
</template>

<script>
export default {};
</script>

<style scoped>
.history {
  text-align: center;
  margin-bottom: 1rem;
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
