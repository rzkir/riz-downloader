<template>
  <footer class="py-12 px-6 border-t border-white/5 bg-[#05060f]">
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <iconify-icon icon="logos:tiktok-icon" class="text-xl" />
        <span class="text-xl font-extrabold">
          <span class="text-white">down</span
          ><span class="text-gradient">tik.to</span>
        </span>
      </NuxtLink>

      <div class="flex gap-8 text-xs font-medium text-gray-500">
        <a href="#" class="hover:text-white">Contact</a>
        <a href="#" class="hover:text-white">Privacy Policy</a>
        <a href="#" class="hover:text-white">Terms & Conditions</a>
      </div>

      <p class="text-[10px] text-gray-600">
        Copyright &copy; 2024 DownTik.to. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
