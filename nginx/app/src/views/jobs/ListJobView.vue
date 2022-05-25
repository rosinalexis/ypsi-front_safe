<template>
  <div class="container page">
    <error-component v-if="errors" :error="errors"></error-component>
    <h1 class="my-2 text-uppercase text-center">Liste des postes</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="rechercher un poste"
          />
        </div>
      </div>
      <div
        class="my-4 table-responsive table-wrapper-scroll-y my-custom-scrollbar"
      >
        <table class="table">
          <thead class="sticky-top table-primary">
            <tr>
              <th>Intitulé</th>
              <th>Utilisateur</th>
              <th>Catégorie</th>
              <th>Date de création</th>
              <th v-if="this.user.roles[0] === 'ROLE_ADMIN'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="jobApp in filteredJobs" :key="jobApp.id">
              <td>{{ jobApp.title }}</td>
              <td>
                <div v-if="jobApp.user">
                  <p v-if="jobApp.user.profile">
                    {{
                      jobApp.user.profile.firstname +
                      " " +
                      jobApp.user.profile.lastname
                    }}
                  </p>
                  <p v-else>Pas de profil</p>
                </div>
                <p v-else class="fst-italic">Pas d'utilisateur</p>
              </td>
              <td>
                <p v-if="jobApp.category">{{ jobApp.category.title }}</p>
                <p v-else class="fst-italic">Pas de categorie</p>
              </td>
              <td>
                {{ new Date(jobApp.createdAt).toLocaleString() }}
              </td>
              <td v-if="this.user.roles[0] === 'ROLE_ADMIN'">
                <router-link
                  :to="{ name: 'editJob', params: { id: jobApp.id } }"
                  class="my-1 mx-1 btn btn-primary"
                >
                  <i class="bi bi-pencil-square text-white"></i>
                </router-link>
                <button
                  class="my-1 mx-1 btn btn-primary"
                  @click="deleteJob(jobApp.id)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <loading-component :loading="loading"></loading-component>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <router-link to="/administration" class="px-4 btn btn-danger">
            Retour <i class="bi bi-back"></i>
          </router-link>
          <router-link
            :to="{
              name: 'addJob',
            }"
            class="px-4 mx-2 btn btn-primary"
          >
            Ajouter un poste
            <i class="bi bi-back"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "ListJobView",
  components: { LoadingComponent, ErrorComponent },
  data() {
    return {
      jobsList: [],
      errors: "",
      search: "",
      loading: true,
    };
  },
  computed: {
    filteredJobs: function () {
      return this.jobsList.filter((job) => {
        return (
          job.title.match(this.search) ||
          (job.category ? job.category.title.match(this.search) : false)
        );
      });
    },
    ...mapState(["user"]),
  },

  methods: {
    resetMessages() {
      this.errors = "";
      this.success = "";
    },
    async getJobsList() {
      try {
        //TODO: faire une requête filter via API Platform
        const response = await axios.get("jobs");
        if (response.status === 200) {
          //insertion dans la liste
          response.data.forEach((job) => {
            if (job.establishment.id === this.user.currentEstablishment) {
              this.jobsList.push(job);
            }
          });
        }

        //désactivation du loading
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = "Impossible de récupérer la liste des postes.";
      }
    },
    async deleteJob(id) {
      try {
        //activation du loading...
        this.loading = true;
        if (confirm("Voulez-vous vraiment supprimer ce poste ? ")) {
          //reset des messages
          this.resetMessages();

          //envoyer la requête à l'utilisateur
          const response = await axios.delete("jobs/" + id);

          //attendre la réponse
          if (response.status === 204) {
            this.success = "le poste a été supprimé.";
            //reset de la liste
            this.jobsList = [];
            await this.getJobsList();
          }
        }
        //désactivation du Loading ...
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = "Impossible de supprimer  l'utilisateurs.";
      }
    },
  },
  async created() {
    //récuperation de la liste des postes
    await this.getJobsList();
  },
};
</script>

<style scoped></style>
