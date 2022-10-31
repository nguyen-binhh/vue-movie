<template>
  <div>
    <footer>
      <div class="container mx-auto">
        <div
          class="flex flex-wrap items-center md:justify-center justify-center text-center"
        >
          <div class="w-full md:w-4/12 px-4 mt-5">
            <div class="text-sm text-white font-semibold py-1">
              Copyright © {{ date }} Creative by
              <a
                href="https://www.facebook.com/phubinh.nguyen.22/"
                target="_blank"
                class="text-white hover:text-gray-400 text-sm font-semibold py-1"
              >
                Bình-Nguyễn</a
              >
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
