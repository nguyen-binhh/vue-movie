<template>
  <div class="container w-1/2 relative">
    <router-link to="/" class="w-1/2">
      <img
        src="@/assets/img/Logo.572ab1206c7ce31f6401.png"
        alt="Phim"
        class="img shrink-0 block mr-4 w-44 h-5 mt-4"
      />
    </router-link>

    <ul class="flex items-center gap-7 ml-7 w-1/2">
      <li class="text-xl font-medium hover:text-gray-500">
        <router-link to="/">Movies</router-link>
      </li>
      <li class="text-xl font-medium hover:text-gray-500">
        <router-link to="/actors">Actors</router-link>
      </li>
      <li class="text-xl font-medium hover:text-gray-500">
        <router-link to="/profile" v-if="isUserLoggedIn">Profile</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 0 30px;
}
</style>
