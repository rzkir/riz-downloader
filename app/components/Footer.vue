<template>
  <footer class="py-12 px-6 container mx-auto border-t border-white/5">
    <div class="flex flex-col md:flex-row justify-between items-center gap-8">
      <p class="text-white/30 text-sm font-medium">
        &copy; 2026 Downloadin. Made with Passion for Creators.
      </p>
      <div class="flex gap-10">
        <a
          href="#terms"
          class="text-xs uppercase font-heading font-black tracking-widest text-white/40 hover:text-white transition-colors"
          >Terms</a
        >
        <a
          href="#privacy"
          class="text-xs uppercase font-heading font-black tracking-widest text-white/40 hover:text-white transition-colors"
          >Privacy</a
        >
        <a
          href="#contact"
          class="text-xs uppercase font-heading font-black tracking-widest text-white/40 hover:text-white transition-colors"
          >Contact</a
        >
      </div>
      <div class="flex gap-6">
        <a
          href="#"
          class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FF3D57] hover:border-[#FF3D57] transition-all"
          aria-label="Twitter"
        >
          <iconify-icon icon="lucide:twitter" class="text-white" />
        </a>
        <a
          href="#"
          class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FF3D57] hover:border-[#FF3D57] transition-all"
          aria-label="GitHub"
        >
          <iconify-icon icon="lucide:github" class="text-white" />
        </a>
      </div>
    </div>
  </footer>
</template>
