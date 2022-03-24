<template>
  <div id="AddCategory" class="container">
    <div v-if="this.user.roles[0] === 'ROLE_ADMIN'" class="container">
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>
      <h1 class="my-4 text-uppercase text-center">Ajouter une catégorie</h1>
      <div class="container bg-light border">
        <form class="row" @submit.prevent="addCategory()">
          <div class="my-5 col-lg-6 mx-auto">
            <div class="mb-3">
              <label for="title" class="form-label"
                >Titre de la catégorie <span class="text-danger">*</span></label
              >
              <input
                v-model="this.category.title"
                type="text"
                class="form-control"
                id="title"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label"
                >Description de la catégorie</label
              >
              <textarea
                v-model="this.category.description"
                class="form-control"
                id="description"
                rows="3"
              ></textarea>
            </div>
            <div class="text-center">
              <button class="px-5 btn btn-success">Ajouter</button>
            </div>
          </div>
        </form>
      </div>
      <div class="my-5 container">
        <div class="row">
          <div class="col-lg-6">
            <router-link to="/home" class="btn btn-danger"
              >Page d'accueil <i class="bi bi-house"></i
            ></router-link>
            <router-link to="/categories" class="mx-2 btn btn-primary"
              >liste des catégories <i class="bi bi-card-list"></i
            ></router-link>
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
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "AddCategory",
  components: {
    SuccessComponent,
    ErrorComponent,
  },
  data() {
    return {
      category: {
        title: "",
        description: "",
      },
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
    async addCategory() {
      try {
        //reset de mes affichages
        this.resetMessages();

        //envoyer la requete vers le serveur
        const response = await axios.post("categories", this.category);
        if (response.status === 201) {
          //informer l'utilisateur
          this.success = "ajout de la catégorie ok !";

          //reset de la catégorie
          this.category.title = "";
          this.category.description = "";
        }
      } catch (error) {
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = "Impossible d'ajouter la categorie.";
        }
      }
    },
  },
};
</script>

<style scoped>
#AddCategory {
  min-height: 80vh;
}
</style>
