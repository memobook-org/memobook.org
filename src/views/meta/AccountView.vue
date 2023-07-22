<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth.store";
import { Form, ErrorMessage } from "vee-validate";
import ModalComponent from "../../components/common/ModalComponent.vue";

interface FormActions {
  setErrors: (fields: Partial<Record<string, string | undefined>>) => void;
}
const authStore = useAuthStore();
const modalVisible = ref();
function showModal() {
  modalVisible.value.show();
}
function hideModal() {
  modalVisible.value.hide();
}
async function onSubmitDeleteAccount(
  values: Record<string, unknown>,
  { setErrors }: FormActions,
) {
  await authStore.deleteAccount().catch((error) => {
    setErrors({ apiError: error.message });
    hideModal();
  });
}
</script>

<template>
  <div class="text-center form-signin w-100 m-auto mt-5">
    <Form @submit="onSubmitDeleteAccount" v-slot="{ isSubmitting }">
      <h1 class="h3 mb-3 fw-normal">Account</h1>
      Email: {{ authStore.userEmail }}

      <ErrorMessage name="apiError" />

      <!-- Button trigger modal -->
      <button
        type="button"
        @click="showModal"
        class="mt-3 w-100 btn btn-lg btn-danger"
        :disabled="isSubmitting"
      >
        Delete account
      </button>

      <ModalComponent
        title="Are you sure you want to delete your account?"
        ref="modalVisible"
      >
        <template #footer>
          <button
            type="submit"
            class="btn btn-lg btn-danger"
            :disabled="isSubmitting"
          >
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span
            >Delete
          </button>
        </template>
      </ModalComponent>
    </Form>
  </div>
</template>
<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}
</style>
