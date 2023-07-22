import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/meta/HomeView.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/meta/LoginView.vue"),
        },
        {
          path: "/signup",
          name: "signup",
          component: () => import("../views/meta/SignupView.vue"),
        },
        {
          path: "/forgot",
          name: "forgot",
          component: () => import("../views/meta/ForgotView.vue"),
        },
        {
          path: "/reset-password",
          name: "reset",
          component: () => import("../views/meta/ResetView.vue"),
        },
      ],
    },

    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../views/meta/PrivacyView.vue"),
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("../views/meta/TermsView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/meta/AboutView.vue"),
    },
    {
      path: "/app",
      name: "app",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AppView.vue"),
      children: [
        {
          path: "/app",
          name: "dashboard",
          // route level code-splitting
          // this generates a separate chunk (notes.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "/app/account",
          name: "account",
          // route level code-splitting
          // this generates a separate chunk (notes.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/meta/AccountView.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          component: () => import("../components/layout/PageNotFound.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../components/layout/PageNotFound.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    "/",
    "/login",
    "/signup",
    "/privacy",
    "/terms",
    "/about",
    "/forgot",
    "/reset-password",
  ];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }

  if (to.path === "/" && !auth.user) {
    return "/login";
  } else if (to.path === "/" && auth.user) {
    return "/app";
  } else if (to.path === "/login" && auth.user) {
    return "/app";
  } else if (to.path === "/signup" && auth.user) {
    return "/app";
  } else if (to.path === "/forgot" && auth.user) {
    return "/app";
  } else if (to.path === "/reset-password" && auth.user) {
    return "/app";
  }
});

export default router;
