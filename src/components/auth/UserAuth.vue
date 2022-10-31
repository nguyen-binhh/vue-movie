<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleErr">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form class="m-4 p-4" @submit.prevent="submitForm">
        <div class="mx-2">
          <label for="email" class="font-bold mb-2 block">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            class="block w-full text-gray-800 border-solid border-gray-200 p-1 pl-2 focus:border-blue-400 focus:bg-slate-100 focus:outline-none"
          />
        </div>

        <div class="mx-2">
          <label for="password" class="font-bold mb-2 block">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            class="block w-full text-gray-800 border-solid border-gray-200 p-1 pl-2 focus:border-blue-400 focus:bg-slate-100 focus:outline-none"
          />
        </div>
        <p v-if="!formIsValid" class="text-red-500 italic my-2">
          Must be at least 8 characters long
        </p>

        <base-button class="mt-2">{{ submitButtonCaption }}</base-button>
        <base-button
          type="button"
          mode="flat"
          @click.prevent="switchAuthMode"
          >{{ switchModeButtonCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
    ...mapGetters(["userId"]),
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 8
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
          this.$router.push("/");
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
      } catch (err) {
        this.error = err.message || "Failed to Authenticate, try later !";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },

    handleErr() {
      this.error = null;
    },
  },
};
</script>

<style></style>
