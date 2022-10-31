<template>
  <div class="container mx-auto py-16 px-4 flex">
    <base-dialog fixed :show="isLoading" title="Wait a sec...">
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="flex-none">
      <img :src="actorImg" alt="" />

      <ul class="flex items-center mt-4 text-gray-500">
        <li>
          <a
            :href="'https://facebook.com/' + socialDetails.facebook_id"
            title="Facebook"
            targer="_blank"
          >
            <i class="fa-brands fa-facebook"></i>
          </a>
        </li>
        <li class="ml-6">
          <a
            :href="'https://instagram.com/' + socialDetails.instagram_id"
            title="Instagram"
            targer="_blank"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li class="ml-6">
          <a
            :href="'https://twitter.com/' + socialDetails.twitter_id"
            title="Twitter"
            targer="_blank"
          >
            <i class="fa-brands fa-twitter"></i>
          </a>
        </li>
        <li class="ml-6">
          <a href="" title="Website" targer="_blank">
            <i class="fa-solid fa-earth-americas"></i>
          </a>
        </li>
      </ul>
    </div>

    <div class="ml-20">
      <h2 class="text-4xl font-semibold">{{ this.actor.name }}</h2>
      <i class="fa-solid fa-cake-candles"></i>
      <span class="ml-2 text-sm text-gray-500">{{ this.actor.birthday }}</span>
      <p class="text-gray-300">{{ this.actor.place_of_birth }}</p>
      <p class="text-gray-300 mt-8">
        {{ this.actor.biography }}
      </p>

      <h4 class="mt-12 font-semibold">Known For</h4>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <div v-for="movie in this.knownFor" :key="movie.id">
          <router-link
            :to="`/movies/${movie.id}`"
            class="text-gray-500 text-sm leading-normal hover:text-white"
          >
            <img
              :src="movieImage(movie)"
              alt="poster"
              class="mt-1 hover:opacity-75 transition ease-in-out duration-150"
            />

            <span>{{ movie.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="my-2 mx-5">
    <h2 class="mt-2 text-gray-500">Credits</h2>
    <ul class="pl-5 mt-8">
      <li :key="cast.id" v-for="cast in castMovie">
        <strong>
          {{ castDetails(cast) }}
        </strong>
        <router-link :to="`/movies/${cast.id}`">
          {{ cast.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  data() {
    return {
      socialDetails: [],
      actor: {},
      knownFor: [],
      castMovie: {},
      isLoading: true,
    };
  },

  created() {
    this.fetchActor(this.$route.params.id);
    this.fetchCredits(this.$route.params.id);
    this.fetchSocial(this.$route.params.id);
  },

  computed: {
    actorImg() {
      return "https://image.tmdb.org/t/p/w300" + this.actor.profile_path;
    },
  },

  methods: {
    async fetchActor(actorId) {
      this.isLoading = true;
      const res = await this.axios.get(
        "https://api.themoviedb.org/3/person/" + actorId
      );
      await nextTick();

      // console.log(res.data);
      this.actor = res.data;

      this.isLoading = false;

      // console.log(res.data.cast);
    },
    async fetchCredits(actorId) {
      this.isLoading = true;
      const res = await this.axios.get(
        "https://api.themoviedb.org/3/person/" + actorId + "/combined_credits"
      );
      this.castMovie = res.data.cast.slice(0, 10);

      this.knownFor = res.data.cast
        .filter((movie) => movie.media_type === "movie")
        .slice(1, 6);
      this.isLoading = false;
      // console.log(this.knownFor);
    },

    movieImage(movie) {
      const posterPath = movie.poster_path;
      if (!posterPath) {
        return "https://via.placeholder.com/185x278";
      }
      return "https://image.tmdb.org/t/p/w185/" + posterPath;
    },

    async fetchSocial(actorId) {
      const res = await this.axios.get(
        "https://api.themoviedb.org/3/person/" + actorId + "/external_ids"
      );
      this.socialDetails = res.data;
    },
    castDetails(cast) {
      return parseInt(cast.release_date) + " . ";
    },
  },
};
</script>

<style></style>
<!-- :href="'https://facebook.com/' + socialDetails.facebook_id" -->
