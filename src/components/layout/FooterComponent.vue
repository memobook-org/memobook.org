<script setup lang="ts">
import { RouterLink } from "vue-router";
import { version } from "../../../package.json";
</script>
<template>
  <footer role="contentinfo" class="py-3 my-4">
    <ul class="nav justify-content-center border-top pt-3 mt-3">
      <li class="nav-item">
        <RouterLink to="/privacy" class="nav-link px-2"
          >Privacy Policy</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink to="/terms" class="nav-link px-2"
          >Terms and Conditions</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink to="/about" class="nav-link px-2">About</RouterLink>
      </li>
    </ul>
    <div class="text-center">memobook v{{ version }}</div>
  </footer>
</template>
