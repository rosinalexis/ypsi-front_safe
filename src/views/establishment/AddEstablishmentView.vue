<template>
  <div class="container page">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>

    <h1 class="my-4 text-uppercase text-center">Ajouter un établissement</h1>

    <div class="px-5 container bg-light border">
      <form class="row" @submit.prevent="addEstablishment">
        <div class="my-5 col mx-auto">
          <div class="mb-3">
            <label for="siret" class="form-label">
              Siret
              <span class="text-danger">*</span>:
            </label>
            <input
              v-model="newEstablishment.siret"
              type="text"
              class="form-control"
              id="siret"
            />
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">
              Nom
              <span class="text-danger">*</span>:
            </label>
            <input
              v-model="newEstablishment.name"
              type="text"
              class="form-control"
              id="name"
            />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">
              Téléphone
              <span class="text-danger">*</span>:
            </label>
            <input
              v-model="newEstablishment.phone"
              type="text"
              class="form-control"
              id="phone"
            />
          </div>

          <div class="mb-3">
            <div class="row">
              <div class="col-lg-9">
                <label for="departmentNumber" class="form-label">
                  Numéro département
                  <span class="text-danger">*</span>:
                </label>
                <input
                  v-model="newEstablishment.departmentNumber"
                  type="number"
                  class="form-control"
                  id="departmentNumber"
                  min="1"
                />
              </div>
              <div class="mt-lg-2 col-lg-2">
                <button
                  class="px-lg-5 mt-4 btn btn-success"
                  @click="findDepartemntName(newEstablishment.departmentNumber)"
                >
                  autocomplete
                </button>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="departmentName" class="form-label">
              Nom département
              <span class="text-danger">*</span>:
            </label>
            <input
              v-model="newEstablishment.departmentName"
              type="text"
              class="form-control"
              id="departmentName"
            />
          </div>

          <div class="mb-3">
            <label for="region" class="form-label">
              Région
              <span class="text-danger">*</span>:
            </label>
            <input
              v-model="newEstablishment.region"
              type="text"
              class="form-control"
              id="region"
            />
          </div>

          <div class="d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-success">Ajouter</button>
          </div>
        </div>
      </form>
      <loading-component :loading="loading"></loading-component>
    </div>
    <div class="my-5 container">
      <div class="row">
        <div class="col">
          <router-link to="/administration" class="px-4 btn btn-danger">
            Retour <i class="bi bi-back"></i>
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
  name: "AddEstablishmentView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      loading: false,
      errors: "",
      success: "",
      newEstablishment: {
        siret: "",
        name: "",
        phone: "",
        departmentName: "",
        departmentNumber: "",
        region: "",
      },
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    resetMessage() {
      this.errors = "";
      this.success = "";
    },

    async addEstablishment() {
      try {
        this.resetMessage();
        this.loading = true;
        if (
          this.newEstablishment.siret &&
          this.newEstablishment.name &&
          this.newEstablishment.phone &&
          this.newEstablishment.departmentName &&
          this.newEstablishment.departmentNumber &&
          this.newEstablishment.region
        ) {
          const response = await axios.post(
            "establishments",
            this.newEstablishment
          );

          if (response.status === 201) {
            this.success = "Un établissement a été ajouté.";
            this.newEstablishment = {
              siret: "",
              name: "",
              phone: "",
              departmentName: "",
              departmentNumber: "",
              region: "",
            };
          }
        }
        this.loading = false;
      } catch (error) {
        this.errors = "Impossible de récupérer la liste des établissements.";
      }
    },

    async findDepartemntName(code) {
      try {
        this.resetMessage();
        this.loading = true;
        this.newEstablishment.departmentName = "";
        this.newEstablishment.region = "";

        //gestion des numéros inferieurs à 10
        if (code < 10) {
          code = "0" + code.toString();
        }

        const response = await fetch(
          "https://geo.api.gouv.fr/departements?code=" + code
        );

        if (response.status === 200) {
          const data = await response.json();
          this.newEstablishment.departmentName = data[0].nom;
          this.findRegionName(data[0].codeRegion);
        }

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = "Impossible de trouver le nom du département.";
      }
    },

    async findRegionName(code) {
      try {
        this.resetMessage();
        this.loading = true;

        const response = await fetch(
          "https://geo.api.gouv.fr/regions?code=" + code
        );

        if (response.status === 200) {
          const data = await response.json();
          this.newEstablishment.region = data[0].nom;
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errors = "Impossible de trouver le nom de la région.";
      }
    },
  },
};
</script>

<style scoped></style>
