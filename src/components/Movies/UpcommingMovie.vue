<template>
  <div class="mx-5">
    <h2
      class="mt-5 text-yellow-500 uppercase text-2xl italic font-semibold mb-5"
    >
      Upcomming Movie
    </h2>
    <Carousel
      :control-visible="true"
      :clickable="false"
      :listData="UpMovie"
      :height="250"
      :itemsToShow="3.95"
      :wrapAround="true"
      :transition="500"
      :autoplay="2000"
      :settings="settings"
      :breakpoints="breakpoints"
      :key="UpMovie"
    >
      <Slide
        v-for="(movie, i) in this.UpMovie"
        :key="i"
        :index="i"
        class="px-5"
      >
        <router-link
          :to="`/movies/${movie.id}`"
          class="hover:opacity-75 easy-in-out duration-150"
        >
          <figure>
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              alt=""
            />
            <figcaption>{{ movie.title }}</figcaption>
          </figure>
        </router-link>
      </Slide>
      <template #addons>
        <Pagination />
        <Navigation />
      </template>
    </Carousel>
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
      UpMovie: [],
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },

  created() {
    this.fetchUpcommingMovie();
  },

  methods: {
    async fetchUpcommingMovie() {
      const res = await this.axios.get(
        "https://api.themoviedb.org/3/movie/upcoming"
      );

      this.UpMovie = res.data.results;
    },
  },
});
</script>
