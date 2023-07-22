<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store";
import AppIcon from "../../components/common/AppIcon.vue";

const authStore = useAuthStore();
</script>
<template>
  <header role="banner" class="py-3 mb-3 border-bottom">
    <div
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
    >
      <RouterLink
        to="/app"
        aria-label="memobook go home icon"
        class="d-flex align-items-center mb-0 mb-lg-0 text-dark text-decoration-none"
      >
        <AppIcon />
      </RouterLink>
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-0 justify-content-center">
        <li>
          <RouterLink
            exact-active-class="text-decoration-underline"
            active-class="text-decoration-underline"
            to="/app"
            class="nav-link px-2"
            >Home</RouterLink
          >
        </li>
      </ul>

      <ul class="nav mb-0 justify-content-center">
        <li>
          <RouterLink
            active-class="text-decoration-underline"
            class="nav-link px-2"
            to="/app/account"
            >Account
          </RouterLink>
        </li>
        <li>
          <a class="nav-link px-2" href="#" @click="authStore.logout()"
            >Logout</a
          >
        </li>
      </ul>
      <!-- 
      <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
        <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
      </form> -->
    </div>
  </header>
</template>
