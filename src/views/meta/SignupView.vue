<script setup lang="ts">
export interface FormActions {
  setErrors: (fields: Partial<Record<string, string | undefined>>) => void;
}
import { useAuthStore } from "../../stores/auth.store";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import AppIcon from "../../components/common/AppIcon.vue";

const authStore = useAuthStore();

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(8).max(55),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
async function onSubmit(
  values: Record<string, any>,
  { setErrors }: FormActions,
) {
  const { email, password } = values;

  return await authStore
    .signup(email, password)
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
      <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

      <div class="form-floating">
        <Field
          name="email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label class="text-start" for="floatingInput">Email address</label>
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
        class="w-100 btn btn-lg btn-primary"
        :disabled="isSubmitting"
      >
        <span
          v-show="isSubmitting"
          class="spinner-border spinner-border-sm mr-1"
        ></span>
        Sign up
      </button>
      <p class="mt-5 text-muted"><RouterLink to="/login">Login</RouterLink></p>
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
