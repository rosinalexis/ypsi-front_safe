<template>
  <div>
    <h1 class="my-5 text-center text-uppercase">Gestion d'une candidature</h1>
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <div class="container">
      <div class="row">
        <div class="p-5 col-lg-6 shadow">
          <p>
            <strong>Nom et prénom: </strong>
            {{ contact.lastname + " " + contact.firstname }}
          </p>
          <p>
            <strong>Email: </strong>
            {{ contact.email }}
          </p>
          <p v-if="contact.jobReference">
            <strong>Référence offre d'emploi : </strong>
            {{ contact.jobReference.title }}
          </p>
          <p>
            <strong>Cv et Lettre de motivation : </strong>
            <a
              v-if="contact.coverLetterFileUrl"
              :href="contact.coverLetterFileUrl"
              target="_blank"
              >LM</a
            >/
            <a
              v-if="contact.cvFileUrl"
              :href="contact.cvFileUrl"
              target="_blank"
              >CV</a
            >
          </p>
          <p>
            <strong>Date de la candidature : </strong>
            {{ new Date(contact.createdAt).toLocaleString() }}
          </p>

          <div class="mt-4 form-floating">
            <textarea
              class="form-control bg-light"
              id="floatingTextarea2"
              style="height: 150px"
              v-model="this.contact.management.notes"
            ></textarea>
            <label for="floatingTextarea2">Communication écrite</label>
          </div>
          <div class="d-grid gap-2 col-6 mx-auto mt-4">
            <button class="btn btn-primary" type="button" @click="addNewNotes">
              Ajouter la note
            </button>
          </div>
        </div>
        <div class="p-5 col-lg-6 bg-light shadow">
          <table class="table">
            <thead>
              <tr>
                <th>Procédures</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.receiptConfirmation.state,
                  'text-decoration-line-through':
                    this.contact.management.receiptConfirmation.state,
                }"
              >
                <td>Accusé de réception</td>
                <td>
                  <button
                    class="mx-1 btn btn-primary"
                    @click="changeReceiptConfirmationState"
                  >
                    <i
                      v-if="!this.contact.management.receiptConfirmation.state"
                      class="bi bi-check"
                    >
                    </i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.contactAdministrationMeeting.state,
                  'text-decoration-line-through':
                    this.contact.management.contactAdministrationMeeting.state,
                }"
              >
                <td>Entretien avec le candidat</td>
                <td>
                  <button
                    class="mx-1 mb-1 btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalDateList"
                  >
                    <i class="bi bi-calendar-week"></i>
                  </button>

                  <a
                    class="mx-1 mb-1 btn btn-primary"
                    href="https://meet.google.com/new"
                    target="_blank"
                  >
                    <i class="bi bi-person-workspace"></i>
                  </a>
                  <a
                    class="mx-1 mb-1 btn btn-primary"
                    href="https://calendar.google.com/calendar/u/0/r?cid=alexisbotdev@gmail.com"
                    target="_blank"
                  >
                    <i class="bi bi-calendar-date-fill"></i>
                  </a>
                  <button
                    class="mx-1 mb-1 btn btn-primary"
                    @click="changeMeetingState"
                  >
                    <i
                      v-if="
                        !this.contact.management.contactAdministrationMeeting
                          .state
                      "
                      class="bi bi-check"
                    ></i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.contactAdministrationValidation
                      .state,
                  'text-decoration-line-through':
                    this.contact.management.contactAdministrationValidation
                      .state,
                }"
              >
                <td>Validation employeur</td>

                <td>
                  <button
                    class="mx-1 btn btn-primary"
                    @click="changeValidationState"
                  >
                    <i
                      v-if="
                        !this.contact.management.contactAdministrationValidation
                          .state
                      "
                      class="bi bi-check"
                    >
                    </i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.contactAdministrationHelp.state,
                  'text-decoration-line-through':
                    this.contact.management.contactAdministrationHelp.state,
                }"
              >
                <td>Vérification des aides</td>
                <td>
                  <button
                    class="mx-1 btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalHelpList"
                  >
                    <i class="bi bi-card-list"></i>
                  </button>
                  <button class="mx-1 btn btn-primary" @click="changeHelpState">
                    <i
                      v-if="
                        !this.contact.management.contactAdministrationHelp.state
                      "
                      class="bi bi-check"
                    >
                    </i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>

              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.contactAdministrationDocument.state,
                  'text-decoration-line-through':
                    this.contact.management.contactAdministrationDocument.state,
                }"
              >
                <td>Liste des documents</td>
                <td>
                  <button
                    class="mx-1 btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalDocumentList"
                  >
                    <i class="bi bi-card-list"></i>
                  </button>
                  <button
                    class="mx-1 btn btn-primary"
                    @click="changeDocumentState"
                  >
                    <i
                      v-if="
                        !this.contact.management.contactAdministrationDocument
                          .state
                      "
                      class="bi bi-check"
                    >
                    </i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.contactAdministrationContract.state,
                  'text-decoration-line-through':
                    this.contact.management.contactAdministrationContract.state,
                }"
              >
                <td>Mise en place du contrat de travail</td>
                <td>
                  <button
                    class="mx-1 btn btn-primary"
                    @click="changeContractState"
                  >
                    <i
                      v-if="
                        !this.contact.management.contactAdministrationContract
                          .state
                      "
                      class="bi bi-check"
                    >
                    </i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>

              <tr
                :class="{
                  'opacity-50':
                    this.contact.management.contactAdministrationEquipment
                      .state,
                  'text-decoration-line-through':
                    this.contact.management.contactAdministrationEquipment
                      .state,
                }"
              >
                <td>La liste des outils matériels et logiciels</td>
                <td>
                  <button
                    class="mx-1 btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEquipmentList"
                  >
                    <i class="bi bi-card-list"></i>
                  </button>
                  <button
                    class="mx-1 btn btn-primary"
                    @click="changeEquipmentState"
                  >
                    <i
                      v-if="
                        !this.contact.management.contactAdministrationEquipment
                          .state
                      "
                      class="bi bi-check"
                    >
                    </i>
                    <i v-else class="bi bi-x"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-grid gap-2 col-6 mx-auto">
            <router-link
              v-if="doRecruitment()"
              to="/users/add"
              class="btn btn-primary"
            >
              Recruter le candidat
            </router-link>
          </div>
        </div>

        <div class="row my-5">
          <h3 class="text-center text-uppercase text-secondary">
            Agenda des entretiens
          </h3>
          <div class="col-lg-12 bg-primary mx-auto shadow">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23039BE5&ctz=Europe%2FParis&mode=MONTH&src=eXBzaS5jbG91ZC5yaEBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZnIuZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
              width="100%"
              height="600"
            ></iframe>
          </div>
        </div>

        <div class="row my-5 bg-light">
          <h3 class="mt-4 text-center text-uppercase text-secondary">
            Historique
          </h3>

          <div
            class="p-5 col"
            style="overflow-y: auto; overflow-x: hidden; height: 400px"
          >
            <div v-if="contact.management.history.length > 0">
              <p
                v-for="(history, id) in contact.management.history"
                :key="id"
                class="opacity-50"
              >
                ## <strong>Date:</strong> {{ history.date }}
                <strong>Responsable:</strong> {{ history.author }}
                <strong>Action:</strong>
                {{ history.description }}
              </p>
            </div>
          </div>
        </div>

        <div id="modalList">
          <modal-component id="modalHelpList" title="Liste des aides">
            <table
              class="table"
              v-if="this.contact.management.contactAdministrationHelp.helpList"
            >
              <thead>
                <tr>
                  <th>Aide</th>
                  <th>Etat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in this.contact.management
                    .contactAdministrationHelp.helpList"
                  :key="itemId"
                >
                  <td>
                    {{ item.help.title }}
                  </td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      :checked="item.help.isDone"
                    />
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="removeHelp(itemId)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newHelp.title"
                    />
                  </td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="newHelp.isDone"
                      v-model="newHelp.isDone"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Fait
                    </label>
                  </td>
                  <td>
                    <button class="btn btn-success" @click="addNewHelp">
                      Ajouter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row" v-if="setting">
              <div class="col-12">
                <p>**pour importer une aide</p>
              </div>
              <div class="col-6">
                <select class="form-select" v-model="selectedHelp">
                  <option disabled value="">Choisissez</option>
                  <option
                    v-for="(item, itemId) in setting.helpDocumentConfig"
                    :key="itemId"
                    :value="itemId"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="col-6 text-end">
                <button
                  v-if="this.selectedHelp != null"
                  class="mx-1 btn btn-success"
                  @click="importHelpList"
                >
                  Importer
                </button>
                <button
                  class="mx-1 px-4 btn btn-success"
                  @click="resetHelpList"
                >
                  Reset
                </button>
              </div>
            </div>
          </modal-component>

          <modal-component id="modalDocumentList" title="Liste des documents">
            <table
              class="table"
              v-if="
                this.contact.management.contactAdministrationDocument
                  .documentList
              "
            >
              <thead>
                <tr>
                  <th>Procédure</th>
                  <th>État</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in this.contact.management
                    .contactAdministrationDocument.documentList"
                  :key="itemId"
                >
                  <td>
                    {{ item.document.title }}
                  </td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="item.document.isOk"
                    />
                  </td>
                  <td>
                    <router-link
                      class="mx-1 btn btn-primary"
                      :to="{ name: 'documents', params: { id: itemId } }"
                    >
                      <i class="bi bi-eye-fill"></i
                    ></router-link>
                    <button
                      class="btn btn-danger"
                      @click="removeDocument(itemId)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newDocument.title"
                    />
                  </td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="newDocument.isOk"
                      v-model="newDocument.isOk"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Fait
                    </label>
                  </td>
                  <td>
                    <button class="btn btn-success" @click="addNewDocument">
                      Ajouter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row" v-if="setting">
              <div class="col-12">
                <p>**pour importer des documents</p>
              </div>
              <div class="col-6">
                <select class="form-select" v-model="selectedDocument">
                  <option disabled value="">Choisissez</option>
                  <option
                    v-for="(item, itemId) in setting.documentConfig"
                    :key="itemId"
                    :value="itemId"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="col-6 text-end">
                <button
                  v-if="this.selectedDocument != null"
                  class="mx-1 btn btn-success"
                  @click="importDocumentList"
                >
                  Importer
                </button>
                <button
                  class="mx-1 px-4 btn btn-success"
                  @click="resetDocumentList"
                >
                  Reset
                </button>
              </div>
            </div>
          </modal-component>

          <modal-component
            id="modalEquipmentList"
            title="Liste des équipements"
          >
            <table
              class="table"
              v-if="
                this.contact.management.contactAdministrationEquipment
                  .equipmentList
              "
            >
              <thead>
                <tr>
                  <th>Equipement</th>
                  <th>Type</th>
                  <th>Etat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in this.contact.management
                    .contactAdministrationEquipment.equipmentList"
                  :key="itemId"
                >
                  <td>
                    {{ item.equipment.title }}
                  </td>
                  <td>{{ item.equipment.category }}</td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="item.equipment.isOk"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="deleteEquipment(itemId)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newEquipment.title"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="newEquipment.category"
                    />
                  </td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="NewEquipmentIsOk"
                      v-model="newEquipment.isOk"
                    />
                    <label class="form-check-label" for="NewEquipmentIsOk">
                      Reçu
                    </label>
                  </td>
                  <td>
                    <button class="btn btn-success" @click="addNewEquipment">
                      Ajouter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row" v-if="setting">
              <div class="col-12">
                <p>**pour importer une liste d'équipement</p>
              </div>
              <div class="col-6">
                <select class="form-select" v-model="selectedEquipment">
                  <option disabled value="">Choisissez</option>
                  <option
                    v-for="(item, itemId) in setting.equipmentConfig"
                    :key="itemId"
                    :value="itemId"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="col-6 text-end">
                <button
                  v-if="this.selectedEquipment != null"
                  class="mx-1 btn btn-success"
                  @click="importEquipmentList"
                >
                  Importer
                </button>
                <button
                  class="mx-1 px-4 btn btn-success"
                  @click="resetEquipmentList"
                >
                  Reset
                </button>
              </div>
            </div>
          </modal-component>

          <modal-component
            id="modalDateList"
            title="Liste des propositions de date"
          >
            <table
              class="table"
              v-if="
                this.contact.management.contactAdministrationMeeting
                  .proposedDates
              "
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>état</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, itemId) in this.contact.management
                    .contactAdministrationMeeting.proposedDates"
                  :key="itemId"
                >
                  <td>
                    {{ new Date(item.newDate).toLocaleString() }}
                  </td>

                  <td>
                    <span v-if="item.isOk" class="badge bg-success">OK</span>
                    <span v-else class="badge bg-danger">NR</span>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="removeDate(itemId)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="datetime-local"
                      class="form-control"
                      v-model="newDate.newDate"
                    />
                  </td>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="NewDateIsOk"
                      v-model="newDate.isOk"
                      disabled
                    />
                  </td>
                  <td>
                    <button class="btn btn-success" @click="addNewDate">
                      Ajouter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="col-12 text-end">
              <button @click="sendMeetingEmail" class="mx-1 btn btn-secondary">
                Envoyer le mail
              </button>
            </div>
          </modal-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import ModalComponent from "@/components/modals/ModalComponent";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "ContactManagementView",
  components: {
    ModalComponent,
    SuccessComponent,
    ErrorComponent,
  },
  data() {
    return {
      contactId: this.$route.params.id,
      contact: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        cvFileUrl: "",
        cvFileName: "",
        coverLetterName: "",
        coverLetterFileUrl: "",
        message: "",
        management: {
          receiptConfirmation: {
            state: false,
            isDone: false,
          },
          contactAdministrationValidation: {
            state: false,
            supervisor: null,
          },
          contactAdministrationMeeting: {
            state: false,
            supervisor: null,
            proposedDates: [],
            sendEmailOk: false,
            isDone: false,
            isUserValidation: false,
          },
          contactAdministrationContract: {
            state: false,
          },
          contactAdministrationHelp: {
            state: false,
            helpList: [],
          },
          contactAdministrationDocument: {
            state: false,
            documentList: [],
          },
          contactAdministrationEquipment: {
            state: false,
            equipmentList: [],
          },
          notes: "",
          history: [],
        },
        createdAt: "",
        updatedAt: "",
        jobReference: {
          id: null,
          title: "",
        },
        state: "",
      },
      newDate: {
        newDate: "",
        isOk: false,
      },
      newHelp: {
        title: "",
        isDone: true,
      },
      newDocument: {
        title: "",
        isOk: false,
      },
      newEquipment: {
        title: "",
        category: "",
        isOk: true,
      },
      selectedEquipment: null,
      selectedDocument: null,
      selectedHelp: null,
      errors: "",
      success: "",
      setting: {
        documentConfig: [],
        equipmentConfig: [],
        helpDocumentConfig: [],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    importHelpList() {
      if (this.selectedHelp != null) {
        let configId = this.selectedHelp;

        this.contact.management.contactAdministrationHelp.helpList.push({
          help: {
            title: this.setting.helpDocumentConfig[configId].title,
            isDone: false,
          },
        });
        this.updateContact();
      }
    },
    resetHelpList() {
      this.resetMessage();
      this.contact.management.contactAdministrationHelp.helpList = [];
      this.updateContact();
    },
    importDocumentList() {
      if (this.selectedDocument != null) {
        let configId = this.selectedDocument;
        this.contact.management.contactAdministrationDocument.documentList.push(
          {
            document: {
              title: this.setting.documentConfig[configId].title,
              isOk: false,
            },
          }
        );
        this.updateContact();
      }
    },
    resetDocumentList() {
      this.resetMessage();
      this.contact.management.contactAdministrationDocument.documentList = [];
      this.updateContact();
    },
    importEquipmentList() {
      if (this.selectedEquipment != null) {
        let configId = this.selectedEquipment;
        this.setting.equipmentConfig[configId].equipments.forEach((element) => {
          this.contact.management.contactAdministrationEquipment.equipmentList.push(
            {
              equipment: {
                title: element,
                category:
                  this.setting.equipmentConfig[this.selectedEquipment].title,
                isOk: false,
              },
            }
          );
        });

        this.updateContact();
      }
    },
    resetEquipmentList() {
      this.resetMessage();
      this.contact.management.contactAdministrationEquipment.equipmentList = [];

      this.updateContact();
    },
    removeDate(id) {
      if (confirm("Voulez-vous vraiment supprimer cette date ? ")) {
        this.resetMessage();
        //j'ajoute dans la liste
        this.contact.management.contactAdministrationMeeting.proposedDates.splice(
          id,
          1
        );

        //mise à jour serveur
        this.updateContact();
      }
    },
    addNewDate() {
      //reset des messages
      this.resetMessage();

      let myDate = {
        newDate: this.newDate.newDate,
        uid: Math.random().toString(36).substring(2, 5),
        isOk: false,
      };

      if (this.newDate.newDate) {
        this.contact.management.contactAdministrationMeeting.proposedDates.push(
          myDate
        );

        //reset de newDate
        this.newDate.newDate = "";
        this.newDate.isOk = false;

        this.updateContact();
      }
    },
    addNewHistory(description) {
      let history = {
        date: new Date().toLocaleString(),
        author: this.checkProfile(),
        description: description,
      };

      this.contact.management.history.push(history);
    },
    addNewNotes() {
      this.resetMessage();

      //mise à jour du serveur
      this.updateContact();
    },
    doRecruitment() {
      if (
        this.contact.management.contactAdministrationValidation.state ===
          true &&
        this.contact.management.contactAdministrationMeeting.state === true &&
        this.contact.management.contactAdministrationContract.state === true &&
        this.contact.management.contactAdministrationHelp.state === true &&
        this.contact.management.contactAdministrationDocument.state === true &&
        this.contact.management.contactAdministrationEquipment.state === true
      ) {
        this.contact.state = "Ok pour Recrutement";
        this.updateContact();
        return true;
      }
      return false;
    },
    removeDocument(id) {
      if (confirm("Voulez-vous vraiment supprimer ce document ? ")) {
        this.resetMessage();
        //j'ajoute dans la liste
        this.contact.management.contactAdministrationDocument.documentList.splice(
          id,
          1
        );

        //mise à jour serveur
        this.updateContact();
      }
    },
    addNewDocument() {
      this.resetMessage();
      let documentItem = {
        document: {
          title: this.newDocument.title,
          isOk: this.newDocument.isOk,
        },
      };

      if (documentItem.document.title.length < 2) {
        this.errors = "le champs est vide";
        return;
      }

      this.contact.management.contactAdministrationDocument.documentList.push(
        documentItem
      );

      //mise à jour du serveur
      this.updateContact();

      //reset de l'affichage
      this.newDocument.title = "";
      this.newDocument.isOk = false;
    },
    deleteEquipment(id) {
      if (confirm("Voulez-vous vraiment supprimer cet équipement ? ")) {
        this.resetMessage();
        //j'ajoute dans la liste
        this.contact.management.contactAdministrationEquipment.equipmentList.splice(
          id,
          1
        );

        //mise à jour serveur
        this.updateContact();
      }
    },
    addNewEquipment() {
      this.resetMessage();
      let equipmentItem = {
        equipment: {
          title: this.newEquipment.title,
          category: this.newEquipment.category,
          isOk: this.newEquipment.isOk,
        },
      };

      if (
        equipmentItem.equipment.title.length < 2 &&
        equipmentItem.equipment.category.length < 2
      ) {
        this.errors = "le champs est vide";
        return;
      }

      this.contact.management.contactAdministrationEquipment.equipmentList.push(
        equipmentItem
      );

      //mise à jour du serveur
      this.updateContact();

      //reset de l'affichage
      this.newEquipment.title = "";
      this.newEquipment.category = "";
      this.newEquipment.isOk = false;
    },
    removeHelp(id) {
      if (confirm("Voulez-vous vraiment supprimer cette aide ?")) {
        this.resetMessage();
        //j'ajoute dans la liste
        this.contact.management.contactAdministrationHelp.helpList.splice(
          id,
          1
        );
        //mise à jour serveur
        this.updateContact();
      }
    },
    addNewHelp() {
      this.resetMessage();
      //récuperation
      let helpItem = {
        help: {
          title: this.newHelp.title,
          isDone: this.newHelp.isDone,
        },
      };

      if (helpItem.help.title.length < 2) {
        this.errors = "le champs est vide";
        return;
      }

      //j'ajoute dans la liste
      this.contact.management.contactAdministrationHelp.helpList.push(helpItem);

      //mise à jour serveur
      this.updateContact();
      this.newHelp.title = "";
      this.newHelp.isDone = false;
    },
    changeReceiptConfirmationState() {
      this.contact.management.receiptConfirmation.state =
        !this.contact.management.receiptConfirmation.state;

      if (!this.contact.management.receiptConfirmation.state) {
        this.addNewHistory("annulation accusé de récéption.");
        this.contact.state = "NR";
      } else {
        this.contact.state = "Accusé de réception";
        this.addNewHistory("accusé de réception ok.");
      }

      this.updateContact();
      this.getCurrentContact();
    },
    changeEquipmentState() {
      this.contact.management.contactAdministrationEquipment.state =
        !this.contact.management.contactAdministrationEquipment.state;

      if (!this.contact.management.contactAdministrationEquipment.state) {
        this.contact.state = "Documents";
        this.addNewHistory("annulation liste des équipements.");
      } else {
        this.contact.state = "Equipement";
        this.addNewHistory("liste des équipements ok.");
      }

      this.updateContact();
    },
    changeDocumentState() {
      this.contact.management.contactAdministrationDocument.state =
        !this.contact.management.contactAdministrationDocument.state;

      if (!this.contact.management.contactAdministrationDocument.state) {
        this.contact.state = "Aides";
        this.addNewHistory("annulation liste des documents.");
      } else {
        this.contact.state = "Documents";
        this.addNewHistory("liste des documents ok.");
      }

      this.updateContact();
    },
    changeHelpState() {
      this.contact.management.contactAdministrationHelp.state =
        !this.contact.management.contactAdministrationHelp.state;

      if (!this.contact.management.contactAdministrationHelp.state) {
        this.contact.state = "Validation employeur";
        this.addNewHistory("annulation liste des aides.");
      } else {
        this.contact.state = "Aides";
        this.addNewHistory("liste des aides ok.");
      }

      this.updateContact();
    },
    changeContractState() {
      this.contact.management.contactAdministrationContract.state =
        !this.contact.management.contactAdministrationContract.state;

      if (!this.contact.management.contactAdministrationContract.state) {
        this.contact.state = "Documents";
        this.addNewHistory("annulation redaction contract.");
      } else {
        this.contact.state = "Contrat";
        this.addNewHistory("redaction des contrats ok.");
      }

      this.updateContact();
    },
    changeValidationState() {
      //changement d'état
      this.contact.management.contactAdministrationValidation.state =
        !this.contact.management.contactAdministrationValidation.state;

      if (!this.contact.management.contactAdministrationValidation.state) {
        //reset du management
        this.contact.management = {
          receiptConfirmation: {
            state: false,
            isDone: false,
          },
          contactAdministrationValidation: {
            state: false,
            supervisor: null,
          },
          contactAdministrationMeeting: {
            state: false,
            supervisor: null,
            proposedDates: [],
            sendEmailOk: false,
            isDone: false,
            isUserValidation: false,
          },
          contactAdministrationContract: {
            state: false,
          },
          contactAdministrationHelp: {
            state: false,
            helpList: [],
          },
          contactAdministrationDocument: {
            state: false,
            documentList: [],
          },
          contactAdministrationEquipment: {
            state: false,
            equipmentList: [],
          },
          notes: "",
          history: [],
        };

        //reset du validateur
        this.contact.management.contactAdministrationValidation.supervisor = "";

        //reset du state
        this.contact.state = "Entretien";
        this.addNewHistory("annulation validation employeur.");
      } else {
        //mise à jour du state
        this.contact.state = "Validation employeur";
        this.addNewHistory("validation employeur ok.");

        this.contact.management.contactAdministrationValidation.supervisor =
          this.checkProfile;
      }

      //mise à jour coté serveur
      this.updateContact();
    },
    changeMeetingState() {
      this.contact.management.contactAdministrationMeeting.state =
        !this.contact.management.contactAdministrationMeeting.state;

      if (!this.contact.management.contactAdministrationMeeting.state) {
        this.contact.management.contactAdministrationMeeting.supervisor = "";
        this.contact.state = "Accusé de réception";
        this.addNewHistory("annulation  entretien visio.");
      } else {
        this.contact.management.contactAdministrationMeeting.supervisor =
          this.checkProfile;

        this.contact.state = "Entretien";
        this.addNewHistory("validation entretien visio ok.");
      }

      this.updateContact();
    },
    resetMessage() {
      if (this.errors) {
        this.errors = "";
      }
      if (this.success) {
        this.success = "";
      }
    },
    checkProfile() {
      if (this.user) {
        if (this.user.profile) {
          return this.user.profile.lastname;
        }
        return this.user.email;
      }

      return "";
    },
    async updateContact() {
      try {
        //reset message information
        this.resetMessage();

        //envoi de la requête
        const response = await axios.put(
          "contacts/" + this.contactId,
          this.contact
        );
        if (response.status === 200) {
          //await this.getCurrentContact();
          this.success = "mise à jour contact ok";
        }
      } catch (error) {
        this.errors = "impossible de mettre à jour le contact";
      }
    },

    sendMeetingEmail() {
      //reset message information
      this.resetMessage();

      this.contact.management.contactAdministrationMeeting.sendEmailOk = true;
      this.addNewHistory("Email de confirmation date Ok.");
      this.updateContact();
    },
    getCurrentSetting() {
      this.user.establishment.forEach((element) => {
        if (element.id === this.user.currentEstablishment) {
          this.setting = element.setting;
        }
      });
    },
    async getCurrentContact() {
      try {
        //reset des messages
        this.resetMessage();

        //récupération de la candidature
        const response = await axios.get("contacts/" + this.contactId);
        if (response.status === 200) {
          this.contact = response.data;
        }
      } catch (error) {
        this.error = "la candidature est introuvable";
      }
    },
  },
  async created() {
    await this.getCurrentContact();

    this.getCurrentSetting();
  },
};
</script>

<style scoped></style>
