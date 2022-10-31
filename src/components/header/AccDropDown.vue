<template>
  <div class="relative z-10 flex items-center font-semibold">
    <button
      @click.prevent="isOpen = !isOpen"
      class="focus:outline-none"
      v-if="isLoggedIn"
    >
      <img
        src="@/assets/img/avatar.jpg"
        alt="avatar"
        width="40"
        height="40"
        class="rounded-full h-10 mr-1"
      />
    </button>

    <router-link to="/auth" v-else class="flex items-center font-semibold"
      >Login/Register</router-link
    >

    <button
      @click="isOpen = false"
      v-if="isOpen"
      class="w-full h-full fixed top-0 left-0 bottom-0 right-0 opacity-50 bg-black cursor-default"
    ></button>

    <div
      v-if="isOpen"
      class="absolute bg-white rounded-lg -right-20 top-11 w-48 py-2 shadow-xl transition-all ease-in-out"
    >
      <router-link
        to="/profile"
        href=""
        class="text-gray-500 block px-4 py-2 hover:bg-indigo-400 hover:text-white cursor-pointer"
        >My favorite
      </router-link>

      <a
        @click="logout"
        class="text-gray-500 block px-4 py-2 hover:bg-indigo-400 hover:text-white cursor-pointer"
        >Logout</a
      >
    </div>
  </div>
</template>

<script>
import mitt from "mitt";
const emitter = mitt();
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    // click Esc to Escape
    const handleEsc = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };
    document.addEventListener("keydown", handleEsc);

    emitter.on("hook:beforeUnmount", () => {
      document.removeEventListener("keydown", handleEsc);
    });
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
    },
  },
};
</script>

<style></style>
