<template>
  <div class="container page">
    <div v-if="this.user.roles[0] === 'ROLE_ADMIN'" class="container">
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>

      <h1 class="my-4 text-uppercase text-center">Ajouter un poste</h1>

      <div class="container bg-light border">
        <form class="row" @submit.prevent="addNewJob()">
          <div class="my-5 col-lg-6 mx-auto">
            <div class="mb-3">
              <label for="title" class="form-label">
                Intitulé du poste
                <span class="text-danger">*</span>:
              </label>
              <input
                v-model="job.title"
                type="title"
                class="form-control"
                id="title"
                required
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">
                Description du poste:
              </label>
              <textarea
                v-model="job.description"
                type="text"
                class="form-control"
                id="description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label"> Catégorie du poste : </label>
              <select v-model="job.category.title" class="form-select">
                <option
                  v-for="category in categoriesList"
                  :key="category.id"
                  :value="category.title"
                >
                  {{ category.title }}
                </option>
              </select>
            </div>

            <div class="text-center">
              <button class="px-5 btn btn-success">Ajouter</button>
            </div>
          </div>
        </form>
      </div>
      <div class="my-5 container">
        <div class="row">
          <div class="col-12">
            <loading-component :loading="loading"></loading-component>
          </div>
          <div class="col-lg-6">
            <router-link to="/home" class="btn btn-danger">
              Page d'accueil
              <i class="bi bi-house"></i>
            </router-link>

            <router-link to="/jobs" class="mx-2 btn btn-primary">
              Liste des postes
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
import LoadingComponent from "@/components/notifications/LoadingComponent";

export default {
  name: "AddJobView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      jobId: this.$route.params.id,
      job: {
        title: "",
        description: [],
        user: "",
        category: {
          id: "",
          title: "",
        },
      },
      categoriesList: [],
      error: "",
      success: "",
      loading: false,
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

    async addNewJob() {
      try {
        this.loading = true;

        let currentJob = {
          title: "",
          description: "",
          category: "",
          establishment: "",
        };

        //insertion des valeurs
        currentJob.title = this.job.title;

        //ajout de la description
        if (this.job.description) {
          currentJob.description = this.job.description;
        }

        //ajout de la category
        if (this.job.category.title) {
          const category = this.categoriesList.find(
            (category) => category.title === this.job.category.title
          );

          currentJob.category = "api/categories/" + category.id;
        }

        //ajout de l'établissement
        currentJob.establishment =
          "api/establishments/" + this.user.currentEstablishment;

        //envoyer la requete vers le serveur
        const response = await axios.post("jobs", currentJob);

        if (response.status === 201) {
          this.loading = false;
          this.success = "Ajout du poste Ok";
          await this.$router.push("/jobs");
        }
      } catch (error) {
        this.loading = false;
        this.error = "Impossible d'ajouter le poste.";
      }
    },
    async getCategoriesList() {
      try {
        //envoyer la requete vers le serveur
        const response = await axios.get("categories");

        if (response.status === 200) {
          response.data.forEach((category) => {
            if (this.user.currentEstablishment === category.establishment.id) {
              this.categoriesList.push(category);
            }
          });
        }
      } catch (error) {
        this.error = "Impossible récupérer la liste des catégories.";
      }
    },
  },
  async created() {
    await this.getCategoriesList();
  },
};
</script>

<style scoped></style>
