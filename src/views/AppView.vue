<script setup lang="ts">
import HeaderComponent from "../components/layout/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <RouterView v-slot="{ Component }">
    <component :is="Component"></component>
  </RouterView>
</template>
