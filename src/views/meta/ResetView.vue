<script setup lang="ts">
export interface FormActions {
  setErrors: (fields: Partial<Record<string, string | undefined>>) => void;
}
import { useAuthStore } from "../../stores/auth.store";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute } from "vue-router";
import * as Yup from "yup";
import AppIcon from "../../components/common/AppIcon.vue";
const authStore = useAuthStore();
const route = useRoute();
const token = route.query.token;
const schema = Yup.object().shape({
  password: Yup.string().required("Password is required").min(8).max(55),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

async function onSubmit(values: any, { setErrors }: FormActions) {
  const { password } = values;
  if (!token) {
    return setErrors({ apiError: "Invalid token" });
  }
  await authStore
    .resetPassword(password, token)
    .catch((error) => setErrors({ apiError: error.message }));
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
      <h1 class="h3 mb-3 fw-normal">Reset password</h1>

      <div class="form-floating">
        <Field
          name="token"
          disabled
          :value="token"
          type="text"
          class="form-control"
          id="floatingInput"
        />
        <label class="text-start" for="floatingInput">Reset token</label>
      </div>
      <div>{{ route.params.token }}</div>
      <div class="form-floating">
        <Field
          name="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label class="text-start" for="floatingPassword">Password</label>
      </div>
      <ErrorMessage name="password" />
      <div class="form-floating">
        <Field
          name="passwordConfirmation"
          type="password"
          class="form-control"
          id="floatingPasswordConfirmation"
          placeholder="Password"
        />
        <label class="text-start" for="floatingpasswordConfirmation"
          >Password Confirmation</label
        >
      </div>
      <ErrorMessage name="passwordConfirmation" />
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
        Reset password
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
