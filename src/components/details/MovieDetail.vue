<template>
  <div>
    <base-dialog fixed :show="isLoading" title="Waiting...">
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="container mx-auto ml-5 my-10 flex pb-2">
      <img :src="poster" alt="Phim" class="w-64" />

      <div class="mx-24">
        <h1 class="text-4xl font-semibold">{{ this.movie.title }}</h1>
        <span class="text-gray-500 text-sm">
          <i class="fa-solid fa-star text-yellow-500"></i>
          {{ (this.movie.vote_average * 10).toFixed(2) }}% |
          {{ this.movie.release_date }}
          <span v-for="(item, index) in movie.genres" :key="index" class="ml-1">
            {{ item.name }}
            <span v-if="movie.genres.length - 1 !== index">,</span>
          </span>
        </span>
        <p class="mt-5">
          {{ this.movie.overview }}
        </p>
        <div class="mt-5">
          <span class="font-semibold">Featured Cast</span>

          <div class="flex">
            <div v-for="(crew, index) in movie.credits.crew" :key="index">
              <div v-if="index < 2" class="flex flex-col mt-5 mr-5">
                <span>{{ crew.name }}</span>
                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <a
              :href="video"
              target="_blank"
              class="rounded bg-yellow-500 px-5 py-3 inline-flex"
            >
              <i class="fa-solid fa-play text-black pt-1 mr-3"></i>
              <span class="text-black">Play Trailer</span></a
            >
            <a
              @click.prevent="favoriteMovie(movie)"
              href="#"
              class="rounded bg-yellow-500 px-8 py-3 inline-flex ml-5"
            >
              <img
                class="h mt-1 mr-3"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/USVA_headstone_emb-69_%28Heart%29.svg/640px-USVA_headstone_emb-69_%28Heart%29.svg.png"
                alt=""
              />
              <!-- <i class="fa-solid fa-heart h mt-1 mr-3"></i> -->
              <span class="text-black">Favorite</span></a
            >
          </div>
        </div>
      </div>
    </div>
    <Cast :casts="this.movie.credits.cast"></Cast>
    <Images :images="this.movie.images.backdrops"></Images>
  </div>
</template>

<script>
import Cast from "./CastCpn.vue";
import Images from "./ImagesTrailer.vue";

export default {
  components: {
    Cast,
    Images,
  },

  data() {
    return {
      movie: {
        credits: {
          crew: {},
        },
        images: {
          backdrops: {},
        },
      },
      isLoading: true,
      isShow: false,
      isFavorite: [],
    };
  },

  computed: {
    poster() {
      return "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
    },
    video() {
      if (!this.movie.videos) return;
      return (
        "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
      );
    },
  },

  created() {
    this.fetchMovie(this.$route.params.id);
    // this.handle();
  },

  watch: {
    "$route.params.id"(value) {
      this.fetchMovie(value);
    },
    // immediate: true,
  },

  methods: {
    async fetchMovie(movieId) {
      this.isLoading = true;
      const response = await this.axios.get(
        "/movie/" + movieId + "?append_to_response=credits,videos,images"
      );
      this.movie = response.data;
      this.isLoading = false;
    },

    favoriteMovie(movie) {
      this.isFavorite.push(movie);
      console.log(movie);
    },
  },
};
</script>

<style lang="scss" scoped>
.h {
  height: 15px;
}

.font {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
