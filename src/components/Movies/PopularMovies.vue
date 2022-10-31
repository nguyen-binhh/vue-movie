<template>
  <div class="mx-5">
    <h2
      class="mt-5 text-yellow-500 uppercase text-2xl italic font-semibold mb-5"
    >
      Popular Movies
    </h2>

    <base-dialog fixed :show="isLoading" title="Waiting...">
      <base-spinner></base-spinner>
    </base-dialog>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
    >
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      ></MovieItem>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem.vue";

// import axios from "@/servers/api.js";
export default {
  components: {
    MovieItem,
  },

  data() {
    return {
      movies: [],
      genres: [],
      isLoading: true,
    };
  },

  async created() {
    this.fetGenres();

    //https://api.themoviedb.org/3/movie/popular
    try {
      this.isLoading = true;
      const response = await this.axios.get("/movie/popular");
      this.movies = response.data.results;
      this.isLoading = false;
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    //https://api.themoviedb.org/3/genre/movie/list
    async fetGenres() {
      try {
        this.isLoading = true;
        const response = await this.axios.get("/genre/movie/list");
        this.genres = response.data.genres;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
