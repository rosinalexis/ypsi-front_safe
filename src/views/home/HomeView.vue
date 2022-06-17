<template>
  <div>
    <ErrorComponent v-if="errors" :error="errors"></ErrorComponent>
    <!-- hero -->
    <div class="row container">
      <div class="col-lg-6 text-center my-auto mx-auto">
        <div>
          <h1 class="text-uppercase fw-bolder">YPSI Cloud RH</h1>
          <p class="text-muted">La solution de gestion de RH de YPSI</p>
        </div>

        <div class="mb-5">
          <a
            :href="api_url + '/api/docs?ui=re_doc'"
            class="btn btn-primary px-4 text-white"
          >
            Utilisation
          </a>
          <a href="https://www.ypsi.fr/" class="mx-2 btn btn-warning text-white"
            >Site officiel</a
          >
        </div>
      </div>
      <div class="col-lg-6 mx-auto">
        <img
          src="@/assets/img/hero-img.png"
          alt="hero_image"
          class="img-fluid"
        />
      </div>
    </div>
    <!-- endHero -->

    <!-- histoire -->
    <div id="histoire" class="my-5 p-5">
      <h2
        class="mt-5 pt-5 text-uppercase text-center fw-bold fst-italic text-white"
      >
        "Maximiser le potentiel de votre système d’information"
      </h2>
    </div>
    <!-- endHistoire -->

    <!-- description-->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img src="@/assets/img/about.png" alt="about jpg" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h3
            class="my-5 text-center text-uppercase fw-bold border-bottom border-primary border-4"
          >
            Travailler chez YPSI
          </h3>
          <ul class="list-group">
            <li class="fs-2 list-group-item border-0">
              <i class="fas fa-check-square text-primary"></i>
              Une équipe jeune et dynamique.
            </li>
            <li class="fs-2 list-group-item border-0">
              <i class="fas fa-check-square text-primary"></i>
              Une équipe innovante.
            </li>
            <li class="fs-2 list-group-item border-0">
              <i class="fas fa-check-square text-primary"></i>
              Le calme de la campagne.
            </li>

            <li class="fs-2 list-group-item border-0">
              <div class="row">
                <div class="col-6 text-primary fw-bolder">+ 21 Clients</div>
                <div class="col-6 text-primary fw-bolder">+ 5 partenaires</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- end description -->

    <!-- offre d'emploi  -->
    <div class="my-5 pb-5 bg-light">
      <h2 class="py-5 mt-5 text-uppercase fw-bolder text-center">
        Les offres d'emploi chez YPSI
      </h2>

      <div class="row container mx-auto" v-if="jobAdverts">
        <div v-for="job in jobAdverts" :key="job.id" class="col-md-4">
          <div class="card mb-3 border-primary">
            <div class="card-body">
              <h5 class="card-title text-capitalize">{{ job.title }}</h5>

              <p class="card-text">
                <span class="fst-italic">{{
                  new Date(job.createdAt).toLocaleString()
                }}</span>
              </p>
              <div class="d-grid gap-2 col-8 mx-auto">
                <router-link
                  :to="{ name: 'addContact', params: { id: job.id } }"
                  class="btn btn-primary text-white"
                  >Postuler à l'offre
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="col mx-auto">
        <h2>
          Nous sommes en pause de recrutement pour le moment 🤷‍♂️ ou en période de
          vacance 🏖.
        </h2>
      </div>
    </div>
    <!-- end offre d'emploi -->

    <!-- contact -->
    <div class="my-5">
      <h2 class="text-center text-uppercase fw-bolder mb-5">Nous contacter</h2>
      <div class="row container mx-auto">
        <div class="col-lg-4 border-bottom border-top border-primary border-3">
          <ul class="list-group mt-4">
            <li class="list-group-item border-0">
              <div class="row">
                <div class="col-lg-2 my-3">
                  <i
                    class="bi bi-geo-alt-fill bg-primary p-3 rounded-circle text-white"
                  ></i>
                </div>
                <div class="col-lg-10">
                  <p class="mt-3">
                    <strong>Localisation:</strong>
                    8B rue de la Mairie, 79330 Glénay
                  </p>
                </div>
              </div>
            </li>
            <li class="list-group-item border-0">
              <div class="row">
                <div class="col-lg-2 my-3">
                  <i
                    class="bi bi-envelope bg-primary p-3 rounded-circle text-white"
                  ></i>
                </div>
                <div class="col-lg-10">
                  <p class="mt-3 px-1">
                    <strong>Email:</strong>
                    info@ypsi.fr
                  </p>
                </div>
              </div>
            </li>
            <li class="list-group-item border-0">
              <div class="row">
                <div class="col-lg-2 my-3">
                  <i
                    class="bi bi-telephone-fill bg-primary p-3 rounded-circle text-white"
                  ></i>
                </div>
                <div class="col-lg-10">
                  <p class="mt-3 px-1">
                    <strong>Téléphone:</strong>
                    +33 5 86 94 00 01
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="mt-2 mt-sm-0 col-xl-7 offset-lg-1 border-bottom border-top border-primary border-3 text-center"
        >
          <iframe
            class="py-2"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1929.1012855774532!2d-0.2529584574950941!3d46.86019999000249!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdf50657b2683026e!2sYPSI%20SAS!5e0!3m2!1sfr!2sfr!4v1641810824716!5m2!1sfr!2sfr"
            width="100%"
            height="250"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- end contact -->
  </div>
</template>

<script>
import axios from "axios";
import ErrorComponent from "@/components/notifications/ErrorComponent.vue";

export default {
  name: "HomeView",

  components: {
    ErrorComponent,
  },

  data() {
    return {
      jobAdverts: [],
      errors: null,
      api_url: process.env.VUE_APP_HTTP_API_URL,
    };
  },

  methods: {
    async findJobsAdverts() {
      try {
        const response = await axios.get("job_adverts");

        //récuperation des valeurs des offres d'emploi
        if (response.status === 200) {
          let data = response.data;
          data.forEach((job) => {
            if (job.published === true) {
              this.jobAdverts.push(job);
            }
          });
        }
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
#histoire {
  height: 400px;
  opacity: 0.75;
  background: url("/src/assets/img/cloud.jpg") center;
  background-size: cover;
}
</style>
