<template>
  <div class="container mx-auto border-t border-gray-600 ml-5 px-4 py-4">
    <h2 class="text-4xl font-bold mb-5">CAST</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div class="mr-4 mb-4" v-for="cast in casts" :key="cast.id">
        <img
          :src="castImg(cast)"
          alt=""
          class="hover:opacity-75 easy-in-out duration-150"
        />
        <span class="text-gray-300">{{ cast.name }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["casts"],

  methods: {
    castImg(cast) {
      if (cast.profile_path) {
        return "https://image.tmdb.org/t/p/w500" + cast.profile_path;
      } else {
        return "https://via.placeholder.com/300x450";
      }
    },
  },
};
</script>

<style></style>
