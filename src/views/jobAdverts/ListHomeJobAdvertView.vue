<template>
  <div id="home" class="my-5 container">
    <error-component v-if="errors" :error="errors"></error-component>

    <h1 class="my-2 text-uppercase text-center">
      LISTE DES OFFRES D'EMPLOI CHEZ YPSI
    </h1>

    <div class="container">
      <div id="jobList">
        <div class="my-5 col-lg-12" v-if="!jobAdverts">
          <p class="text-center">Pas d'offre d'emploi pour le moment.🤷‍♂️</p>
        </div>

        <div v-else class="row">
          <div
            v-for="jobAdvert in jobAdverts"
            :key="jobAdvert.id"
            class="my-5 col-lg-6"
          >
            <job-advert-card-compoment
              :title="jobAdvert.title"
              :contractType="jobAdvert.contractType"
              :jobDate="jobAdvert.createdAt"
              :description="jobAdvert.description"
            >
              <div class="d-grid gap-2 col-6 mx-auto">
                <router-link
                  :to="{ name: 'addContact', params: { id: jobAdvert.id } }"
                  class="mt-4 btn btn-primary fw-bold rounded-3"
                >
                  candidature ici
                </router-link>
              </div>
            </job-advert-card-compoment>
          </div>
        </div>

        <loading-component :loading="loading"></loading-component>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import JobAdvertCardCompoment from "@/components/cards/JobAdvertCardComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import axios from "axios";

export default {
  name: "ListHomeJobAdvertView",
  components: { LoadingComponent, JobAdvertCardCompoment, ErrorComponent },
  data() {
    return {
      jobAdverts: [],
      errors: null,
      loading: true,
    };
  },
  methods: {
    async findJobsAdverts() {
      try {
        const response = await axios.get("job_adverts");

        //récuperation des valeurs des offres d'emploi
        let data = response.data;

        for (let index = 0; index < data.length; index++) {
          //je filtre mes valeurs en fonction de la publication
          if (data[index].published === true) {
            this.jobAdverts.push(data[index]);
          }
        }
        //désactivation du laoding
        this.loading = false;
      } catch (error) {
        this.errors = "Impossible de récupérer la liste des offres d'emploi.";
      }
    },
  },
  async created() {
    await this.findJobsAdverts();
  },
};
</script>

<style scoped>
#home {
  min-height: 80vh;
}
</style>
