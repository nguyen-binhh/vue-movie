<template>
  <div class="search container ralative ml-10 flex-1 justify-center">
    <div class="relative">
      <input
        ref="searchBox"
        type="text"
        class="rounded-full bg-gray-600 px-5 focus:outline-none shadow-sm h-11 relative"
        placeholder="Search.."
        @input="debounceSearch"
        v-model="searchTerm"
        @focus="handleFocus"
      />
      <div class="absolute top-2 right-5 cursor-pointer text-gray-500">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>

      <div class="absolute mt-2 mr-3 rounded bg-gray-600 w-full z-10">
        <!-- <base-spinner v-if="isLoading" /> -->
        <ul class="mt-3" v-if="showSearchResults">
          <li v-for="(movie, index) in searchResults" :key="index">
            <router-link
              class="flex items-center border-b border-gray-500 p-2"
              :to="`/movies/${movie.id}`"
              @click="showSearchResults = false"
            >
              <img
                :src="poster(movie.poster_path)"
                class="w-10 p-1"
                alt="phim"
              />
              <span class="ml-3 text-left">{{ movie.title }}</span>
            </router-link>
          </li>
        </ul>
        <ul class="px-3" v-if="searchResults.length === 0 && showSearchResults">
          <li>no results '{{ searchTerm }}'</li>
        </ul>
      </div>
    </div>
    <Account />
  </div>
</template>

<script>
import Account from "./AccDropDown.vue";
export default {
  components: {
    Account,
  },
  data() {
    return {
      searchResults: [],
      searchTerm: "",
      showSearchResults: false,
      isLoading: true,
    };
  },

  computed: {},

  created() {
    this.keyboardEvents();
  },

  methods: {
    debounceSearch(event) {
      this.isLoading = true;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (event.target.value.length > 2) {
          this.fetchSearch(event.target.value);
        }
      }, 700);
      this.isLoading = false;
    },

    show() {
      console.log("aaaa");
    },

    async fetchSearch(term) {
      try {
        this.isLoading = true;
        const response = await this.axios.get("/search/movie?query=" + term, {
          timeout: 2000,
        });
        this.searchResults = response.data.results;

        this.showSearchResults = response.data.results ? true : "No Results";
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },

    handleFocus() {
      if (this.searchTerm !== "") {
        this.showSearchResults = true;
      }
    },

    keyboardEvents() {
      let windowObj = this;

      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.showSearchResults = false;
        }
      });

      window.addEventListener("keypress", (e) => {
        if (e.keyCode === "47") {
          e.preventDefault();
          windowObj.$refs.searchBox.focus();
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.showSearchResults = false;
        }
      });
    },

    poster(poster_path) {
      if (poster_path) {
        return "https://image.tmdb.org/t/p/w500" + poster_path;
      } else {
        return "https://via.placeholder.com/50x75";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  gap: 0 20px;
}

.w {
  width: 537px;
}
</style>
