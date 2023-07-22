<script setup lang="ts">
import changelog from '../../../CHANGELOG.md?raw'
import {marked} from 'marked'
import DOMPurify from 'dompurify';
import {mangle} from "marked-mangle"
import { gfmHeadingId } from "marked-gfm-heading-id";

marked.use(mangle())
marked.use(gfmHeadingId({}))

let markdownHTML = marked(changelog)
let clean = DOMPurify.sanitize(markdownHTML);

</script>

<template>
  <div v-html="clean">
  </div>
</template>

<style scoped></style>
