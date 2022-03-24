<template>
  <div class="container">
    <error-component v-if="error" :error="error"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="my-2 text-uppercase text-center">Liste des catégories</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="rechercher une catégorie"
          />
        </div>
      </div>
      <div
        class="my-4 table-responsive table-wrapper-scroll-y my-custom-scrollbar"
      >
        <table class="my-4 table">
          <thead class="sticky-top table-dark">
            <tr>
              <th>Intitulé</th>
              <th>Description</th>
              <th>Date de création</th>
              <th v-if="this.user.roles[0] === 'ROLE_ADMIN'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="categoryApp in filteredCateogries" :key="categoryApp.id">
              <td>{{ categoryApp.title }}</td>
              <td>{{ categoryApp.description }}</td>
              <td>
                {{ new Date(categoryApp.createdAt).toLocaleString() }}
              </td>
              <td v-if="this.user.roles[0] === 'ROLE_ADMIN'">
                <router-link
                  :to="{ name: 'editCategory', params: { id: categoryApp.id } }"
                  class="my-1 mx-1 btn btn-primary"
                >
                  <i class="bi bi-pencil-square"></i>
                </router-link>

                <button
                  class="my-1 mx-1 btn btn-primary"
                  @click="deleteCategory(categoryApp)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <loading-component :loading="loading"></loading-component>
      <div class="row">
        <div class="col">
          <router-link to="/administration" class="px-4 btn btn-danger">
            Retour <i class="bi bi-back"></i
          ></router-link>
          <router-link
            v-if="this.user.roles[0] === 'ROLE_ADMIN'"
            to="/categories/add"
            class="px-4 mx-2 btn btn-primary"
          >
            Ajouter une categorie <i class="bi bi-bookmark-plus-fill"></i
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "ListCategoryView",
  components: {
    LoadingComponent,
    SuccessComponent,
    ErrorComponent,
  },
  data() {
    return {
      categoriesList: [],
      error: "",
      success: "",
      search: "",
      loading: true,
    };
  },
  computed: {
    filteredCateogries: function () {
      return this.categoriesList.filter((category) => {
        return category.title.match(this.search);
      });
    },
    ...mapState(["user"]),
  },

  methods: {
    resetMessages() {
      this.error = "";
      this.success = "";
    },
    async deleteCategory(category) {
      try {
        //activation du loading
        this.loading = true;
        // demander la confirmation de l'utilisateur
        if (
          !confirm(
            "voulez vous supprimer la catégorie " + category.title + " ?"
          )
        ) {
          return;
        }
        //reset des messages
        this.resetMessages();

        //envoyer la requete
        const response = await axios.delete("categories/" + category.id);

        if (response.status === 204) {
          //reset de la liste des catégories
          this.categoriesList = [];
          await this.getCategoriesList();

          //informer l'utilisateur
          this.success = "la categorie a été supprimée.";
        }
      } catch (error) {
        //désactivation du message
        this.loading = false;
        if (error.response.data.detail) {
          this.error = error.response.data.detail;
        } else {
          this.error = "Impossible de supprimer la categorie.";
        }
      }
    },
    async getCategoriesList() {
      try {
        //activation du loading
        this.loading = true;

        const response = await axios.get("categories");

        //insertion dans la liste
        response.data.forEach((category) => {
          this.categoriesList.push(category);
        });

        //désactivation du message
        this.loading = false;
      } catch (error) {
        //désactivation du message
        this.loading = false;
        this.error = "Impossible de récupérer la liste des catégories.";
      }
    },
  },
  async created() {
    //valisation de l'utilisateur
    await this.getCategoriesList();
  },
};
</script>

<style scoped></style>
