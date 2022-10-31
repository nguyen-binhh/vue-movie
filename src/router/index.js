import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage"),
  },
  {
    path: "/movies/:id",
    name: "movies",
    component: () => import("@/components/details/MovieDetail"),
  },

  {
    path: "/actors",
    name: "actors",
    component: () => import("@/components/actors/ActorsCpn"),
  },
  {
    path: "/actors/:id",
    name: "actorDetail",
    component: () => import("@/components/actors/ActorDetail"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/components/profile/ProfileCpn"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/components/auth/UserAuth"),
  },

  {
    path: "/:notFound(.*)",
    name: "NotFound",
    component: () => import("@/components/NotFound"),
  },
];

// router.beforeEach(function (to, _, next) {
//   if (to.meta.requiresAuth && !this.$store.getters.isAuthenticated) {
//     next('/');
//   } else {
//     next();
//   }
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes,
});

export default router;
