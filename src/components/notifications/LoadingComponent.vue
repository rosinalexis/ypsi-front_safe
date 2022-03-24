<template>
  <div v-if="loading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
  props: ["loading"],
};
</script>

<style scoped></style>
