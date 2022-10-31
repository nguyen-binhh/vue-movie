<template>
  <div class="mx-5">
    <div>
      <h2
        class="mt-5 text-yellow-500 uppercase text-2xl italic font-semibold mb-5"
      >
        Now Playing
      </h2>
    </div>
    <div class="p-4">
      <Carousel
        :control-visible="true"
        :clickable="false"
        :listData="nowPlayingMovie"
        :height="250"
        :itemsToShow="3.95"
        :wrapAround="true"
        :transition="500"
        :autoplay="2000"
        :settings="settings"
      >
        <Slide v-for="(movie, i) in this.nowPlayingMovie" :key="i" class="px-5">
          <router-link
            :to="`/movies/${movie.id}`"
            class="hover:opacity-75 easy-in-out duration-150"
          >
            <figure>
              <img
                :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                alt=""
              />
              <figcaption>
                {{ movie.title }}
              </figcaption>
            </figure>
          </router-link>
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },

  data() {
    return {
      nowPlayingMovie: [],
      settings: {
        itemsToShow: 3,
        snapAlign: "center",
      },

      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },
    };
  },

  created() {
    this.fetchNowPlayingMovie();
  },

  methods: {
    async fetchNowPlayingMovie() {
      const res = await this.axios.get(
        "https://api.themoviedb.org/3/movie/now_playing "
      );
      this.nowPlayingMovie = res.data.results;
    },
  },
});
</script>

<style>
.carousel__icon {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
}
</style>
