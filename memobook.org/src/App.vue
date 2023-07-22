<script setup lang="ts">
import LightDarkSwitcher from './components/LightDarkSwitcher.vue'
</script>

<template>
  <!-- use the router-link component for navigation. -->
  <!-- specify the link by passing the `to` prop. -->
  <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
  <router-link to="/">memobook.app</router-link>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <router-link to="/changelog">Changelog</router-link>

  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
  <LightDarkSwitcher></LightDarkSwitcher>
</template>

<style scoped></style>
