<template>
  <div class="relative">
    <div class="right border-b border-gray-600 w-full">
      <Navbar />
      <Search />
    </div>
    <router-view v-slot="slotProps">
      <component :is="slotProps.Component"></component>
    </router-view>
    <div class="border-t border-gray-600 w-full">
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/header/NavbarCpn.vue";
import Search from "@/components/header/SearchCpn.vue";
import Footer from "@/components/footer/FooterCpn.vue";
export default {
  components: {
    Navbar,
    Search,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
.right {
  display: flex;
  gap: 0 20px;
  padding: 20px;
}
</style>
