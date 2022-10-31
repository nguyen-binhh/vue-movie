<template>
  <div class="container mx-auto border-t border-gray-600 ml-5 px-4 py-4">
    <h2 class="text-4xl font-bold mb-5">Images</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div class="mr-4 mb-4" v-for="(image, index) in images" :key="index">
        <img
          :src="imageTrailler(image)"
          alt=""
          class="hover:opacity-75 easy-in-out duration-150"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],

  methods: {
    imageTrailler(image) {
      if (image.file_path) {
        return "https://image.tmdb.org/t/p/original" + image.file_path;
      } else {
        return "https://via.placeholder.com/300x165";
      }
    },

    // openModel(image) {
    //   let imageFullPath = "";
    //   if (image.file_path) {
    //     imageFullPath =
    //       "https://image.tmdb.org/t/p/original/" + image.file_path;
    //   } else {
    //     imageFullPath = "https://via.placeholder.com/300x450";
    //   }
    //   this.$emit("OnImage", imageFullPath);
    // },
  },
};
</script>

<style></style>
