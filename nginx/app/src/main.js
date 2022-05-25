import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import DefaultLayout from "@/views/layouts/DefaultLayout";
import SideMenuLayout from "@/views/layouts/SideMenuLayout";

createApp(App)
  .component("default-layout", DefaultLayout)
  .component("side-menu-layout", SideMenuLayout)
  .use(store)
  .use(router)
  .mount("#app");

import "bootstrap/dist/js/bootstrap";
