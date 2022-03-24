<template>
  <div class="container" style="height: 80vh">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="my-2 text-uppercase text-center">Liste des établissements</h1>
    <div class="container">
      <div v-if="establishmentList.length < 1">
        <h3 class="text-center">Pas d'établissement pour le moment 🦆</h3>
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
                <th>Entreprise</th>
                <th>Département</th>
                <th>Région</th>
                <th v-if="isAdmin">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="establishmentApp in filteredEstablishment"
                :key="establishmentApp.id"
              >
                <td>
                  {{ establishmentApp.name }}
                </td>
                <td>
                  {{
                    establishmentApp.departmentName +
                    " " +
                    "(" +
                    establishmentApp.departmentNumber +
                    ")"
                  }}
                </td>
                <td>{{ establishmentApp.region }}</td>

                <td v-if="isAdmin">
                  <button
                    class="my-1 mx-1 btn btn-primary"
                    @click="deleteEstablishment(establishmentApp)"
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
    <div class="container">
      <div class="row">
        <div class="col">
          <router-link to="/administration" class="px-4 btn btn-danger">
            Retour <i class="bi bi-back"></i>
          </router-link>
          <router-link
            v-if="isAdmin()"
            :to="{ name: 'addEstablishment' }"
            class="px-4 mx-2 btn btn-primary"
          >
            Ajouter un établissement
            <i class="bi bi-building"></i>
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
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "ListEstablishmentView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      establishmentList: [],
      errors: "",
      search: "",
      success: "",
      loading: true,
    };
  },
  computed: {
    filteredEstablishment: function () {
      return this.establishmentList.filter((establishment) => {
        return establishment.name.match(this.search);
      });
    },
    ...mapState(["user"]),
  },

  methods: {
    resetMessage() {
      this.errors = "";
      this.success = "";
    },
    isAdmin() {
      return this.user.roles.includes("ROLE_ADMIN");
    },
    async deleteEstablishment(establishment) {
      try {
        this.resetMessage();
        this.loading = true;
        if (confirm("voulez-vous supprimer cette établissement ? ")) {
          const response = await axios.delete(
            "establishments/" + establishment.id
          );

          if (response.status === 204) {
            this.success = "L'établissement a été supprimer.";

            this.establishmentList = [];
            await this.getEstablishmentList();
          }
        }

        this.loading = false;
      } catch (error) {
        this.errors = "Impossible de supprimer l'établissement.";
      }
    },
    async getEstablishmentList() {
      try {
        this.loading = true;
        const response = await axios.get("establishments");

        response.data.forEach((establishment) => {
          this.establishmentList.push(establishment);
        });

        this.loading = false;
      } catch (error) {
        this.errors = "Impossible de récupérer la liste des établissements.";
      }
    },
  },
  async created() {
    await this.getEstablishmentList();
  },
};
</script>

<style scoped></style>
