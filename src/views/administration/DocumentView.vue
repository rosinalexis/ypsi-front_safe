<template>
  <div id="documentPage" class="container">
    <div class="row">
      <div class="my-2 col-12">
        <error-component v-if="errors" :error="errors"></error-component>
        <success-component
          v-if="success"
          :success="success"
        ></success-component>
      </div>
    </div>

    <h1 class="text-center text-uppercase">Modification d'un document</h1>

    <div class="my-3 col-12">
      <text-editor-full-component
        id="myDocument"
        v-model:content="content"
        theme="snow"
        toolbar="full"
      >
      </text-editor-full-component>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="my-2">
          <loading-component :loading="loading"></loading-component>
        </div>

        <div class="my-2">
          <button class="me-2 btn btn-primary" @click="saveEstablishmentConfig">
            Sauvegarder
          </button>
          <button @click="makePDF()" class="mx-1 btn btn-primary">
            Convertir en pdf
          </button>

          <router-link
            :to="{ name: 'settings' }"
            class="mx-1 px-4 btn btn-danger"
          >
            Retour <i class="bi bi-back"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios";

import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import TextEditorFullComponent from "@/components/editors/TextEditorFullComponent";

export default {
  name: "ShowDocumentView",
  components: {
    TextEditorFullComponent,
    LoadingComponent,
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
      documentId: this.$route.params.id,

      configuration: {},
      errors: "",
      success: "",
      loading: false,
    };
  },

  methods: {
    resetMessage() {
      this.errors = "";
      this.success = "";
    },

    saveEstablishmentConfig() {
      this.user.establishment.forEach((element) => {
        if (element.id === this.user.currentEstablishment) {
          this.configuration.documentConfig[this.documentId].content =
            this.content;

          this.updateEstablishmentConfig();
        }
      });
    },
    getEstablishmentConfig() {
      this.user.establishment.forEach((establishment, id) => {
        if (establishment.id === this.user.currentEstablishment) {
          this.configuration = this.user.establishment[id].setting;
          this.content =
            this.configuration.documentConfig[this.documentId].content;
        }
      });
    },

    async updateEstablishmentConfig() {
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

    async makePDF() {
      let myDocument = document.querySelector("#myDocument");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
        width: myDocument.clientWidth + 20,
        height: myDocument.clientHeight + 20,
      });

      await html2canvas(document.querySelector("#myDocument"), {
        width: myDocument.clientWidth,
        height: myDocument.clientHeight,
      }).then((canvas) => {
        const img = canvas.toDataURL("image/png");

        doc.addImage(
          img,
          "PNG",
          0,
          0,
          doc.internal.pageSize.getWidth(),
          doc.internal.pageSize.getHeight()
        );
      });
      doc.save("pt.pdf");
    },
  },

  created() {
    this.getEstablishmentConfig();
  },
};
</script>

<style scoped>
#documentPage {
  min-height: 70vh;
}
</style>
