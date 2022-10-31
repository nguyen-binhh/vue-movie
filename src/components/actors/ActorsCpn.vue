<template>
  <div class="container mx-auto px-4 py-16">
    <h2 class="text-yellow-500 text-lg font-semibold mb-3">POPULAR ACTORS</h2>
    <base-dialog fixed :show="isLoading" title="Waiting...">
      <base-spinner></base-spinner>
    </base-dialog>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      v-if="!isLoading"
    >
      <ActorItem
        v-for="actor in this.actors"
        :key="actor.id"
        :actor="actor"
        class="hover:opacity-75 easy-in-out duration-150 cursor-pointer"
      />
    </div>
    <div class="text-center mt-5">
      <a href="" @click.prevent="previous()">
        <i class="fa-solid fa-chevron-left"></i>
      </a>
      <a href="" @click.prevent="next()" class="ml-5">
        <i class="fa-solid fa-chevron-right"></i>
      </a>
    </div>
    <!-- <div class="flex justify-center">
      <div class="spinner"></div>
    </div> -->
  </div>
</template>

<script>
let currentPage = 1;

import ActorItem from "./ActorItem.vue";
export default {
  components: { ActorItem },

  data() {
    return {
      actors: [],
      isLoading: true,
    };
  },

  created() {
    this.fetchActors(this.currentPage);
    // this.scroll();
  },

  methods: {
    async fetchActors(page) {
      try {
        this.isLoading = true;
        const response = await this.axios.get(
          "https://api.themoviedb.org/3/person/popular?page=" + page
        );
        // this.actors.push(...response.data.results);
        this.actors = response.data.results;
        this.isLoading = false;
        // console.log(response.data.results);
      } catch (err) {
        console.log(err);
      }
    },

    scroll() {
      window.onscroll = () => {
        this.isLoading = true;
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          currentPage += 1;
          this.fetchActors((currentPage += 1));
        }
        this.isLoading = false;
      };
    },

    previous() {
      currentPage -= 1;
      this.fetchActors(currentPage);
    },
    next() {
      currentPage += 1;
      this.fetchActors(currentPage);
    },
  },
};
</script>

<style></style>
