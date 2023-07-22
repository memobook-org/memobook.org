<script setup lang="ts">
import { RouterView } from "vue-router";
import "./assets/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterComponent from "./components/layout/FooterComponent.vue";
import LightDarkSwitcher from "./components/common/LightDarkSwitcher.vue";
window.addEventListener("onselectstart", (event) => {
  return false;
});
window.addEventListener("oncontextmenu", (event) => {
  return false;
});
window.addEventListener("paste", async (event) => {
  console.log("paste action initiated");
  console.log(event);
  let res;

  try {
    res = await navigator.clipboard.read();
  } catch (e) {
    // there's nothing in the clipboard
    return;
  }
  console.log(res[0]);
  // return the most recent item
  return res[0];
});
</script>

<template>
  <main>
    <RouterView />
  </main>
  <FooterComponent />
  <LightDarkSwitcher />
</template>

<style></style>
