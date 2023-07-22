<script setup lang="ts">
export interface FormActions {
  setErrors: (fields: Partial<Record<string, string | undefined>>) => void;
}
import { useAuthStore } from "../../stores/auth.store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import AppIcon from "../../components/common/AppIcon.vue";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(8),
});

async function onSubmit(values: any, { setErrors }: FormActions) {
  const authStore = useAuthStore();
  const email = values.email;
  const password = values.password;

  return await authStore
    .login(email, password)
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
      v-slot="{ isSubmitting }"
      :validation-schema="schema"
      @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
    >
      <AppIcon />
      <h1 class="h3 mb-3 fw-normal">Please login</h1>

      <div class="form-floating">
        <Field
          name="email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="Email address"
        />
        <label for="floatingInput" class="text-start">Email address</label>
      </div>
      <ErrorMessage name="email" />
      <div class="form-floating">
        <Field
          name="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword" class="text-start">Password</label>
      </div>
      <ErrorMessage name="password" />
      <ErrorMessage name="apiError" />
      <button
        type="submit"
        class="w-100 btn btn-lg btn-primary"
        :disabled="isSubmitting"
      >
        <span
          v-show="isSubmitting"
          class="spinner-border spinner-border-sm mr-1"
        ></span>
        Login
      </button>
      <p class="mt-5 text-muted">
        <RouterLink to="/signup">Sign up</RouterLink>
      </p>
      <p class="text-muted">
        <RouterLink to="/forgot">Forgot password</RouterLink>
      </p>
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

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
