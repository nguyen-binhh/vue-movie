<template>
  <div>
    <router-link :to="`/actors/${this.actor.id}`">
      <img :src="actorImage" alt="" />

      <h3>{{ actor.name }}</h3>
      <p class="text-gray-400">{{ knownFor }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    actor: {
      required: true,
    },
  },

  computed: {
    actorImage() {
      if (this.actor.profile_path) {
        return (
          "https://image.tmdb.org/t/p/w235_and_h235_face/" +
          this.actor.profile_path
        );
      } else {
        return "https://via.placeholder.com/235x235";
      }
    },

    knownFor() {
      let knownStr = "";
      for (let i; i < this.actor.known_for.length - 1; i++) {
        knownStr = this.actor.known_for[i].name;
      }
      return knownStr;
    },
  },
};
</script>

<style></style>
