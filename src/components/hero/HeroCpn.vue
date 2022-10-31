<template>
  <div class="mb-12">
    <base-spinner v-if="isLoading"></base-spinner>
    <div class="p-4" v-else>
      <Carousel
        :control-visible="true"
        :clickable="false"
        :listData="heroMovie"
        :itemsToShow="3.95"
        :wrapAround="true"
        :transition="500"
        :autoplay="2000"
        :settings="settings"
      >
        <Slide
          v-for="(movie, i) in this.heroMovie"
          :key="i"
          class="px-5 w-full"
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
      heroMovie: [],
      isLoading: true,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 1,
          snapAlign: "start",
        },
      },
    };
  },

  created() {
    this.fetchHeroMovie();
  },
  methods: {
    async fetchHeroMovie() {
      try {
        this.isLoading = true;
        const res = await this.axios.get("movie/popular");

        this.heroMovie = res.data.results.slice(0, 4);
        //   console.log(this.heroMovie);
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
  },
});
</script>

<style></style>
