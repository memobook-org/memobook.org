<script setup lang="ts">
import Modal from "bootstrap/js/dist/modal";
import { ref, onMounted } from "vue";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "<<Title goes here>>",
  },
  body: {
    type: Boolean,
    default: true,
  },
});

const modalEle = ref<HTMLElement>();
let thisModalObj: Modal;
onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  thisModalObj = new Modal(modalEle.value!);
});
function _show() {
  thisModalObj.show();
}
function _hide() {
  thisModalObj.hide();
}
defineExpose({ show: _show, hide: _hide });
</script>

<template>
  <div
    class="modal fade"
    id="modalComponent"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="modalEle"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="body" class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
