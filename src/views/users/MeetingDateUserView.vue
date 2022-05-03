<template>
  <div class="container page">
    <error-component v-if="errors" :error="errors"></error-component>
    <success-component v-if="success" :success="success"></success-component>

    <div class="my-4 row container mx-auto">
      <div class="mx-auto p-5 col-lg-6 shadow">
        <h2 class="h3 text-center">La date du rendez-vous :</h2>
        <p class="text-center text-uppercase text-dark my-5">
          {{ new Date(meetingDate).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "@/components/notifications/ErrorComponent";
import SuccessComponent from "@/components/notifications/SuccessComponent";
import axios from "axios";

export default {
  name: "MeetingDateUserView",
  components: { SuccessComponent, ErrorComponent },
  data() {
    return {
      contactId: this.$route.params.id,
      dateUid: this.$route.params.uid,
      errors: "",
      success: "",
      loading: true,
      meetingDate: "",
    };
  },
  methods: {
    resetMessages() {
      this.error = "";
      this.success = "";
    },
    async getMeetingDate() {
      try {
        //reset des messages
        this.resetMessages();

        axios.defaults.baseURL = "https://localhost:8000";
        const response = await axios.get(
          "validate/date/" + this.contactId + "/" + this.dateUid
        );

        if (response.status === 200) {
          console.log(response.data.meetingDate);
          this.meetingDate = response.data.meetingDate;
        }
      } catch (error) {
        this.error =
          "Impossible de récuperer la date du rdv. \n" +
          error.response.data.detail;
      }
    },
  },
  async created() {
    await this.getMeetingDate();
  },
};
</script>

<style scoped></style>
