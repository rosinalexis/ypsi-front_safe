<template>
  <div class="container page">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="my-2 text-uppercase text-center">Liste des candidatures</h1>
    <div class="container">
      <div v-if="contactsList.length < 1">
        <h3 class="text-center">Pas de contact pour le moment 🦆</h3>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-lg-3">
            <input
              type="text"
              class="form-control"
              v-model="search"
              placeholder="rechercher une candidature"
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
                <th>Nom et Prénom</th>
                <th>Email</th>
                <th>CV</th>
                <th>LM</th>
                <th>Référence offre</th>
                <th>Date de création</th>
                <th v-if="this.user.roles[0] === 'ROLE_ADMIN'">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contactApp in filteredContacts" :key="contactApp.id">
                <td>
                  <span class="badge bg-primary">{{ contactApp.state }}</span>
                </td>
                <td>{{ contactApp.firstname + " " + contactApp.lastname }}</td>
                <td>{{ contactApp.email }}</td>
                <td>
                  <a
                    v-if="contactApp.cvUrl"
                    :href="contactApp.cvUrl"
                    target="_blank"
                  >
                    CV
                  </a>
                  <p v-else class="fst-italic">pas de CV</p>
                </td>
                <td>
                  <a
                    v-if="contactApp.coverLetterUrl"
                    :href="contactApp.coverLetterUrl"
                    target="_blank"
                  >
                    LM
                  </a>
                  <p v-else class="fst-italic">pas de LM</p>
                </td>
                <td>{{ contactApp.jobReference.title }}</td>
                <td>
                  {{ new Date(contactApp.createdAt).toLocaleString() }}
                </td>
                <td v-if="this.user.roles[0] === 'ROLE_ADMIN'">
                  <router-link
                    :to="{
                      name: 'contactManagement',
                      params: { id: contactApp.id },
                    }"
                    class="my-1 mx-1 btn btn-primary"
                  >
                    <i class="bi bi-pencil-square text-white"></i>
                  </router-link>

                  <button
                    class="my-1 mx-1 btn btn-primary"
                    @click="deleteContact(contactApp)"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <loading-component :loading="loading"></loading-component>
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
  name: "ListContactView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      contactsList: [],
      errors: "",
      search: "",
      success: "",
      loading: true,
    };
  },
  computed: {
    filteredContacts: function () {
      return this.contactsList.filter((contact) => {
        return (
          contact.lastname.match(this.search) ||
          contact.firstname.match(this.search)
        );
      });
    },
    ...mapState(["user"]),
  },

  methods: {
    async deleteContact(contact) {
      try {
        //reset des messages
        //activation du loading...
        this.loading = true;

        if (confirm("voulez-vous supprimer ce contact ? ")) {
          const response = await axios.delete("contacts/" + contact.id);
          if (response.status === 204) {
            this.success = "le contact a été supprimé.";

            //reset de la liste
            this.contactsList = [];
            await this.getContactsList();
          }
        }
        //désactivation du Loading ...
        this.loading = false;
      } catch (error) {
        this.errors = "impossible de supprimer le contact";
      }
    },
    async getContactsList() {
      try {
        const response = await axios.get("contacts");

        //insertion dans la liste

        if (response.status === 200) {
          response.data.forEach((contact) => {
            if (
              contact.jobReference.establishment.id ===
              this.user.currentEstablishment
            ) {
              this.contactsList.push(contact);
            }
          });
        }
        //enlever la page de loading
        this.loading = false;
      } catch (error) {
        if (error.response.data.detail) {
          this.errors = error.response.data.detail;
        } else {
          this.errors = "Impossible de récupérer la liste des contacts.";
        }
      }
    },
  },
  async created() {
    //valisation de l'utilisateur
    await this.getContactsList();
  },
};
</script>

<style scoped></style>
