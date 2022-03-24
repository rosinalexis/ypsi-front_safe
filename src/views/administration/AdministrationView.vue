<template>
  <div id="administration">
    <h1 class="mb-4 mx-4 text-capitalize">administration</h1>
    <div class="container">
      <div class="row" v-if="this.user">
        <p>section administration de l'application</p>
      </div>

      <div v-else>
        <loading-component loading="true"></loading-component>
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

<style scoped>
#administration {
  min-height: 75vh;
}
</style>
