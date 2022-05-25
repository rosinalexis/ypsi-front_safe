<template>
  <div class="container page">
    <div v-if="this.user.roles[0] === 'ROLE_ADMIN'" class="container">
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>

      <h1 class="my-4 text-uppercase text-center">Modifier un poste</h1>

      <div class="container bg-light border">
        <form class="row" @submit.prevent="updateJob()">
          <div class="my-5 col-lg-6 mx-auto">
            <div class="mb-3">
              <label for="title" class="form-label">
                intitulé du poste
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

            <router-link to="/jobs" class="mx-2 btn btn-primary">
              liste des postes
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
  name: "EditJobView",
  components: { SuccessComponent, ErrorComponent },
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

    async updateJob() {
      try {
        let currentJob = {
          title: "",
          description: "",
          category: "",
        };

        //insertion des valeurs
        currentJob.title = this.job.title;

        if (this.job.description) {
          currentJob.description = this.job.description;
        }

        if (this.job.category.title) {
          const category = this.categoriesList.find(
            (category) => category.title === this.job.category.title
          );

          currentJob.category = "api/categories/" + category.id;
        }
        //envoyer la requete vers le serveur
        const response = await axios.put("jobs/" + this.jobId, currentJob);

        if (response.status === 200) {
          this.success = "Modificaion du poste Ok";
        }
      } catch (error) {
        this.error = "Impossible de modifier le poste.";
      }
    },
    async getCurrentJob() {
      try {
        //envoyer la requete vers le serveur
        const response = await axios.get("jobs/" + this.jobId);

        if (response.status === 200) {
          this.job = response.data;
        }
      } catch (error) {
        this.error = "Impossible récupérer le poste.";
      }
    },

    async getCategoriesList() {
      try {
        //envoyer la requete vers le serveur
        const response = await axios.get("categories");

        if (response.status === 200) {
          response.data.forEach((element) => {
            this.categoriesList.push(element);
          });
        }
      } catch (error) {
        this.error = "Impossible récupérer la liste des catégories.";
      }
    },
  },
  async created() {
    //récuperation du poste
    await this.getCurrentJob();

    await this.getCategoriesList();
  },
};
</script>

<style scoped></style>
