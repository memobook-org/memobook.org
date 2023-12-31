// 1. Define route components.
// These can be imported from other files
import Landing from "./views/Landing.vue";
import Changelog from "./views/Changelog.vue";
import { createRouter, createWebHistory } from "vue-router";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: "/",
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      { path: "/", component: Landing },
      { path: "/changelog", component: Changelog },
      // ...other sub routes
    ],
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
