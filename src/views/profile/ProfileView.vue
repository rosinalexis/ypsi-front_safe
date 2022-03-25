<template>
  <div class="container page">
    <error-component v-if="errors" :error="errors"></error-component>
    <h1 class="my-5 text-uppercase text-center">Mon profil</h1>

    <div class="row">
      <div class="p-5 col-lg-6 bg-white border shadow">
        <h2
          class="h4 fst-italic text-decoration-underline text-uppercase text-success"
        >
          Information compte utilisateur
        </h2>
        <div>
          <p><strong class="me-2">Email:</strong>{{ user.email }}</p>
          <p><strong class="me-2">Role:</strong>{{ getUserRoles() }}</p>
          <p>
            <strong class="me-2">Etat du compte:</strong>
            <span v-if="user.isActivated" class="badge bg-success">OK </span>
            <span v-else class="badge bg-danger">KO </span>
          </p>
        </div>
        <h2
          class="h4 fst-italic text-decoration-underline text-uppercase text-success"
        >
          Information poste de utilisateur
        </h2>
        <div v-if="user.job">
          <p>
            <strong class="me-2">Intitulé du poste:</strong>{{ user.job.title }}
          </p>
          <p v-if="user.job.category">
            <strong class="me-2">Catégorie du poste :</strong
            >{{ user.job.category.title }}
          </p>

          <p>
            <strong class="me-2">Date de création du poste:</strong
            >{{ new Date(user.job.createdAt).toLocaleString() }}
          </p>
        </div>

        <div v-else>
          <h3 class="my-5 Text-uppercase text-center">
            PAS DE POSTE POUR LE MOMENT
          </h3>
        </div>
      </div>

      <div class="p-5 col-lg-6 bg-dark text-white shadow">
        <h2
          class="h4 fst-italic text-decoration-underline text-uppercase text-success"
        >
          Information profil utilisateur
        </h2>
        <div v-if="user.profile">
          <p><strong class="me-2">Nom:</strong>{{ user.profile.lastname }}</p>
          <p>
            <strong class="me-2">Prénom:</strong>{{ user.profile.firstname }}
          </p>
          <p><strong class="me-2">Genre:</strong>{{ user.profile.gender }}</p>
          <p><strong class="me-2">Phone:</strong>{{ user.profile.phone }}</p>
          <p>
            <strong class="me-2">Adresse:</strong>{{ user.profile.address }}
          </p>
          <p>
            <strong class="me-2">Date anniversaire:</strong
            >{{ new Date(user.profile.birthdate).toLocaleString() }}
          </p>
          <p>
            <strong class="me-2">Description:</strong
            >{{ user.profile.description }}
          </p>
          <p>
            <strong class="me-2">Date de création du compte:</strong
            >{{ new Date(user.profile.createdAt).toLocaleString() }}
          </p>
          <p>
            <strong class="me-2">Date de dernière mise à jour du compte:</strong
            >{{ new Date(user.profile.updatedAt).toLocaleString() }}
          </p>
        </div>
        <div v-else>
          <h3 class="my-5 Text-uppercase text-center">
            PAS DE PROFIL POUR LE MOMENT
          </h3>
        </div>
      </div>

      <div class="mt-5 col">
        <router-link
          :to="{ name: 'userHome' }"
          class="mx-2 px-5 btn btn-danger"
        >
          Retour <i class="bi bi-back"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import { mapState } from "vuex";

export default {
  name: "ProfileView",
  components: { ErrorComponent },
  data() {
    return {
      userList: [],
      errors: "",
      search: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    getUserRoles() {
      let role = "";
      switch (this.user.roles[0]) {
        case "ROLE_USER":
          role = "utilisateur";
          break;

        case "ROLE_ADMIN":
          role = "administrateur";
          break;

        default:
          break;
      }

      return role;
    },
  },
};
</script>

<style scoped></style>
