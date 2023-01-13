import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/singup",
      name: "registro",
      component: () => import("../components/Registro.vue"),
    },
    {
      path: "/sendEmail",
      name: "sendEmail",
      component: () => import("../components/sendEmail.vue"),
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("../components/resetPassword.vue"),
    },
  ],
});

export default router;
