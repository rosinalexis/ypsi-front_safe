<template>
  <nav class="mb-3 navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">YPSI CLOUD RH V5</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul v-if="!user" class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link"
              >Connexion</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'listUserJobAdvert' }" class="nav-link"
              >Offres d'emploi</router-link
            >
          </li>
        </ul>
        <ul v-if="user" class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'listUserJobAdvert' }" class="nav-link"
              >Offres d'emploi</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="logout"
              >Déconnexion</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  name: "NavComponent",
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);

    const logout = async () => {
      await axios.get("logout");
      await store.dispatch("setUser", null);
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped></style>
