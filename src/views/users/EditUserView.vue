<template>
  <div class="container page">
    <div v-if="this.user.roles[0] === 'ROLE_ADMIN'" class="container">
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>

      <h1 class="my-4 text-uppercase text-center">Modifier un utilisateur</h1>

      <div class="container bg-light border">
        <form class="row" @submit.prevent="updateUser()">
          <div class="my-5 col-lg-6 mx-auto">
            <div class="mb-3">
              <label for="email" class="form-label">
                Email de l'utilisateur
                <span class="text-danger">*</span>:
              </label>
              <input
                v-model="currentUser.email"
                type="email"
                class="form-control"
                id="email"
                readonly
              />
            </div>
            <div class="mb-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="activated"
                  v-model="currentUser.isActivated"
                />
                <label class="form-check-label" for="activated"
                  >état du compte:</label
                >
              </div>
            </div>

            <div class="mb-3">
              <label for="roles" class="form-label">
                Role de l'utilisateur:
                <span class="text-danger">*</span>:
              </label>
              <select v-model="preRole" class="form-select" id="roles">
                <option disabled value="">Choisissez</option>
                <option value="ROLE_USER">Utilisateur</option>
                <option value="ROLE_ADMIN">Administration</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="etablishment" class="form-label">
                établissement de l'utilisateur:
                <span class="text-danger">*</span>:
              </label>
              <select
                v-model="preEstablishment"
                class="form-select"
                multiple
                id="etablishment"
              >
                <option disabled value="">Choisissez</option>
                <option
                  v-for="establishment in establishmentList"
                  :key="establishment.id"
                  :value="'api/establishments/' + establishment.id"
                >
                  {{ establishment.name }}
                </option>
              </select>
            </div>
            <div class="text-center">
              <button class="px-5 btn btn-success">Modifier</button>
            </div>
          </div>
        </form>
      </div>
      <div class="my-5 container">
        <div class="row">
          <div class="col-lg-6">
            <router-link to="/home" class="btn btn-danger">
              Page d'accueil
              <i class="bi bi-house"></i>
            </router-link>

            <router-link to="/users" class="mx-2 btn btn-primary">
              liste des utilisateurs
              <i class="bi bi-card-list"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <h1 class="text-uppercase text-center text-danger">
        Vous n'êtes pas ADMIN !!!!
      </h1>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "EditUserView",
  components: { SuccessComponent, ErrorComponent },
  data() {
    return {
      currentUser: {
        email: "",
        isActiveted: null,
        roles: [],
        password: "",
        establishment: [],
      },
      establishmentList: [],
      currentUserId: this.$route.params.id,
      preRole: "",
      preEstablishment: [],
      error: "",
      success: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    resetMessages() {
      this.error = "";
      this.success = "";
    },

    async getTheUser() {
      try {
        //envoyer la requete vers le serveur
        const response = await axios.get("users/" + this.currentUserId);
        if (response.status === 200) {
          this.currentUser = await response.data;
          this.preRole = await this.currentUser.roles[0];
        }
      } catch (error) {
        this.error = "l'utilisateur est introuvable.";
      }
    },

    async updateUser() {
      try {
        //reset des messages
        this.resetMessages();

        //changement du role
        this.currentUser.roles[0] = this.preRole;

        this.currentUser.establishment = [];

        this.preEstablishment.forEach((element) => {
          this.currentUser.establishment.push(element);
        });

        //enoyer la requête
        const response = await axios.put(
          "users/" + this.currentUser.id,
          this.currentUser
        );
        if (response.status === 200) {
          this.success = "Modification sur le compte ok.";
        }
      } catch (error) {
        this.error =
          "Impossible de modifier l'état de l'utilisateur. \n" +
          error.response.data.detail;
      }
    },
    async getEstablishmentList() {
      try {
        const response = await axios.get("establishments");
        if (response.status === 200) {
          response.data.forEach((element) => {
            this.establishmentList.push(element);
          });
        }
      } catch (error) {
        this.error = "Impossible de récupérer la liste des établissements.";
      }
    },
  },
  async created() {
    //récuperation de l'utilisateur
    await this.getTheUser();

    //récuperation de la liste des établissements
    await this.getEstablishmentList();
  },
};
</script>

<style scoped></style>
