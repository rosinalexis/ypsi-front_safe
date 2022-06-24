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
              type="email"
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
              v-model="user.confirmPassword"
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
import axios from "axios";

export default {
  name: "AddAdminUserView",
  components: { SuccessComponent, ErrorComponent },
  data() {
    return {
      user: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
      success: "",
    };
  },
  methods: {
    resetMessages() {
      this.error = "";
      this.success = "";
    },
    async addAdminUser() {
      try {
        this.resetMessages();
        this.checkUserInfo();
        axios.defaults.baseURL = `${process.env.VUE_APP_HTTP_API_URL}`;

        let data = new FormData();
        data.append("email", this.user.email);
        data.append("password", this.user.password);
        data.append("confirmPassword", this.user.confirmPassword);

        const httpClient = axios.create({
          baseURL: `${process.env.VUE_APP_HTTP_API_URL}`,
        });

        const response = await httpClient.post("/add/admin/user", data);

        if (response.status === 201) {
          this.success = "Ajout de l'administrateur ok.";
          await this.$router.push("/login");
        }
      } catch (e) {
        this.error = e.response.data.detail;
      }
    },
    checkUserInfo() {
      if (
        !this.user.email ||
        !this.user.password ||
        !this.user.confirmPassword ||
        this.user.confirmPassword !== this.user.password
      ) {
        throw new Error(
          "Un des champs est vide ou les mots de passe ne sont pas identiques."
        );
      }
    },
  },
};
</script>

<style scoped></style>
