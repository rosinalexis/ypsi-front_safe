<template>
  <div class="container">
    <div class="row">
      <div class="my-2 col-12">
        <error-component v-if="errors" :error="errors"></error-component>
        <success-component
          v-if="success"
          :success="success"
        ></success-component>
      </div>

      <div class="col-12">
        <h1 class="text-center text-uppercase">
          Modification d'un template EMAIL
        </h1>
      </div>

      <div class="my-3 col-12">
        <input
          type="text"
          class="form-control"
          placeholder="Objet du mail"
          v-model="emailSubject"
        />
      </div>
    </div>

    <div class="col-12">
      <text-editor-full-component
        id="emailTemplateHtml"
        v-model:content="content"
        theme="snow"
        toolbar="full"
      ></text-editor-full-component>
    </div>

    <div class="my-5 col-12">
      <h6>Liste des variables:</h6>
      <ul>
        <li>Nom d'un utilisateur : %user%</li>
        <li>Date du jour : %date%</li>
      </ul>
    </div>

    <div class="col-12">
      <div class="my-2">
        <loading-component :loading="loading"></loading-component>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <button
          class="mx-1 px-4 btn btn-primary"
          @click="updateEstablishmentConfig"
        >
          Enregister
        </button>
        <router-link
          :to="{ name: 'settings' }"
          class="mx-1 px-4 btn btn-danger"
        >
          Retour <i class="bi bi-back"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import TextEditorFullComponent from "@/components/editors/TextEditorFullComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";

export default {
  name: "EditEmailTemplateView",

  components: {
    LoadingComponent,
    TextEditorFullComponent,
    SuccessComponent,
    ErrorComponent,
  },

  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      content: {
        ops: [],
      },
      emailTemplateId: this.$route.params.id,
      emailSubject: "",
      configuration: {},
      errors: "",
      success: "",
      loading: false,
    };
  },

  methods: {
    resetMessage() {
      (this.errors = ""), (this.success = "");
    },
    updateEstablishmentConfig() {
      this.user.establishment.forEach((establishment) => {
        if (establishment.id === this.user.currentEstablishment) {
          this.configuration.emailTemplate[this.emailTemplateId].content =
            this.content;
          this.configuration.emailTemplate[this.emailTemplateId].object =
            this.emailSubject;

          let myHtlmTemplate = document.querySelector("#emailTemplateHtml");
          myHtlmTemplate.querySelector("div").innerHTML;

          this.configuration.emailTemplate[this.emailTemplateId].htmlContent =
            myHtlmTemplate.querySelector("div").innerHTML;

          this.saveEmailTemplate();
        }
      });
    },
    getEmailTemplate() {
      this.user.establishment.forEach((establishment, id) => {
        if (establishment.id === this.user.currentEstablishment) {
          this.configuration = this.user.establishment[id].setting;
          this.content =
            this.configuration.emailTemplate[this.emailTemplateId].content;

          this.emailSubject =
            this.configuration.emailTemplate[this.emailTemplateId].object;
        }
      });
    },
    async saveEmailTemplate() {
      try {
        this.resetMessage();
        this.loading = true;

        const response = await axios.put(
          "establishments/" + this.user.currentEstablishment,
          { setting: this.configuration }
        );

        if (response.status === 200) {
          this.success = "Mise à jour configuration établissement ok.";
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.errors = "Impossible de mettre à jour la configuration";
      }
    },
  },
  created() {
    this.getEmailTemplate();
  },
};
</script>

<style lang="css"></style>
