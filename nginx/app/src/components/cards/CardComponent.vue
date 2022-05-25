<template>
  <div class="my-4 col-lg-4">
    <div class="py-2 card border border-primary bg-primary shadow">
      <div class="card-body">
        <h5 class="card-title text-white">
          <slot></slot>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
};
</script>

<style></style>
