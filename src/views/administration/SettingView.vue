<template>
  <div class="container page">
    <h1 class="text-uppercase text-center">Configuration de l'application</h1>
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <div class="my-5 accordion" id="configAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Liste des équipements
          </button>
        </h2>

        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#configAccordion"
        >
          <div class="accordion-body">
            <div class="my-3 text-end">
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEquipementList"
              >
                Ajouter un équipement
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
            <table class="table table-light">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Liste</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in configuration.equipmentConfig"
                  :key="itemId"
                >
                  <td>{{ item.title }}</td>
                  <td>{{ item.equipments }}</td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="removeConfigEquipment(itemId)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Liste des documents
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#configAccordion"
        >
          <div class="accordion-body">
            <div class="my-3 text-end">
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalChartreList"
              >
                Ajouter un document
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Nom du document</th>
                  <th>Section</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in configuration.documentConfig"
                  :key="itemId"
                >
                  <td>{{ item.title }}</td>
                  <td>{{ item.section }}</td>
                  <td>
                    <router-link
                      class="mx-1 btn btn-primary"
                      :to="{ name: 'documents', params: { id: itemId } }"
                    >
                      <i class="bi bi-eye-fill"></i
                    ></router-link>

                    <button
                      class="mx-1 btn btn-danger"
                      @click="removeNewDocument(itemId)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Liste des aides
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#configAccordion"
        >
          <div class="accordion-body">
            <div class="my-3 text-end">
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalHelpList"
              >
                Ajouter une aide
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
            <table class="table table-light">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in configuration.helpDocumentConfig"
                  :key="itemId"
                >
                  <td>{{ item.title }}</td>
                  <td>{{ item.helpType }}</td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="removeHelpDocument(itemId)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseFour"
            aria-expanded="false"
            aria-controls="flush-collapseFour"
          >
            Configuration établissement
          </button>
        </h2>
        <div
          id="flush-collapseFour"
          class="accordion-collapse collapse"
          aria-labelledby="flush-headingFour"
          data-bs-parent="#configAccordion"
        >
          <div class="accordion-body">
            <div class="row mx-auto">
              <div v-if="this.user" class="col-5">
                <select
                  v-model="this.user.currentEstablishment"
                  class="form-select"
                >
                  <option
                    v-for="item in this.user.establishment"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-5">
                <button class="btn btn-success" @click="updateUser">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading-Five">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse-Five"
            aria-expanded="false"
            aria-controls="flush-collapse-Five"
          >
            Configuration des emails
          </button>
        </h2>
        <div
          id="flush-collapse-Five"
          class="accordion-collapse collapse"
          aria-labelledby="flush-heading-Five"
          data-bs-parent="#configAccordion"
        >
          <div class="accordion-body">
            <div class="my-3 text-end">
              <!-- <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEmailTemplateList"
              >
                Ajouter un template d'email
                <i class="bi bi-plus-lg"></i>
              </button> -->
            </div>

            <table class="table table-light">
              <thead>
                <tr>
                  <th>Intitulé</th>
                  <th>État</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in configuration.emailTemplate"
                  :key="itemId"
                >
                  <td>{{ item.title }}</td>
                  <td>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      v-model="item.status"
                      disabled="disabled"
                    />
                  </td>
                  <td>
                    <button
                      class="me-1 btn btn-primary"
                      @click="changeEmailTemplateStatus(itemId)"
                    >
                      <i v-if="item.status" class="bi bi-check"></i>
                      <i v-else class="bi bi-x"></i>
                    </button>

                    <router-link
                      :to="{
                        name: 'emailTemplateEdit',
                        params: { id: itemId },
                      }"
                      class="mx-1 btn btn-primary"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </router-link>

                    <!-- <button
                    class="mx-1 btn btn-danger"
                    @click="removeEmailTemplate(itemId)"
                  >
                    <i class="bi bi-trash"></i>
                  </button> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div>
      <loading-component :loading="loading"></loading-component>
    </div>

    <div id="modalList">
      <modal-component id="modalEquipementList" title="Ajouter un équipement">
        <div class="row">
          <div class="col-12">
            <div class="mb-3 row">
              <div class="mb-3 col-11">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nom de l'équipement"
                  v-model="newEquipment.title"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="mb-3 col-7">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ajouter un élément"
                  v-model="newEquipment.equipmentElement"
                />
              </div>
              <div class="col-5">
                <button class="btn btn-success" @click="addEquipment">
                  Ajouter élément
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 col-12 bg-light">
            <p>
              <strong>Titre de l'équipement :</strong> {{ newEquipment.title }}
              <br />
            </p>
            <p><strong>Liste :</strong></p>
            <ul>
              <li
                v-for="(item, index) in newEquipment.equipmentList"
                :key="index"
                @click="removeEquipment(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="my-3 d-grid gap-2 col-6 mx-auto">
            <button
              class="btn btn-success"
              type="button"
              @click="addNewEquipment"
            >
              Enregister
            </button>
          </div>
        </div>
      </modal-component>

      <modal-component
        id="modalChartreList"
        title="Ajouter un document"
        :isBig="true"
      >
        <div class="mb-5 row">
          <div class="col-12">
            <div class="mb-3 col-12">
              <input
                type="text"
                class="form-control"
                placeholder="Nom du document"
                v-model="newDocument.title"
              />
            </div>
            <div class="mb-3 col-12">
              <input
                type="text"
                class="form-control"
                placeholder="Section du document"
                v-model="newDocument.section"
              />
            </div>
          </div>
          <div class="mb-5 col-12">
            <QuillEditor v-model:content="content" theme="snow" toolbar="full">
            </QuillEditor>
          </div>

          <div class="my-5 d-grid gap-2 col-6 mx-auto">
            <button
              class="btn btn-success"
              type="button"
              @click="addNewDocument"
            >
              Enregister
            </button>
          </div>
        </div>
      </modal-component>

      <modal-component id="modalHelpList" title="Ajouter une aide">
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <div class="mb-3 col-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Intitulé de l'aide"
                  v-model="newHelp.title"
                />
              </div>
            </div>
            <div class="mb-3">
              <div class="mb-3 col-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type de l'aide"
                  v-model="newHelp.helpType"
                />
              </div>
            </div>
            <div class="mb-3">
              <div class="mb-3 col-12">
                <textarea
                  class="form-control"
                  placeholder="Description de l'aide"
                  v-model="newHelp.description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 d-grid gap-2 col-6 mx-auto">
          <button
            class="btn btn-success"
            type="button"
            @click="addNewHelpDocument"
          >
            Enregister
          </button>
        </div>
      </modal-component>

      <modal-component
        id="modalEmailTemplateList"
        title="Ajouter un template de mail"
        :isBig="true"
      >
        <div class="row">
          <div class="col-12">
            <div class="mb-3">
              <div class="mb-3 col-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Intitulé de l'aide"
                  v-model="newEmailTemplate.title"
                />
              </div>
            </div>
          </div>
          <div class="mb-5 col-12">
            <quill-editor
              id="emailTemplateHtml"
              v-model:content="contentEmail"
              theme="snow"
              toolbar="full"
            >
            </quill-editor>
          </div>
        </div>
        <div class="my-5 col-12">
          <h6>Liste des variables:</h6>
          <ul>
            <li>Nom d'un utilisateur : %user%</li>
            <li>Date du jour : %date%</li>
          </ul>
        </div>
        <div class="my-5 d-grid gap-2 col-6 mx-auto">
          <button
            class="btn btn-success"
            type="button"
            @click="addNewEmailTemplate"
          >
            Enregister
          </button>
        </div>
      </modal-component>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import ModalComponent from "@/components/modals/ModalComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import axios from "axios";
import { mapState } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "SettingView",
  components: {
    LoadingComponent,
    ModalComponent,
    SuccessComponent,
    ErrorComponent,
    QuillEditor,
  },
  computed: {
    ...mapState(["user"]),
  },

  data() {
    return {
      errors: "",
      success: "",
      loading: false,
      configuration: {
        emailTemplate: [],
        equipmentConfig: [],
        documentConfig: [],
        helpDocumentConfig: [],
      },
      newEmailTemplate: {
        title: "",
        status: false,
        content: "",
        htmlContent: "",
      },

      newEquipment: {
        title: "",
        equipmentElement: "",
        equipmentList: [],
      },
      newDocument: {
        title: "",
        section: "",
        content: "",
      },
      newHelp: {
        title: "",
        helpType: "",
        description: "",
      },
      content: {
        ops: [],
      },
      contentEmail: {
        ops: [],
      },
    };
  },
  methods: {
    resetMessage() {
      this.errors = "";
      this.success = "";
    },

    addNewEmailTemplate() {
      //récuperation
      let myHtlmTemplate = document.querySelector("#emailTemplateHtml");
      myHtlmTemplate.querySelector("div").innerHTML;

      this.newEmailTemplate.htmlContent =
        myHtlmTemplate.querySelector("div").innerHTML;

      this.newEmailTemplate.content = this.contentEmail;

      this.configuration.emailTemplate.push(this.newEmailTemplate);

      //mise à jour
      this.updateEstablishment();

      //reset
      this.newEmailTemplate = {
        title: "",
        status: false,
        content: "",
        htmlContent: "",
      };

      this.contentEmail = {
        ops: [],
      };
    },
    changeEmailTemplateStatus(id) {
      this.configuration.emailTemplate.forEach((email) => {
        if (this.configuration.emailTemplate[id] === email) {
          this.configuration.emailTemplate[id].status =
            !this.configuration.emailTemplate[id].status;
        }
      });

      this.updateEstablishment();
    },
    removeEmailTemplate(id) {
      if (confirm("voulez-vous supprimer ce template d'email ?")) {
        this.configuration.emailTemplate.splice(id, 1);
        this.updateEstablishment();
      }
    },
    removeHelpDocument(id) {
      if (confirm("voulez-vous supprimer cette aide ?")) {
        this.configuration.helpDocumentConfig.splice(id, 1);
        this.updateEstablishment();
      }
    },
    addNewHelpDocument() {
      if (this.newHelp.title && this.newHelp.helpType) {
        let myNewHelp = {
          title: this.newHelp.title,
          helpType: this.newHelp.helpType,
          descripton: this.newHelp.description,
        };

        this.configuration.helpDocumentConfig.push(myNewHelp);
        this.updateEstablishment();

        //reset
        this.newHelp.title = "";
        this.newHelp.helpType = "";
        this.newHelp.description = "";
      }
    },
    removeNewDocument(id) {
      if (confirm("voulez-vous supprimer cet élément de la liste ? ")) {
        this.configuration.documentConfig.splice(id, 1);
        this.updateEstablishment();
      }
    },
    addNewDocument() {
      if (this.newDocument.title && this.newDocument.section) {
        let myNewDocument = {
          title: this.newDocument.title.toLowerCase(),
          section: this.newDocument.section.toLowerCase(),
          content: this.content,
        };

        this.configuration.documentConfig.push(myNewDocument);

        this.updateEstablishment();
        //reset des valeurs
        this.newDocument = {
          title: "",
          section: "",
          content: "",
        };

        this.content = {
          ops: [],
        };
      }
    },
    removeConfigEquipment(id) {
      if (confirm("voulez-vous supprimer cet élément de la liste ? ")) {
        this.configuration.equipmentConfig.splice(id, 1);
        this.updateEstablishment();
      }
    },
    addNewEquipment() {
      this.configuration.equipmentConfig.push({
        title: this.newEquipment.title.toLowerCase(),
        equipments: this.newEquipment.equipmentList,
      });

      this.updateEstablishment();

      //reset de nouvelle équipement
      this.newEquipment = {
        title: "",
        equipmentElement: "",
        equipmentList: [],
      };
    },
    removeEquipment(id) {
      if (confirm("voulez-vous supprimer cet élément de la liste ? ")) {
        this.newEquipment.equipmentList.splice(id, 1);
        this.updateEstablishment();
      }
    },
    addEquipment() {
      if (this.newEquipment.equipmentElement) {
        this.newEquipment.equipmentList.push(
          this.newEquipment.equipmentElement.toLowerCase()
        );

        //reset
        this.newEquipment.equipmentElement = "";
      }
    },
    getEstablishmentConfig() {
      this.user.establishment.forEach((element, id) => {
        if (element.id === this.user.currentEstablishment) {
          this.configuration = this.user.establishment[id].setting;
        }
      });
    },

    async updateEstablishment() {
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

    async updateUser() {
      try {
        this.resetMessage();
        this.loading = true;

        const response = await axios.put("users/" + this.user.id, {
          currentEstablishment: this.user.currentEstablishment,
        });

        if (response.status === 200) {
          this.getEstablishmentConfig();
          this.success = "mise à jour configuration ok.";
          this.loading = false;
        }
      } catch (error) {
        await this.$store.dispatch("setUser", null);
        await this.$router.push("/");
      }
    },
  },

  created() {
    this.getEstablishmentConfig();
  },
};
</script>

<style scoped></style>
