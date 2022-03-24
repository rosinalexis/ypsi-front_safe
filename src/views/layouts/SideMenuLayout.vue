<template>
  <nav-component />
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky">
          <ul class="mt-4 px-4 nav flex-column">
            <li class="mb-2 nav-item">
              <router-link to="/users" class="nav-link fw-bold">
                Gestion des utilisateurs <i class="bi bi-people-fill"></i>
              </router-link>
            </li>
            <li class="mb-2 nav-item">
              <router-link to="/jobs" class="nav-link fw-bold">
                Gestion des postes <i class="bi bi-briefcase-fill"></i>
              </router-link>
            </li>
            <li class="mb-2 nav-item">
              <router-link to="/jobsAdverts" class="nav-link fw-bold">
                Gestion des offres d'emploi <i class="bi bi-newspaper"></i>
              </router-link>
            </li>
            <li class="mb-2 nav-item">
              <router-link to="/categories" class="nav-link fw-bold">
                Gestion des catégories <i class="bi bi-bookmarks"></i>
              </router-link>
            </li>

            <li class="mb-2 nav-item">
              <router-link
                :to="{ name: 'listEstablishment' }"
                class="nav-link fw-bold"
              >
                Gestion des établissements <i class="bi bi-building"></i>
              </router-link>
            </li>

            <li class="mb-2 nav-item">
              <router-link :to="{ name: 'settings' }" class="nav-link fw-bold">
                Paramètres <i class="bi bi-gear-fill"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-5">
        <slot />
      </main>
    </div>
  </div>
  <footer-component />
</template>

<script>
import NavComponent from "@/components/navigations/NavComponent";
import FooterComponent from "@/components/navigations/FooterComponent";
export default {
  name: "SideMenuLayout",
  components: { FooterComponent, NavComponent },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

body {
  width: 100vw;
  height: 100vh;
}

.my-custom-scrollbar {
  position: relative;
  min-height: 65vh;
  overflow: auto;
}
.table-wrapper-scroll-y {
  display: block;
}
</style>
