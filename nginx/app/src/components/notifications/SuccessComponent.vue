<template>
  <div
    class="alert alert-success mx-auto alert-dismissible fade show"
    role="alert"
  >
    {{ success }}
  </div>
</template>

<script>
export default {
  name: "SuccessComponent",
  props: ["success"],
};
</script>

<style scoped></style>
