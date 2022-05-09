<template>
  <div class="container page">
    <div>
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>

      <div class="my-4 row container mx-auto">
        <div class="p-5 col-lg-6 shadow">
          <h2 class="h3 text-center">Validation compte</h2>
          <p class="text-center text-uppercase text-dark my-5">
            Validation du compte en cours de traitement
          </p>
          <p class="text-center text-uppercase text-dark my-5">
            Redirection vers la page d'acceuil une fois le nouveau mot de passe
            ok.
          </p>
        </div>

        <div class="p-5 col-lg-6 shadow">
          <h2 class="h3 text-center">Nouveau mot de passe</h2>

          <p class="text-center text-uppercase text-dark my-5">
            Merci de saisir votre nouveau mot de passe :
          </p>

          <form method="post" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="new_password_second"> Mot de passe :</label>
              <input
                type="password"
                class="form-control"
                name="new_password_first"
                id="new_password_first"
                v-model="new_password_first"
              />
            </div>
            <div class="mb-3">
              <label for="new_password_second"
                >Confirmer le mot de passe :</label
              >
              <input
                type="password"
                class="form-control"
                name="new_password_second"
                id="new_password_second"
                v-model="new_password_second"
              />
            </div>
            <div class="d-grid col-6 mx-auto">
              <button
                type="submit"
                class="btn btn-primary btn-block"
                formnovalidate
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import axios from "axios";

export default {
  name: "ConfirmUserView",
  components: { SuccessComponent, ErrorComponent },
  data() {
    return {
      new_password_first: "",
      new_password_second: "",
      token: this.$route.params.token,
      error: "",
      success: "",
    };
  },
  methods: {
    resetMessages() {
      this.error = "";
      this.success = "";
    },
    async handleSubmit() {
      try {
        console.log("click");
        console.log(process.env.HTTP_API_URL);
        //reset des messages
        this.resetMessages();

        //je check si le mot de passe
        if (this.new_password_first === this.new_password_second) {
          let data = new FormData();
          data.append("new_password_first", this.new_password_first);
          data.append("new_password_second", this.new_password_second);

          axios.defaults.baseURL = "https://api-cloud-rh.ypsi.dev/";
          const response = await axios.post(
            "/confirm-user/" + this.token,
            data
          );

          if (response.status === 202) {
            await this.$router.push("/login");
          }
        }
      } catch (error) {
        this.error =
          "Impossible de modifier le mot de passe de l'utilisateur. \n" +
          error.response.data.detail;
      }
    },
  },
};
</script>

<style scoped></style>
