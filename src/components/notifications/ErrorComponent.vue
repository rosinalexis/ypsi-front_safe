<template>
  <div
    class="alert alert-danger mx-auto alert-dismissible fade show"
    role="alert"
  >
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "ErrorComponent",
  props: ["error"],
};
</script>

<style scoped></style>
