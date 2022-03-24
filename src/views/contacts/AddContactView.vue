<template>
  <div class="container">
    <error-component v-if="error" :error="error"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <loading-component :loading="loading"></loading-component>
    <div v-if="jobAdvert" class="container">
      <h1 class="my-5 text-uppercase text-center">
        Postuler au poste de {{ jobAdvert.title }}
      </h1>

      <div class="row mx-auto">
        <div class="p-5 col-lg-6 shadow">
          <h2 class="my-5">Référence de l'offre d'emploi</h2>
          <div>
            <p><strong>Intitulé de l'offre:</strong> {{ jobAdvert.title }}</p>
          </div>
          <div>
            <p><strong>Lieu 🚐:</strong> {{ jobAdvert.place }}</p>
          </div>
          <div>
            <p><strong>Entreprise 📰:</strong> {{ jobAdvert.compagny }}</p>
          </div>
          <div>
            <p>
              <strong>Type de contrat ⌨:</strong> {{ jobAdvert.contractType }}
            </p>
          </div>
          <div>
            <p><strong>Description:</strong> {{ jobAdvert.description }}</p>
          </div>
          <div>
            <p><strong>Missions 🏋️‍♂️:</strong></p>
            <ul>
              <li v-for="(task, index) in jobAdvert.tasks" :key="index">
                {{ task }}
              </li>
            </ul>
          </div>

          <div>
            <p><strong>Exigences 🥋:</strong></p>
            <ul>
              <li
                v-for="(requirement, index) in jobAdvert.requirements"
                :key="index"
              >
                {{ requirement }}
              </li>
            </ul>
          </div>
        </div>
        <div class="p-5 col-lg-6 bg-dark shadow text-white">
          <h2 class="my-5">Formulaire de contact</h2>

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="lastname" class="form-label">Nom:</label>
              <input
                type="text"
                id="lastname"
                class="form-control"
                placeholder="Jhon"
                v-model="contact.lastname"
              />
            </div>
            <div class="mb-3">
              <label for="firstname" class="form-label">Prénom:</label>
              <input
                type="text"
                id="firstname"
                class="form-control"
                placeholder="Doe"
                v-model="contact.firstname"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="jhonDoe@email.fr"
                v-model="contact.email"
              />
            </div>
            <div class="mb-3">
              <label for="cvFile" class="form-label">CV:</label>
              <input
                type="file"
                id="cvFile"
                class="form-control"
                @change="onCvFileUpload"
              />
            </div>
            <div class="mb-3">
              <label for="coverLetterFile" class="form-label"
                >Lettre de motivation:</label
              >
              <input
                type="file"
                id="coverLetterFile"
                class="form-control"
                @change="onCoverFileUpload"
              />
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">Message:</label>
              <textarea
                id="message"
                class="form-control"
                v-model="contact.message"
              ></textarea>
            </div>
            <div class="col-lg-12 text-center">
              <button class="px-5 btn btn-success">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <h1 class="text-uppercase text-center">Offre introuvable</h1>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import LoadingComponent from "@/components/notifications/LoadingComponent";
import axios from "axios";
export default {
  name: "AddContactView",
  components: { LoadingComponent, SuccessComponent, ErrorComponent },
  data() {
    return {
      error: "",
      success: "",
      loading: true,
      jobAdvertId: this.$route.params.id,
      jobAdvert: null,
      contact: {
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
        jobReference: "",
        coverLetterFile: null,
        cvFile: null,
      },
    };
  },
  methods: {
    onCvFileUpload(event) {
      this.contact.cvFile = event.target.files[0];
    },
    onCoverFileUpload(event) {
      this.contact.coverLetterFile = event.target.files[0];
    },
    checkIfBlank(value) {
      if (value.length === 0 || value.length < 3) {
        throw "Valeur invalide!";
      }
      //faire un fichier exception plustard
      return true;
    },
    async handleSubmit() {
      try {
        this.loading = true;
        //vérification des informations de l'utilisateur
        this.checkIfBlank(this.contact.firstname);
        this.checkIfBlank(this.contact.lastname);
        this.checkIfBlank(this.contact.email);
        this.checkIfBlank(this.contact.message);
        this.contact.subject = "candidature au poste de" + this.jobAdvert.title;
        this.contact.jobReference = "api/job_adverts/" + this.jobAdvertId;

        //envoyer le formulaire
        const response = await axios.post("contacts", this.contact);

        if (response.status === 201) {
          //récuperation de l'id du contact
          let contactId = await response.data.id;

          //envoyer le deuxième formulaire
          let url = "contacts/" + contactId + "/add/documents";

          let bodyFormData = new FormData();

          bodyFormData.append("cvFile", this.contact.cvFile);
          bodyFormData.append("coverLetterFile", this.contact.coverLetterFile);

          await axios.post(url, bodyFormData, {});

          this.loading = false;
          //informer l'utilisateur
          this.success = "La candidature a été transmise.";
        }
      } catch (error) {
        this.loading = false;
        this.error = "Formulaire invalide.";
      }
    },

    async findJobAdvertById() {
      try {
        this.loading = true;
        let url = "job_adverts/" + this.jobAdvertId;

        const response = await axios.get(url);
        this.jobAdvert = await response.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error =
          "Impossible de récuperer l'offre d'emploi. L'offre n'existe pas ou vous avez un adBlocker activé.";
      }
    },
  },
  async created() {
    //check si l'offre existe
    await this.findJobAdvertById();
  },
};
</script>

<style scoped></style>
