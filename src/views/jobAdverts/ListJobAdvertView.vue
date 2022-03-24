<template>
  <div class="container">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="my-2 text-uppercase text-center">Liste des offres d'emploi</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="rechercher une offre"
          />
        </div>
      </div>
      <div
        class="my-4 table-responsive table-wrapper-scroll-y my-custom-scrollbar"
      >
        <table class="my-4 table">
          <thead class="sticky-top table-dark">
            <tr>
              <th>Publication</th>
              <th>Intitulé</th>
              <th>Type de contract</th>
              <th>Date de création</th>
              <th v-if="this.user.roles[0] === 'ROLE_ADMIN'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="jobAdvertApp in filteredJobAdverts"
              :key="jobAdvertApp.id"
              :class="!jobAdvertApp.published ? 'table-danger' : ''"
            >
              <td>
                <span v-if="jobAdvertApp.published" class="badge bg-success">
                  Oui
                </span>
                <span v-else class="badge bg-danger"> Non </span>
              </td>
              <td>{{ jobAdvertApp.title }}</td>
              <td>{{ jobAdvertApp.contractType }}</td>
              <td>
                {{ new Date(jobAdvertApp.createdAt).toLocaleString() }}
              </td>
              <td v-if="this.user.roles[0] === 'ROLE_ADMIN'">
                <router-link
                  :to="{
                    name: 'editJobAdvert',
                    params: { id: jobAdvertApp.id },
                  }"
                  class="my-1 mx-1 btn btn-primary"
                >
                  <i class="bi bi-pencil-square text-white"></i>
                </router-link>

                <button
                  class="my-1 mx-1 btn btn-primary"
                  @click="deleteJobAdvert(jobAdvertApp)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="container">
      <loading-component :loading="loading"></loading-component>
      <div class="row">
        <div class="col">
          <router-link to="/administration" class="btn btn-danger py-2 px-4">
            Page d'accueil
            <i class="bi bi-house"></i>
          </router-link>
          <router-link
            v-if="this.user.roles[0] === 'ROLE_ADMIN'"
            to="/jobAdverts/add"
            class="mx-2 btn btn-primary py-2 px-4"
          >
            Ajouter une offre <i class="bi bi-plus-lg"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ListJobAdvertView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      jobAdvertsList: [],
      errors: "",
      success: "",
      search: "",
      loading: true,
    };
  },
  computed: {
    filteredJobAdverts: function () {
      return this.jobAdvertsList.filter((jobAdvert) => {
        return (
          jobAdvert.title.match(this.search) ||
          jobAdvert.contractType.match(this.search)
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
    async getJobAdvertList() {
      try {
        //activation du loading
        this.loading = true;
        const response = await axios.get("job_adverts");

        //insertion dans la liste
        if (response.status === 200) {
          response.data.forEach((jobAdvert) => {
            if (this.user.currentEstablishment === jobAdvert.establishment.id) {
              this.jobAdvertsList.push(jobAdvert);
            }
          });
        }

        //désactivation du message
        this.loading = false;
      } catch (error) {
        //désactivation du message
        this.loading = false;
        this.errors = "Impossible de récupérer la liste des offres d'emploi.";
      }
    },

    async deleteJobAdvert(jobAdvert) {
      try {
        //activation du loading
        this.loading = true;
        if (
          confirm("voulez-vous vraiment supprimer " + jobAdvert.title + " ?")
        ) {
          this.resetMessages();
          const response = await axios.delete("job_adverts/" + jobAdvert.id);

          if (response.status === 204) {
            this.success = "L'offre d'emploi a été supprimée.";
            this.jobAdvertsList = [];
            await this.getJobAdvertList();
          }
        }
      } catch (error) {
        //désactivation du message
        this.loading = false;
        this.errors = "Impossible de supprimer l'offre d'emploi.";
      }
    },
  },
  async created() {
    //valisation de l'utilisateur
    await this.getJobAdvertList();
  },
};
</script>

<style scoped></style>
