<template>
  <nav
    class="relative z-50 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto"
  >
    <NuxtLink to="/" class="flex items-center gap-2">
      <iconify-icon icon="logos:tiktok-icon" class="text-2xl" />
      <span class="text-2xl font-extrabold tracking-tight">
        <span class="text-white">down</span
        ><span class="text-gradient">tik.to</span>
      </span>
    </NuxtLink>

    <div
      class="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400"
    >
      <a href="#" class="hover:text-white transition-colors">Home</a>
      <div class="relative group cursor-pointer">
        <span
          class="hover:text-white transition-colors flex items-center gap-1"
        >
          Language <iconify-icon icon="lucide:chevron-down" />
        </span>
      </div>
      <a href="#" class="hover:text-white transition-colors"
        >FireFox Extension</a
      >
      <a href="#faq" class="hover:text-white transition-colors">FAQ</a>
    </div>

    <a
      href="#"
      class="bg-white text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all"
    >
      Learn more
    </a>
  </nav>
</template>
