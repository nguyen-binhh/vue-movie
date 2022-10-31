<template>
  <div class="rounded overflow-hidden">
    <router-link :to="`/movies/${movie.id}`">
      <img
        :src="poster"
        alt=""
        class="hover:opacity-75 easy-in-out duration-150"
      />
    </router-link>

    <h3>{{ movie.title }}</h3>

    <div>
      <i class="fa-solid fa-star text-yellow-500"></i>
      <span class="ml-2"
        >{{ movie.vote_average * 10 }}% | {{ movie.release_date }}</span
      >
      <br />
    </div>
    <span class="text-sm text-gray-500">
      <span v-for="(genre, index) in movie.genre_ids" :key="genre.id">
        {{ genreTypeName(genre, index) }}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["movie", "genres"],

  computed: {
    poster() {
      return "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
    },
  },

  methods: {
    genreTypeName(genreId, index) {
      for (const item of this.genres) {
        if (item.id === genreId) {
          if (this.movie.genre_ids.length - 1 === index) {
            return item.name;
          } else {
            return item.name + "," + " ";
          }
        }
      }
    },
  },
};
</script>

<style></style>
