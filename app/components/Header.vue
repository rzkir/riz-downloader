<template>
  <nav
    class="relative z-50 flex items-center justify-between px-8 md:px-20 py-8 max-w-[1440px] mx-auto w-full"
  >
    <NuxtLink to="/" class="flex items-center gap-2 cursor-default">
      <div
        class="w-10 h-10 bg-linear-to-br from-[#FF3D57] to-[#E11D48] rounded-xl flex items-center justify-center rotate-3"
      >
        <iconify-icon icon="lucide:play" class="text-white text-xl" />
      </div>
      <span class="font-heading text-2xl font-black tracking-tighter">
        Video<span class="text-[#FF3D57]">Max</span>
      </span>
    </NuxtLink>

    <div
      class="hidden lg:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-white/60"
    >
      <a
        href="mailto:hello@videomax.com"
        class="hover:text-[#FF3D57] transition-colors flex items-center gap-2"
      >
        <iconify-icon icon="lucide:mail" class="text-lg" />
        Email
      </a>
      <a
        href="#dribbble"
        class="hover:text-[#FF3D57] transition-colors flex items-center gap-2"
      >
        <iconify-icon icon="lucide:dribbble" class="text-lg" />
        Dribbble
      </a>
      <div class="flex items-center gap-2 cursor-pointer group">
        <iconify-icon icon="lucide:languages" class="text-lg text-[#FF3D57]" />
        <span class="group-hover:text-white transition-colors">English</span>
        <iconify-icon icon="lucide:chevron-down" class="text-xs" />
      </div>
    </div>
  </nav>
</template>
