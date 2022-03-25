<template>
  <div class="container page">
    <div v-if="this.user.roles[0] === 'ROLE_ADMIN'" class="container">
      <error-component v-if="error" :error="error"></error-component>
      <success-component v-if="success" :success="success"></success-component>

      <h1 class="my-4 text-uppercase text-center">Ajouter un utilisateur</h1>

      <div class="px-5 container bg-light border">
        <form class="row" @submit.prevent="addUser()">
          <div class="my-5 col-lg-6 mx-auto">
            <div class="mb-3">
              <label for="email" class="form-label">
                Email de l'utilisateur
                <span class="text-danger">*</span>:
              </label>
              <input
                v-model="newUser.email"
                type="email"
                class="form-control"
                id="email"
              />
            </div>

            <div class="mb-3">
              <label for="roles" class="form-label">
                Role de l'utilisateur:
                <span class="text-danger">*</span>:
              </label>
              <select v-model="preRole" class="form-select" id="roles">
                <option disabled value="">Choisissez</option>
                <option value="ROLE_USER">Utilisateur</option>
                <option value="ROLE_ADMIN">Administration</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="etablissement" class="form-label">
                établissement de l'utilisateur:
                <span class="text-danger">*</span>:
              </label>
              <select
                v-model="newUser.establishment"
                class="form-select"
                id="etablissement"
              >
                <option disabled value="">Choisissez</option>
                <option
                  v-for="establishment in establishmentList"
                  :key="establishment.id"
                  :value="establishment.id"
                >
                  {{ establishment.name }}
                </option>
              </select>
            </div>
            <div>
              <div class="mb-3">
                <button class="btn" @click.prevent="addJobToUser()">
                  <p v-if="!newUser.job.hasJobToAdd" class="text-success">
                    Ajouter un poste <i class="bi bi-briefcase-fill"></i>
                  </p>
                  <p v-else class="text-danger">
                    Retirer le poste <i class="bi bi-briefcase-fill"></i>
                  </p>
                </button>
              </div>
              <div v-if="newUser.job.hasJobToAdd">
                <div class="mb-3">
                  <label for="poste" class="form-label">
                    Libellé du Poste
                    <span class="text-danger">*</span>:
                  </label>
                  <input
                    v-model="newUser.job.title"
                    type="text"
                    class="form-control"
                    id="poste"
                  />
                </div>
                <div class="mb-3">
                  <label for="posteDescription" class="form-label">
                    Description du Poste:
                  </label>
                  <textarea
                    v-model="newUser.job.description"
                    type="text"
                    class="form-control"
                    id="posteDescription"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="category" class="form-label">
                    Catégorie Poste utilisateur:
                    <span class="text-danger">*</span>:
                  </label>
                  <select
                    v-model="newUser.job.category"
                    class="form-select"
                    id="category"
                  >
                    <option disabled value="">Choisissez</option>
                    <option
                      v-for="category in categoriesList"
                      :key="category.id"
                      :value="'api/categories/' + category.id"
                    >
                      {{ category.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div class="mb-3">
                <button class="btn" @click.prevent="addProfileToUser()">
                  <p
                    v-if="!newUser.profile.hasProfileToAdd"
                    class="text-success"
                  >
                    Ajouter un profile <i class="bi bi-person-lines-fill"></i>
                  </p>
                  <p v-else class="text-danger">
                    Retirer le profile <i class="bi bi-person-lines-fill"></i>
                  </p>
                </button>
              </div>
              <div v-if="newUser.profile.hasProfileToAdd">
                <div class="mb-3">
                  <label for="lastname" class="form-label">
                    Nom de l'utilisateur
                    <span class="text-danger">*</span>:
                  </label>
                  <input
                    v-model="newUser.profile.lastname"
                    type="text"
                    class="form-control"
                    id="lastname"
                  />
                </div>
                <div class="mb-3">
                  <label for="firstname" class="form-label">
                    Prénom de l'utilisateur
                    <span class="text-danger">*</span>:
                  </label>
                  <input
                    v-model="newUser.profile.firstname"
                    type="text"
                    class="form-control"
                    id="firstname"
                  />
                </div>
                <div class="mb-3">
                  <label for="gender" class="form-label">
                    Genre l'utilisateur:
                    <span class="text-danger">*</span>:
                  </label>
                  <select
                    v-model="newUser.profile.gender"
                    class="form-select"
                    id="gender"
                  >
                    <option disabled value="">Choisissez</option>
                    <option value="monsieur">monsieur</option>
                    <option value="madame">madame</option>
                    <option value="mademoiselle">mademoiselle</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">
                    Téléphone de l'utilisateur
                    <span class="text-danger">*</span>:
                  </label>
                  <input
                    v-model="newUser.profile.phone"
                    type="text"
                    class="form-control"
                    id="phone"
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">
                    Adresse de l'utilisateur
                    <span class="text-danger">*</span>:
                  </label>
                  <input
                    v-model="newUser.profile.address"
                    type="text"
                    class="form-control"
                    id="address"
                  />
                </div>
                <div class="mb-3">
                  <label for="birthdate" class="form-label">
                    Date de naissance de l'utilisateur
                    <span class="text-danger">*</span>:
                  </label>
                  <input
                    v-model="newUser.profile.birthdate"
                    type="date"
                    class="form-control"
                    id="birthdate"
                  />
                </div>
                <div class="mb-3">
                  <label for="profileDescription" class="form-label">
                    Description du profile:
                  </label>
                  <textarea
                    v-model="newUser.profile.description"
                    type="text"
                    class="form-control"
                    id="profileDescription"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="px-5 btn btn-success">Ajouter</button>
            </div>
          </div>
        </form>
      </div>
      <div class="my-5 container">
        <div class="row">
          <div class="col-lg-12">
            <loading-component :loading="loading"></loading-component>
          </div>
          <div class="col-lg-6">
            <router-link to="/home" class="btn btn-danger">
              Page d'accueil
              <i class="bi bi-house"></i>
            </router-link>

            <router-link to="/users" class="mx-2 btn btn-primary">
              liste des utilisateurs
              <i class="bi bi-card-list"></i>
            </router-link>
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
import LoadingComponent from "@/components/notifications/LoadingComponent";
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "UserAddView",
  components: { SuccessComponent, ErrorComponent, LoadingComponent },
  data() {
    return {
      newUser: {
        email: "",
        roles: [],
        password: "123456",
        establishment: "",
        job: {
          hasJobToAdd: false,
          title: "",
          description: "",
          category: "",
        },
        profile: {
          hasProfileToAdd: false,
          lastname: "",
          firstname: "",
          gender: "",
          phone: "",
          address: "",
          birthdate: "",
          description: "",
        },
      },
      categoriesList: [],
      establishmentList: [],
      preRole: "",
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
    addJobToUser() {
      this.newUser.job.hasJobToAdd = !this.newUser.job.hasJobToAdd;

      //reset des informations
      this.newUser.job.title = "";
      this.newUser.job.description = "";
      this.newUser.job.category = "";
    },
    addProfileToUser() {
      this.newUser.profile.hasProfileToAdd =
        !this.newUser.profile.hasProfileToAdd;

      //reset des infos du profil
      this.newUser.profile.address = "";
      this.newUser.profile.birthdate = "";
      this.newUser.profile.description = "";
      this.newUser.profile.firstname = "";
      this.newUser.profile.gender = "";
      this.newUser.profile.lastname = "";
      this.newUser.profile.phone = "";
    },
    async addUser() {
      try {
        //user de transition
        let userToAdd = {
          email: "",
          roles: [],
          password: "",
          job: null,
          profile: null,
          establishment: [],
          currentEstablishment: null,
        };

        //reset de mes affichages
        this.resetMessages();

        //conversion du role utilisateur
        this.newUser.roles.push(this.preRole);

        //premiere insertion de l'utilisateur
        userToAdd.email = this.newUser.email;
        userToAdd.roles[0] = this.newUser.roles[0];
        userToAdd.password = this.newUser.password;
        userToAdd.establishment.push(
          "api/establishments/" + this.newUser.establishment
        );
        userToAdd.currentEstablishment = this.newUser.establishment;

        //verification du poste
        if (this.newUser.job.hasJobToAdd) {
          userToAdd.job = {
            title: this.newUser.job.title,
            description: this.newUser.job.description,
            category: this.newUser.job.category,
          };
        } else {
          userToAdd.job = null;
        }

        //verification du profil
        if (this.newUser.profile.hasProfileToAdd) {
          userToAdd.profile = {
            lastname: this.newUser.profile.lastname,
            firstname: this.newUser.profile.firstname,
            gender: this.newUser.profile.gender,
            phone: this.newUser.profile.phone,
            address: this.newUser.profile.address,
            birthdate: this.newUser.profile.birthdate,
            description: this.newUser.profile.description,
          };
        } else {
          userToAdd.profile = null;
        }

        //envoyer la requete vers le serveur
        const response = await axios.post("users", userToAdd);

        if (response.status === 201) {
          //informer l'utilisateur
          this.success = "ajout de l'utilisateur ok!";

          //reset de l'utilisateur

          this.newUser.email = "";
          this.newUser.password = "";
          this.newUser.roles = [];
          this.newUser.establishment = "";
          this.preRole = "";
          this.newUser.job = {
            hasJobToAdd: false,
            title: "",
            description: "",
            category: "",
          };
          this.newUser.profile = {
            hasProfileToAdd: false,
            lastname: "",
            firstname: "",
            gender: "",
            phone: "",
            address: "",
            birthdate: "",
            description: "",
          };
        }
      } catch (error) {
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = "Impossible d'ajouter l'utilisateur.";
        }
      }
    },
    async getCategoriesList() {
      try {
        const response = await axios.get("categories");

        if (response.status === 200) {
          //insertion dans la liste
          for (let index = 0; index < response.data.length; index++) {
            this.categoriesList.push(response.data[index]);
          }
        }
      } catch (error) {
        this.error = "Impossible de récupérer la liste des catégories.";
      }
    },

    async getEstablishmentList() {
      try {
        const response = await axios.get("establishments");
        if (response.status === 200) {
          response.data.forEach((element) => {
            this.establishmentList.push(element);
          });
        }
      } catch (error) {
        this.error = "Impossible de récupérer la liste des établissements.";
      }
    },
  },
  async created() {
    //récuperation de la liste de catégorie
    await this.getCategoriesList();

    //récuperation de la liste des établissements
    await this.getEstablishmentList();
  },
};
</script>

<style scoped></style>
