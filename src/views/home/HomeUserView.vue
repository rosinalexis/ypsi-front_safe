<template>
  <div id="home" class="my-5 container">
    <h1 class="my-2 text-uppercase text-center">Bienvenue sur l'interface</h1>
    <error-component v-if="errors" :error="errors"></error-component>
    <div class="container">
      <div v-if="this.myUser" class="row text-center">
        <card-component v-if="this.myUser.roles[0] === 'ROLE_ADMIN'">
          <router-link
            :to="{ name: 'administration' }"
            class="text-white nav-link"
          >
            Administration
          </router-link>
        </card-component>

        <card-component v-if="this.myUser.roles[0] === 'ROLE_ADMIN'">
          <router-link
            :to="{ name: 'listContact' }"
            class="text-white nav-link"
          >
            Candidatures
          </router-link>
        </card-component>

        <card-component>
          <router-link
            :to="{ name: 'userProfile' }"
            class="text-white nav-link"
          >
            Mon profil
          </router-link>
        </card-component>
      </div>
      <div v-else class="row">
        <loading-component loading="{{true}}"></loading-component>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/cards/CardComponent";
import ErrorComponent from "@/components/notifications/ErrorComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "HomeUserView",
  components: {
    LoadingComponent,
    CardComponent,
    ErrorComponent,
  },

  data() {
    return {
      jobAdverts: [],
      errors: null,
    };
  },

  computed: {
    ...mapGetters({
      myUser: "user",
    }),
  },

  methods: {
    async findJobsAdverts() {
      try {
        const response = await axios.get("job_adverts");

        if (response.status === 200) {
          response.data.forEach((element) => {
            if (this.jobAdverts.length < 3 && element.published) {
              this.jobAdverts.push(element);
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
#home {
  min-height: 80vh;
}
</style>
