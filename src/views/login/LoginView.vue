<template>
  <div id="home" class="row">
    <div class="col-lg-4 mx-auto">
      <form @submit.prevent="handleSubmit">
        <error-component v-if="error" :error="error"></error-component>

        <h1 class="h3 mb-3 fw-normal text-center text-uppercase">
          authentification
        </h1>

        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="name@example.com"
            required
          />
        </div>

        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="******"
          />
        </div>
        <loading-component :loading="loading" class="my-4"></loading-component>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Connexion
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "@/components/notifications/LoadingComponent";
import ErrorComponent from "@/components/notifications/ErrorComponent";
import axios from "axios";

export default {
  name: "LoginView",
  components: { ErrorComponent, LoadingComponent },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        //activation du loading
        this.loading = true;

        const response = await axios.post("login", {
          username: this.email,
          password: this.password,
        });

        //si le login est ok
        if (response.status === 204) {
          //récuperation de l'utilisateur
          const response = await axios.get("users/auth");
          const user = await response.data;
          await this.$store.dispatch("setUser", user);

          //désactivation du loading
          this.loading = false;
          await this.$router.push("/home");
        }
      } catch (error) {
        //désactivation du loading
        this.loading = false;
        this.error = "Identifiant ou mot de passe invalide";
      }
    },
  },
};
</script>

<style scoped>
#home {
  height: 80vh;
}
</style>
