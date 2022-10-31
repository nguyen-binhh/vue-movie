<template>
  <div>
    <div class="mt-5 w-full border-b border-gray-600">
      <img
        src="@/assets/img/avatar.jpg"
        alt="avatar"
        width="200"
        height="300"
        class="radius h-50 mx-auto my-0 block"
      />
      <p class="text-center text-gray-500">Bình Nguyễn</p>
      <p class="text-center text-gray-500 text-sm mb-5">
        nguyenphubinh2207@gmail.com
      </p>
    </div>

    <div>
      <ProfileItems />
    </div>
  </div>
</template>

<script>
import ProfileItems from "./ProfileItems.vue";
export default {
  components: {
    ProfileItems,
  },
};
</script>

<style scoped>
.radius {
  border-radius: 50%;
}
</style>
