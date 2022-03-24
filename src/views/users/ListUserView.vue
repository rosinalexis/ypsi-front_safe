<template>
  <div class="container">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="my-2 text-uppercase text-center">Liste des utilisateurs</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="rechercher un utilisateur"
          />
        </div>
      </div>
      <div
        class="my-4 table-responsive table-wrapper-scroll-y my-custom-scrollbar"
      >
        <table class="my-4 table">
          <thead class="sticky-top table-dark">
            <tr>
              <th>État</th>
              <th>Email</th>
              <th>Profil</th>
              <th>Poste</th>
              <th v-if="this.user.roles[0] === 'ROLE_ADMIN'">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="userApp in filteredUsers"
              :key="userApp.id"
              :class="userApp.isActivated ? '' : 'table-danger'"
            >
              <td @click="activatedUser(userApp)">
                <span v-if="userApp.isActivated" class="badge bg-success">
                  Activé
                </span>
                <span v-else class="badge bg-danger"> Désactivé </span>
              </td>
              <td>{{ userApp.email }}</td>
              <td>
                <p v-if="userApp.profile" class="text-capitalize">
                  {{
                    userApp.profile.firstname + " " + userApp.profile.lastname
                  }}
                </p>
                <p v-else class="fst-italic">pas de profile</p>
              </td>
              <td>
                <p v-if="userApp.job">{{ userApp.job.title }}</p>
                <p v-else class="fst-italic">pas de poste</p>
              </td>
              <td v-if="this.user.roles[0] === 'ROLE_ADMIN'">
                <router-link
                  :to="{ name: 'editUser', params: { id: userApp.id } }"
                  class="my-1 mx-1 btn btn-primary"
                >
                  <i class="bi bi-pencil-square text-white"></i>
                </router-link>

                <button
                  class="my-1 mx-1 btn btn-primary"
                  @click="deleteUser(userApp.id)"
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
            v-if="this.user.roles[0] === 'ROLE_ADMIN'"
            to="/users/add"
            class="px-4 mx-2 btn btn-primary"
          >
            Ajouter un utilisateur
            <i class="bi bi-person-plus-fill"></i>
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
  name: "ListUserView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      userList: [],
      errors: "",
      success: "",
      search: "",
      loading: true,
    };
  },
  computed: {
    filteredUsers: function () {
      return this.userList.filter((user) => {
        return user.email.match(this.search);
      });
    },
    ...mapState(["user"]),
  },

  methods: {
    resetMessages() {
      this.errors = "";
      this.success = "";
    },
    async activatedUser(user) {
      try {
        //reset des messages
        //activation du loading...
        this.resetMessages();
        this.loading = true;

        //attendre avant de modifier l'interface => valeur de transition
        let data = {
          isActivated: !user.isActivated,
        };
        //enoyer la requête
        const response = await axios.put("users/" + user.id, data);
        if (response.status === 200) {
          this.success = "l'état du compte a été changé.";
          user.isActivated = !user.isActivated;
        }
        this.loading = false;
      } catch (error) {
        this.errors =
          "Impossible de modifier l'état de l'utilisateur.Peut-être parce que l'utilisateur doit activer son compte.";
      }
    },
    async getUsersList() {
      try {
        //activation du loading...
        this.loading = true;

        const response = await axios.get("users");

        if (response.status === 200) {
          //insertion dans la liste
          //TODO: refaire une requête coté serveur pour simplifier la chose
          response.data.forEach((element) => {
            element.establishment.forEach((establishment) => {
              if (this.user.currentEstablishment === establishment.id) {
                this.userList.push(element);
              }
            });
          });

          //désactivation du Loading ...
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.errors = "Impossible de récupérer la listes des utilisateurs.";
      }
    },

    async deleteUser(id) {
      try {
        //activation du loading...
        this.loading = true;
        if (confirm("Voulez-vous vraiment supprimer cette utilisateur ? ")) {
          //reset des messages
          this.resetMessages();

          //envoyer la requête à l'utilisateur
          const response = await axios.delete("users/" + id);

          //attendre la réponse
          if (response.status === 204) {
            this.success = "l'utilisateur a été supprimé.";
            //reset de la liste
            this.userList = [];
            await this.getUsersList();
          }
        }
        //désactivation du Loading ...
        this.loading = false;
      } catch (error) {
        this.errors = "Impossible de supprimer  l'utilisateurs.";
      }
    },
  },

  async created() {
    //valisation de l'utilisateur
    await this.getUsersList();
  },
};
</script>

<style scoped></style>
