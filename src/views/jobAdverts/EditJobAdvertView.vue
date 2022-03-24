<template>
  <div class="container">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>
    <h1 class="text-center text-uppercase">Modifier une offre d'emploi</h1>
    <form @submit.prevent="handleSubmit">
      <div class="row container bg-light border">
        <div class="my-4 col-lg-6">
          <div class="mb-3">
            <label for="title" class="form-label">Intitulé du poste:</label>
            <input
              v-model="jobAdvert.title"
              type="text"
              class="form-control"
              id="title"
            />
          </div>

          <div class="mb-3">
            <label for="contractType" class="form-label">
              Type de contract:
            </label>
            <input
              v-model="jobAdvert.contractType"
              type="text"
              class="form-control"
              id="contractType"
            />
          </div>

          <div class="mb-3">
            <label for="wage" class="form-label"> Salaire: </label>
            <input
              v-model="jobAdvert.wage"
              type="text"
              class="form-control"
              id="wage"
            />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label"> Description: </label>
            <textarea
              v-model="jobAdvert.description"
              class="form-control"
              id="description"
            ></textarea>
          </div>

          <div class="mb-3 form-check form-switch">
            <input
              v-model="jobAdvert.published"
              class="form-check-input"
              type="checkbox"
              id="published"
            />
            <label class="form-check-label" for="published"
              >Publication de l'offre</label
            >
          </div>
        </div>
        <div class="my-4 col-lg-6">
          <div class="bg-light rounded">
            <div class="mb-3 row">
              <label for="contractTask" class="form-label"> Missions: </label>
              <div class="col-9">
                <input
                  type="text"
                  class="form-control"
                  id="contractTask"
                  v-model="preTask"
                />
              </div>
              <div class="col-2">
                <button class="px-4 btn btn-success" @click.prevent="addTask()">
                  Ajouter
                </button>
              </div>
            </div>
            <div>
              <h4>Liste des missions:</h4>
              <ul v-for="(task, index) in jobAdvert.tasks" :key="index">
                <li>
                  {{ task }}
                  <i
                    class="bi bi-trash2 text-danger"
                    @click.prevent="removeTask(index)"
                  ></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="my-2 bg-light rounded">
            <div class="mb-3 row">
              <label for="contractRequirements" class="form-label"
                >Exigences :
              </label>
              <div class="col-9">
                <input
                  type="text"
                  class="form-control"
                  id="contractRequirements"
                  v-model="preRequirement"
                />
              </div>
              <div class="col-2">
                <button
                  class="px-4 btn btn-success"
                  @click.prevent="addRequirement()"
                >
                  Ajouter
                </button>
              </div>
            </div>
            <div>
              <h4>liste des exigences:</h4>
              <ul
                v-for="(requirement, index) in jobAdvert.requirements"
                :key="index"
              >
                <li>
                  {{ requirement }}
                  <i
                    class="bi bi-trash2 text-danger"
                    @click.prevent="removeRequirement(index)"
                  ></i>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="py-4 mb-2 col-12">
          <button class="btn btn-success">
            Enregister l'offre <i class="bi bi-cloud-arrow-up"></i>
          </button>
          <router-link class="px-5 mx-2 btn btn-danger" to="/jobsAdverts"
            >retour <i class="bi bi-back"></i
          ></router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "EditJobAdvertView",
  components: { SuccessComponent, ErrorComponent },
  data() {
    return {
      jobAdvertId: this.$route.params.id,
      jobAdvert: {
        title: null,
        place: null,
        compagny: null,
        contractType: null,
        wage: null,
        description: null,
        published: false,
        tasks: [],
        requirements: [],
        category: "",
      },
      preTask: "",
      preRequirement: "",
      listCategories: [],
      errors: "",
      success: "",
    };
  },
  computed: mapState(["user"]),

  methods: {
    addTask() {
      let task = this.preTask;
      this.jobAdvert.tasks.push(task);
      this.preTask = "";
    },
    removeTask(index) {
      confirm("Voulez vous supprimer cette élément ?");
      this.jobAdvert.tasks.splice(index, 1);
    },

    addRequirement() {
      let requirement = this.preRequirement;
      this.jobAdvert.requirements.push(requirement);
      this.preRequirement = "";
    },
    removeRequirement(index) {
      confirm("Voulez vous supprimer cette élément ? ");
      this.jobAdvert.requirements.splice(index, 1);
    },
    async getTheCurrentJobAdvert() {
      try {
        const response = await axios.get("job_adverts/" + this.jobAdvertId);
        if (response.status === 200) {
          this.jobAdvert = response.data;
        }
      } catch (error) {
        this.errors = "Impossible de récuperer l'offre d'emploi.";
      }
    },

    async handleSubmit() {
      try {
        const response = await axios.put(
          "job_adverts/" + this.jobAdvertId,
          this.jobAdvert
        );
        if (response.status === 200) {
          this.success = "L'offre d'emploi a été enregistrée.";
        }
      } catch (error) {
        this.errors = "Une erreur de l'utilisateur.";
      }
    },
    async getListOfCategories() {
      try {
        const response = await axios.get("categories");
        for (let index = 0; index < response.data.length; index++) {
          this.listCategories.push(response.data[index]);
        }
      } catch (error) {
        this.errors = "Imposssible de récuperer les catégories.";
      }
    },
  },
  async created() {
    //récuperation de la liste des categories
    await this.getListOfCategories();

    //récuperation de l'offre d'emploi
    await this.getTheCurrentJobAdvert();
  },
};
</script>

<style scoped></style>
