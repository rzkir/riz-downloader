<template>
  <header class="sticky top-0 z-50 w-full pt-4 pb-2 px-4">
    <div class="relative mx-auto max-w-6xl">
      <nav
        class="flex items-center justify-between rounded-full border border-white/5 bg-[#05060f]/80 px-5 py-3 shadow-lg backdrop-blur-xl sm:px-6 md:px-8"
      >
        <!-- Kiri: logo -->
        <NuxtLink
          to="/"
          class="flex shrink-0 items-center gap-2 text-white hover:opacity-90 transition-opacity"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#FF3D57] to-[#E11D48]"
          >
            <iconify-icon icon="lucide:play" class="text-lg text-white" />
          </div>
          <span
            class="font-heading flex items-center gap-1 text-xl font-bold tracking-tight text-white"
          >
            Riz<span class="text-[#FF3D57]">Downloadin</span>
          </span>
        </NuxtLink>

        <!-- Tengah: nav links -->
        <div
          class="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8 text-[15px] font-medium text-white/70"
        >
          <NuxtLink
            to="/"
            class="relative flex items-center gap-2 rounded-full px-4 py-2 hover:text-white hover:bg-white/5 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#FF3D57] after:scale-x-0 hover:after:scale-x-100 after:origin-right after:transition-transform"
            exact-active-class="text-white after:scale-x-100! bg-[#FF3D57]/20"
          >
            <iconify-icon icon="lucide:home" class="text-lg opacity-80" />
            Home
          </NuxtLink>
          <div class="relative group">
            <button
              type="button"
              class="relative flex items-center gap-2 rounded-full px-4 py-2 hover:text-white hover:bg-white/5 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#FF3D57] after:scale-x-0 group-hover:after:scale-x-100 after:origin-right after:transition-transform"
              :class="{ 'text-white after:scale-x-100! bg-[#FF3D57]/20': isServicesActive }"
            >
              <iconify-icon icon="lucide:layers" class="text-lg opacity-80" />
              Services
              <iconify-icon
                icon="lucide:chevron-down"
                class="text-[10px] opacity-70"
              />
            </button>
            <div
              class="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
            >
              <div
                class="min-w-[160px] rounded-xl border border-white/10 bg-[#0d0e1a]/95 py-1.5 shadow-xl backdrop-blur-xl text-white"
              >
                <NuxtLink
                  to="/tiktok"
                  class="flex items-center gap-2 mx-1 rounded-lg px-4 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
                  active-class="bg-white/10 text-[#FF3D57]"
                >
                  <iconify-icon icon="lucide:music" class="text-base" />
                  TikTok
                </NuxtLink>
                <NuxtLink
                  to="/instagram"
                  class="flex items-center gap-2 mx-1 rounded-lg px-4 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
                  active-class="bg-white/10 text-[#FF3D57]"
                >
                  <iconify-icon icon="lucide:camera" class="text-base" />
                  Instagram
                </NuxtLink>
                <NuxtLink
                  to="/youtube"
                  class="flex items-center gap-2 mx-1 rounded-lg px-4 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
                  active-class="bg-white/10 text-[#FF3D57]"
                >
                  <iconify-icon icon="lucide:tv" class="text-base" />
                  YouTube
                </NuxtLink>
              </div>
            </div>
          </div>
          <NuxtLink
            to="/donasi"
            class="relative flex items-center gap-2 rounded-full px-4 py-2 hover:text-white hover:bg-white/5 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#FF3D57] after:scale-x-0 hover:after:scale-x-100 after:origin-right after:transition-transform"
            exact-active-class="text-white after:scale-x-100! bg-[#FF3D57]/20"
          >
            <iconify-icon icon="lucide:heart" class="text-lg opacity-80" />
            Donasi
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="relative flex items-center gap-2 rounded-full px-4 py-2 hover:text-white hover:bg-white/5 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#FF3D57] after:scale-x-0 hover:after:scale-x-100 after:origin-right after:transition-transform"
            exact-active-class="text-white after:scale-x-100! bg-[#FF3D57]/20"
          >
            <iconify-icon icon="lucide:mail" class="text-lg opacity-80" />
            Contact
          </NuxtLink>
        </div>

        <!-- Kanan: language (desktop) + language & hamburger (mobile) -->
        <div class="flex shrink-0 items-center gap-1">
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-[#FF3D57] lg:py-2 lg:text-[15px] lg:font-medium"
            aria-label="Language"
          >
            <iconify-icon
              icon="lucide:globe"
              class="text-base text-[#FF3D57]"
            />
            <span class="lg:hidden">EN</span>
            <span class="hidden lg:inline">English</span>
          </button>
          <button
            type="button"
            class="-mr-2 rounded-lg p-2 text-white/90 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Menu"
            @click="menuOpen = !menuOpen"
          >
            <iconify-icon
              :icon="menuOpen ? 'lucide:x' : 'lucide:menu'"
              class="text-[22px]"
            />
          </button>
        </div>
      </nav>

      <!-- Mobile: dropdown di bawah header (absolute, tidak geser konten) -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="menuOpen"
          class="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/10 bg-[#05060f]/95 px-4 py-4 shadow-xl backdrop-blur-xl text-white lg:hidden"
        >
          <NuxtLink
            to="/"
            class="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
            exact-active-class="bg-white/10 text-[#FF3D57]"
            @click="menuOpen = false"
          >
            <iconify-icon icon="lucide:home" class="text-lg" />
            Home
          </NuxtLink>

          <div class="py-1">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
              :class="{ 'bg-white/10 text-[#FF3D57]': isServicesActive }"
              @click="servicesOpen = !servicesOpen"
            >
              <span class="flex items-center gap-2">
                <iconify-icon icon="lucide:layers" class="text-lg" />
                Services
              </span>
              <iconify-icon
                :icon="
                  servicesOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'
                "
                class="text-lg"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                v-show="servicesOpen"
                class="flex flex-col gap-0.5 pl-4 pb-2"
              >
                <NuxtLink
                  to="/tiktok"
                  class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
                  active-class="bg-white/10 text-[#FF3D57]"
                  @click="menuOpen = false"
                >
                  <iconify-icon icon="lucide:music" class="text-base" />
                  TikTok
                </NuxtLink>
                <NuxtLink
                  to="/instagram"
                  class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
                  active-class="bg-white/10 text-[#FF3D57]"
                  @click="menuOpen = false"
                >
                  <iconify-icon icon="lucide:camera" class="text-base" />
                  Instagram
                </NuxtLink>
                <NuxtLink
                  to="/youtube"
                  class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
                  active-class="bg-white/10 text-[#FF3D57]"
                  @click="menuOpen = false"
                >
                  <iconify-icon icon="lucide:tv" class="text-base" />
                  YouTube
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <NuxtLink
            to="/donasi"
            class="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
            exact-active-class="bg-white/10 text-[#FF3D57]"
            @click="menuOpen = false"
          >
            <iconify-icon icon="lucide:heart" class="text-lg" />
            Donasi
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-[#FF3D57]"
            exact-active-class="bg-white/10 text-[#FF3D57]"
            @click="menuOpen = false"
          >
            <iconify-icon icon="lucide:mail" class="text-lg" />
            Contact
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStateHeader } from "~/services/useStateHeader";

const { menuOpen, servicesOpen } = useStateHeader();
const route = useRoute();
const isServicesActive = computed(
  () =>
    route.path === "/tiktok" ||
    route.path === "/instagram" ||
    route.path === "/youtube" ||
    route.path.startsWith("/tiktok/") ||
    route.path.startsWith("/instagram/") ||
    route.path.startsWith("/youtube/"),
);
</script>
