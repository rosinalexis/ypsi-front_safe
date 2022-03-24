<template>
  <nav-component></nav-component>
  <main class="container">
    <slot></slot>
  </main>
  <footer-component></footer-component>
</template>

<script>
import NavComponent from "@/components/navigations/NavComponent";
import FooterComponent from "@/components/navigations/FooterComponent";
export default {
  name: "DefaultLayout",
  components: { FooterComponent, NavComponent },
};
</script>

<style scoped></style>
