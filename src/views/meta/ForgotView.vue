<script setup lang="ts">
export interface FormActions {
  setErrors: (fields: Partial<Record<string, string | undefined>>) => void;
}
import AppIcon from "../../components/common/AppIcon.vue";
import router from "../../router";
import { useAuthStore } from "../../stores/auth.store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
const authStore = useAuthStore();
const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
});

async function onSubmit(values: any, { setErrors }: FormActions) {
  const { email } = values;

  await authStore
    .forgotPassword(email)
    .catch((error) => setErrors({ apiError: error.message }));
  return router.push("/login");
}

function onInvalidSubmit({
  values,
  errors,
  results,
}: {
  values: unknown;
  errors: unknown;
  results: unknown;
}) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}
</script>

<template>
  <div class="text-center form-signin w-100 m-auto mt-5">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ isSubmitting }"
      @invalid-submit="onInvalidSubmit"
    >
      <AppIcon />
      <h1 class="h3 mb-3 fw-normal">Forgot password</h1>

      <div class="form-floating">
        <Field
          name="email"
          type="email"
          class="form-control"
          id="floatingInput"
        />
        <label class="text-start" for="floatingInput">Email</label>
      </div>
      <ErrorMessage name="email" />
      <ErrorMessage name="apiError" />

      <button
        type="submit"
        class="mt-3 w-100 btn btn-lg btn-primary"
        :disabled="isSubmitting"
      >
        <span
          v-show="isSubmitting"
          class="spinner-border spinner-border-sm mr-1"
        ></span>
        Send reset link
      </button>
    </Form>
    <br />
    <RouterLink to="/"
      ><img
        src="../../assets/back-icon.svg"
        alt="mdo"
        class="rounded-circle mb-1"
        width="16"
        height="16"
      />
      Back</RouterLink
    >
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
