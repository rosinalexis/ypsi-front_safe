<template>
  <div class="page">
    <h1 class="mb-4 mx-4 text-capitalize">administration</h1>
    <div class="mx-4">
      <div class="row" v-if="this.user">
        <p>section administration de l'application</p>
      </div>

      <div v-else>
        <loading-component loading="true"></loading-component>
        <p>Chargement de la page...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoadingComponent from "@/components/notifications/LoadingComponent";

export default {
  name: "AdministrationView",
  components: { LoadingComponent },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped></style>
