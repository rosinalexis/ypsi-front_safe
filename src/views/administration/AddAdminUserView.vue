<template>
  <div class="page">
    <error-component v-if="error" :error="error"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="mb-5 text-uppercase text-center">
      |*** Configuration de l'Application ***| <br />
      Ajouter un administrateur
    </h1>
    <div class="container">
      <form class="row" @submit.prevent="addAdminUser()">
        <div class="col-lg-6 mx-auto">
          <div class="mb-3">
            <label for="email">Email :</label>
            <input
              class="form-control"
              type="text"
              name="email"
              id="email"
              v-model="user.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password">Mot de passe :</label>
            <input
              class="form-control"
              type="password"
              name="password"
              id="password"
              v-model="user.password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword">Confirmer le mot de passe:</label>
            <input
              class="form-control"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
            />
          </div>
          <div class="d-grid gap-2 col-lg-12 mx-auto">
            <button class="btn btn-lg btn-primary" type="submit">
              Ajouter un administrateur
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SuccessComponent from "@/components/notifications/SuccessComponent";
import ErrorComponent from "@/components/notifications/ErrorComponent";

export default {
  name: "AddAdminUserView",
  components: { SuccessComponent, ErrorComponent },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      error: "",
      success: "",
    };
  },
  methods: {
    addAdminUser() {
      if (!this.user.email && !this.user.password) {
        this.error = "un des champs est vide.";
      } else {
        this.success = "L'utilisateur a été créé";
      }
    },
  },
};
</script>

<style scoped></style>
