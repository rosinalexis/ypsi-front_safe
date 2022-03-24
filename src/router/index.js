import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/HomeView"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/LoginView"),
  },
  {
    path: "/home",
    name: "userHome",
    meta: { requiresAuth: true },
    component: () => import("@/views/home/HomeUserView"),
  },
  {
    path: "/users",
    name: "listUser",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/users/ListUserView"),
  },
  {
    path: "/users/add",
    name: "addUser",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/users/UserAddView"),
  },
  {
    path: "/users/:id/edit",
    name: "editUser",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/users/EditUserView"),
  },
  {
    path: "/users/me/profile",
    name: "userProfile",
    meta: { requiresAuth: true },
    component: () => import("@/views/profile/ProfileView"),
  },
  {
    path: "/categories",
    name: "listCategory",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/categories/ListCategoryView"),
  },
  {
    path: "/categories/add",
    name: "addCategory",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/categories/AddCategoryView"),
  },
  {
    path: "/categories/:id/edit",
    name: "editCategory",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/categories/EditCategoryView"),
  },
  {
    path: "/jobs",
    name: "listJob",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/jobs/ListJobView"),
  },
  {
    path: "/jobs/:id/edit",
    name: "editJob",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/jobs/EditJobView"),
  },
  {
    path: "/jobsAdverts",
    name: "listJobAdvert",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/jobAdverts/ListJobAdvertView"),
  },
  {
    path: "/jobsAdverts/edit/:id",
    name: "editJobAdvert",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/jobAdverts/EditJobAdvertView"),
  },
  {
    path: "/jobAdverts/add",
    name: "addJobAdvert",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/jobAdverts/AddJobAdvertView"),
  },
  {
    path: "/jobAdverts/list",
    name: "listUserJobAdvert",
    component: () => import("@/views/jobAdverts/ListHomeJobAdvertView"),
  },
  {
    path: "/contacts",
    name: "listContact",
    meta: { requiresAuth: true },
    component: () => import("@/views/contacts/ListContactView"),
  },
  {
    path: "/contacts/add/:id",
    name: "addContact",
    component: () => import("@/views/contacts/AddContactView"),
  },
  {
    path: "/contacts/management/:id",
    name: "contactManagement",
    meta: { requiresAuth: true },
    component: () => import("@/views/contacts/ContactManagementView"),
  },

  {
    path: "/establishment/list",
    name: "listEstablishment",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/establishment/ListEstablishmentView"),
  },
  {
    path: "/establishment/add",
    name: "addEstablishment",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/establishment/AddEstablishmentView"),
  },
  {
    path: "/administration",
    name: "administration",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/administration/AdministrationView"),
  },
  {
    path: "/settings",
    name: "settings",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/administration/SettingView"),
  },
  {
    path: "/documents/:id",
    name: "documents",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("@/views/administration/DocumentView"),
  },
  {
    path: "/email/template/edit/:id",
    name: "emailTemplateEdit",
    meta: { layout: "side-menu", requiresAuth: true },
    component: () => import("../views/mailConfiguration/EditEmailTemplateView"),
  },
  {
    path: "/404",
    component: () => import("@/views/errorsPages/NotFoundView"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
