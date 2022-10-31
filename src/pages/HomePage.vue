<template>
  <div>
    <Hero />
    <NowPlaying />
    <Popular />

    <CommingMovie />
  </div>
</template>

<script>
import Popular from "@/components/Movies/PopularMovies.vue";
import CommingMovie from "@/components/Movies/UpcommingMovie.vue";
import NowPlaying from "@/components/now_playing/NowPlaying.vue";
import Hero from "@/components/hero/HeroCpn.vue";

export default {
  components: {
    Popular,
    CommingMovie,
    NowPlaying,
    Hero,
  },
};
</script>
