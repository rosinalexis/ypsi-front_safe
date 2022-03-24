<template>
  <div class="container">
    <div v-if="this.user.roles[0] === 'ROLE_ADMIN'" class="container">
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>
      <h1 class="my-4 text-uppercase text-center">Modifier une catégorie</h1>
      <div class="container">
        <div class="row">
          <div class="my-5 p-5 col-lg-6 bg-white shadow">
            <div>
              <p class="text-capitalize">
                <strong>Titre:</strong> {{ category.title }}
              </p>
              <p>
                <strong class="text-capitalize">Description:</strong>
                {{ category.description }}
              </p>
              <p>
                <strong class="text-capitalize">Date de création:</strong>
                {{ new Date(category.createdAt).toLocaleString() }}
              </p>
              <p>
                <strong class="text-capitalize">Dernière mise à jour:</strong>
                {{ new Date(category.updatedAt).toLocaleString() }}
              </p>
            </div>
          </div>
          <div class="my-5 p-5 col-lg-6 text-white bg-dark shadow">
            <form class="row" @submit.prevent="updateCategory()">
              <div class="mb-3">
                <label for="title" class="form-label"
                  >Titre de la catégorie
                  <span class="text-danger">*</span></label
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
                <button class="px-5 btn btn-success">Modifier</button>
              </div>
            </form>
          </div>
        </div>
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
  name: "EditCategoryView",
  components: {
    SuccessComponent,
    ErrorComponent,
  },
  data() {
    return {
      category: {
        title: "",
        description: "",
        createdAt: "",
        updatedAt: "",
      },
      error: "",
      success: "",
      categoryId: this.$route.params.id,
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
    async updateCategory() {
      try {
        //reset de mes affichages
        this.resetMessages();

        //envoyer la requete vers le serveur
        const response = await axios.put(
          "categories/" + this.categoryId,
          this.category
        );

        if (response.status === 200) {
          await this.getTheCurrentCategory;
          //informer l'utilisateur
          this.success = "ajout de la catégorie ok !";
        }
      } catch (error) {
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = "Impossible d'ajouter la categorie.";
        }
      }
    },

    async getTheCurrentCategory() {
      try {
        const response = await axios.get("categories/" + this.categoryId);
        if (response.status === 200) {
          this.category = response.data;
        }
      } catch (error) {
        if (error.response.data.detail) {
          this.error = error.response.data.detail;
        } else {
          this.error = "Impossible de modifier  la categorie.";
        }
      }
    },
  },
  async created() {
    //check if the category exist
    await this.getTheCurrentCategory();
  },
};
</script>

<style scoped></style>
