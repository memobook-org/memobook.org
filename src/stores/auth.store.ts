import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";
import router from "../router";
import type { LocationQueryValue } from "vue-router";

const baseUrl = import.meta.env.VITE_API_URL;
const user = localStorage.getItem("user");

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: user ? JSON.parse(user) : null,
    returnUrl: "/app",
  }),
  getters: {
    userEmail: (state) =>
      state.user && state.user.email ? state.user.email : "",
  },
  actions: {
    async login(email: string, password: string) {
      const loginResponse = await fetchWrapper.post(`${baseUrl}/login`, {
        email,
        password,
      });

      if (loginResponse.ok === true) {
        // update pinia state
        this.user = {
          token: loginResponse.token,
          id: loginResponse.id,
          email: loginResponse.email,
        };

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(this.user));

        // redirect to previous url or default to home page
        router.push(this.returnUrl);
      } else {
        throw Error(loginResponse.message);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/");
    },
    async forgotPassword(email: string) {
      try {
        await fetchWrapper.post(`${baseUrl}/forgot`, { email });
      } catch (err) {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      }
    },
    async deleteAccount() {
      try {
        await fetchWrapper.delete(`${baseUrl}/user`);
        return this.logout();
      } catch (err) {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      }
    },
    async revokeTokens() {
      try {
        await fetchWrapper.post(`${baseUrl}/user/revoke`);
      } catch (err) {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      }
    },
    async resetPassword(
      newPassword: string,
      token: LocationQueryValue | LocationQueryValue[],
    ) {
      try {
        const resetPasswordResponse = await fetchWrapper.post(
          `${baseUrl}/reset-password/${token}`,
          {
            confirmPassword: newPassword,
          },
        );

        if (resetPasswordResponse.ok === true) {
          router.push("/login");
        }
        if (resetPasswordResponse.ok === false) {
          throw Error(resetPasswordResponse.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      }
    },
    async signup(email: string, password: string) {
      try {
        const registerResponse = await fetchWrapper.post(`${baseUrl}/signup`, {
          email,
          password,
        });

        if (registerResponse.ok === true) {
          const loginResponse = await fetchWrapper.post(`${baseUrl}/login`, {
            email,
            password,
          });

          if (loginResponse.ok === true) {
            this.user = {
              token: loginResponse.token,
              id: loginResponse.id,
              email: loginResponse.email,
            };

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(this.user));

            // redirect to previous url or default to home page
            router.push(this.returnUrl);
          } else {
            throw Error(loginResponse.message);
          }
        } else {
          throw Error(registerResponse.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          throw Error(err.message);
        }
      }
    },
  },
});
