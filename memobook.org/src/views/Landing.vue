<script setup lang="ts">
import { onMounted, ref } from 'vue';
const buttonTxt = ref()
const Url = ref()
const winbuttontxt = ref()
const macbuttontxt = ref()
const linbuttontxt = ref()
const WinUrl = ref('')
const MacUrl = ref()
const LinUrl = ref()
onMounted(async () => {
  let response = await fetch(
    "https://cdn.memobook.org/latest.json"
  );
  const Version = JSON.parse(await response.text()).version;

  var Name = "Not known";
  var WinFile = "memobook_" + Version + "_x64-setup.exe";
  WinUrl.value =
    "https://cdn.memobook.org/v" +
    Version +
    "/nsis/memobook_" +
    Version +
    "_x64-setup.exe";

    var MacFile = "memobook_" + Version + "_x64.dmg";
  MacUrl.value =
    "https://cdn.memobook.org/v" +
    Version +
    "/dmg/memobook_" +
    Version +
    "_x64.dmg";

  var LinFile = "memobook_" + Version + "_amd64.AppImage";
  LinUrl.value =
    "https://cdn.memobook.org/v" +
    Version +
    "/appimage/memobook_" +
    Version +
    "_amd64.AppImage";

    if (navigator.appVersion.indexOf("Win") != -1) {
    Name = WinFile;
    Url.value = WinUrl.value;
  }
  if (navigator.appVersion.indexOf("Mac") != -1) {
    Name = "Mac";
    Url.value = MacUrl.value;
  }
  if (
    navigator.appVersion.indexOf("X11") != -1 ||
    navigator.appVersion.indexOf("Linux") != -1
  ) {
    Name = "Linux";
    Url.value = LinUrl.value;
  }

  buttonTxt.value = "Download for " + Name;

  winbuttontxt.value =
    WinFile;
  macbuttontxt.value = MacFile;
  linbuttontxt.value = LinFile;

})
</script>

<template>

  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="arrow-right-circle" viewBox="0 0 16 16">
      <path
        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
    </symbol>
    <symbol id="bootstrap" viewBox="0 0 118 94">
      <title>memobook app</title>
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z">
      </path>
    </symbol>
  </svg>

  <div>
    <main>
      <h1 class="text-body-emphasis pt-5">Get memobook.app</h1>
      <p class="fs-5 col-md-8">
        Use memobook to save notes to the cloud to use on all devices.
      </p>

      <div class="mb-5">
        <a id="downloadButton" v-bind:href="Url" class="btn btn-primary btn-lg px-4">{{ buttonTxt }}
        </a>
      </div>

      <hr class="col-3 col-md-2 mb-5" />

      <div class="row g-5">
        <div class="col-md-6">
          <h2 class="text-body-emphasis">All downloads</h2>
          <ul class="list-unstyled ps-0">
            <li>
              Windows: 
              <a id="windownloadButton" class="icon-link mb-1" v-bind:href="WinUrl" rel="noopener" target="_blank">
                {{ winbuttontxt }}
              </a>
            </li>
            <li>
              Mac:
              <a id="macdownloadButton" class="icon-link mb-1" v-bind:href="MacUrl" rel="noopener" target="_blank">
                {{ macbuttontxt }}
              </a>
            </li>
            <li>
              Linux:
              <a id="lindownloadButton" class="icon-link mb-1" v-bind:href="LinUrl" rel="noopener" target="_blank">
                {{ linbuttontxt }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-md-6">
          <h2 class="text-body-emphasis">Guides</h2>
          <p>
            Coming soon
          </p>
          <!-- <ul class="list-unstyled ps-0">
            <li>
              <a class="icon-link mb-1" href="/docs/5.3/getting-started/introduction/">
                <svg class="bi" width="16" height="16">
                  <use xlink:href="#arrow-right-circle" />
                </svg>
                Bootstrap quick start guide
              </a>
            </li>
            <li>
              <a class="icon-link mb-1" href="/docs/5.3/getting-started/webpack/">
                <svg class="bi" width="16" height="16">
                  <use xlink:href="#arrow-right-circle" />
                </svg>
                Bootstrap Webpack guide
              </a>
            </li>
            <li>
              <a class="icon-link mb-1" href="/docs/5.3/getting-started/parcel/">
                <svg class="bi" width="16" height="16">
                  <use xlink:href="#arrow-right-circle" />
                </svg>
                Bootstrap Parcel guide
              </a>
            </li>
            <li>
              <a class="icon-link mb-1" href="/docs/5.3/getting-started/vite/">
                <svg class="bi" width="16" height="16">
                  <use xlink:href="#arrow-right-circle" />
                </svg>
                Bootstrap Vite guide
              </a>
            </li>
            <li>
              <a class="icon-link mb-1" href="/docs/5.3/getting-started/contribute/">
                <svg class="bi" width="16" height="16">
                  <use xlink:href="#arrow-right-circle" />
                </svg>
                Contributing to Bootstrap
              </a>
            </li>
          </ul> -->
        </div>
      </div>
    </main>
    <footer class="pt-5 my-5 text-body-secondary border-top">
      Created by the memobook-org team &middot; 2023
    </footer>
  </div>
</template>

<style scoped></style>
