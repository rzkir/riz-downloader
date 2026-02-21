<template>
  <main class="flex-1 relative z-10">
    <!-- Hero + Download Section -->
    <section class="max-w-[1440px] mx-auto px-8 md:px-20 pt-12 pb-32">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <span class="flex h-2 w-2 rounded-full brand-gradient"></span>
          <span
            class="text-[10px] font-black uppercase tracking-[0.3em] text-white/60"
            >Universal Downloader v2.0</span
          >
        </div>
        <h1
          class="text-6xl md:text-[5.5rem] font-black leading-[0.9] mb-8 font-heading"
        >
          One Tool.
          <br />
          <span class="text-brand-gradient">All Social Media.</span>
        </h1>
        <p
          class="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed"
        >
          The ultimate destination to download high-quality content from TikTok
          and Instagram instantly. No watermarks, no limits, no login required.
        </p>
      </div>

      <!-- Download Card -->
      <div class="max-w-4xl mx-auto mb-32">
        <div
          class="glass-card rounded-[2.5rem] p-10 relative shadow-2xl overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 brand-gradient opacity-10 blur-[100px]"
          ></div>

          <div class="flex justify-center gap-4 mb-10">
            <button
              type="button"
              :class="[
                'flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all group',
                activeTab === 'tiktok'
                  ? 'service-tab-active border-white/5'
                  : 'border-transparent hover:bg-white/5',
              ]"
              @click="activeTab = 'tiktok'"
            >
              <iconify-icon icon="logos:tiktok-icon" class="text-2xl" />
              <span
                :class="[
                  'font-black uppercase text-xs tracking-widest',
                  activeTab === 'tiktok' ? '' : 'text-white/40 group-hover:text-white',
                ]"
                >TikTok</span
              >
            </button>
            <button
              type="button"
              :class="[
                'flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all group',
                activeTab === 'instagram'
                  ? 'service-tab-active border-white/5'
                  : 'border-transparent hover:bg-white/5',
              ]"
              @click="activeTab = 'instagram'"
            >
              <iconify-icon icon="logos:instagram-icon" class="text-2xl" />
              <span
                :class="[
                  'font-black uppercase text-xs tracking-widest',
                  activeTab === 'instagram'
                    ? ''
                    : 'text-white/40 group-hover:text-white',
                ]"
                >Instagram</span
              >
            </button>
          </div>

          <div class="relative">
            <form
              class="bg-[#0A0B14] rounded-2xl p-2 flex items-center border border-white/10 input-glow transition-all duration-300 shadow-inner"
              @submit.prevent="handleDownload"
            >
              <div class="pl-6 pr-4">
                <iconify-icon
                  icon="lucide:link-2"
                  class="text-2xl text-white/20"
                />
              </div>
              <input
                v-model="url"
                type="text"
                placeholder="Paste your TikTok or Instagram link here..."
                class="bg-transparent w-full py-5 text-white outline-none placeholder:text-white/20 font-medium text-lg"
              />
              <button
                type="submit"
                class="brand-gradient hover:scale-[1.02] active:scale-95 transition-all text-white px-12 py-5 rounded-xl font-black uppercase text-sm tracking-widest shadow-xl shadow-pink-500/20"
              >
                Download
              </button>
            </form>
          </div>

          <div class="mt-8 flex justify-center gap-10 opacity-40">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <iconify-icon icon="lucide:video" />
              Videos
            </div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <iconify-icon icon="lucide:image" />
              Images
            </div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <iconify-icon icon="lucide:music" />
              Audio
            </div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <iconify-icon icon="lucide:smartphone" />
              Stories
            </div>
          </div>
        </div>
      </div>

      <!-- Service Cards -->
      <div class="grid lg:grid-cols-2 gap-10">
        <NuxtLink
          to="/tiktok"
          class="group relative overflow-hidden rounded-[3rem] glass-card p-12 transition-all hover:border-white/20 block"
        >
          <div
            class="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FF3D57] rounded-full blur-[100px] opacity-5 group-hover:opacity-20 transition-opacity"
          ></div>
          <div class="flex justify-between items-start mb-12">
            <div
              class="w-16 h-16 bg-[#FF3D57]/10 rounded-2xl flex items-center justify-center"
            >
              <iconify-icon icon="logos:tiktok-icon" class="text-4xl" />
            </div>
            <div class="text-right">
              <span
                class="text-[10px] font-black uppercase tracking-widest text-[#FF3D57]"
                >TikTok Service</span
              >
              <h3 class="text-3xl font-black mt-1 font-heading">
                Video & Music
              </h3>
            </div>
          </div>
          <ul class="space-y-6 mb-12">
            <li class="flex items-center gap-4 text-white/60 font-medium">
              <iconify-icon
                icon="lucide:check-circle-2"
                class="text-[#FF3D57] shrink-0"
              />
              Download without Watermark
            </li>
            <li class="flex items-center gap-4 text-white/60 font-medium">
              <iconify-icon
                icon="lucide:check-circle-2"
                class="text-[#FF3D57] shrink-0"
              />
              HD Original Quality MP4
            </li>
            <li class="flex items-center gap-4 text-white/60 font-medium">
              <iconify-icon
                icon="lucide:check-circle-2"
                class="text-[#FF3D57] shrink-0"
              />
              Extract MP3 Audio Tracks
            </li>
          </ul>
          <span
            class="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:gap-5 transition-all"
          >
            Try TikTok Downloader
            <iconify-icon icon="lucide:arrow-right" />
          </span>
        </NuxtLink>

        <NuxtLink
          to="/instagram"
          class="group relative overflow-hidden rounded-[3rem] glass-card p-12 transition-all hover:border-white/20 block"
        >
          <div
            class="absolute -bottom-10 -right-10 w-64 h-64 bg-[#bc1888] rounded-full blur-[100px] opacity-5 group-hover:opacity-20 transition-opacity"
          ></div>
          <div class="flex justify-between items-start mb-12">
            <div
              class="w-16 h-16 bg-[#bc1888]/10 rounded-2xl flex items-center justify-center"
            >
              <iconify-icon icon="logos:instagram-icon" class="text-4xl" />
            </div>
            <div class="text-right">
              <span
                class="text-[10px] font-black uppercase tracking-widest text-[#bc1888]"
                >Instagram Service</span
              >
              <h3 class="text-3xl font-black mt-1 font-heading">
                Reels & Posts
              </h3>
            </div>
          </div>
          <ul class="space-y-6 mb-12">
            <li class="flex items-center gap-4 text-white/60 font-medium">
              <iconify-icon
                icon="lucide:check-circle-2"
                class="text-[#bc1888] shrink-0"
              />
              Save Reels, Posts & Stories
            </li>
            <li class="flex items-center gap-4 text-white/60 font-medium">
              <iconify-icon
                icon="lucide:check-circle-2"
                class="text-[#bc1888] shrink-0"
              />
              Carousel Photo Downloads
            </li>
            <li class="flex items-center gap-4 text-white/60 font-medium">
              <iconify-icon
                icon="lucide:check-circle-2"
                class="text-[#bc1888] shrink-0"
              />
              Profile Picture HD Viewer
            </li>
          </ul>
          <span
            class="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:gap-5 transition-all"
          >
            Try Insta Downloader
            <iconify-icon icon="lucide:arrow-right" />
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-[#070812] py-32 border-y border-white/5">
      <div class="max-w-[1440px] mx-auto px-8 md:px-20 text-center">
        <h2
          class="text-4xl md:text-5xl font-black mb-20 uppercase tracking-tight italic font-heading"
        >
          Built for <span class="text-brand-gradient">Efficiency</span>
        </h2>
        <div class="grid md:grid-cols-3 gap-16">
          <div class="space-y-6">
            <div
              class="w-20 h-20 glass-card rounded-3xl flex items-center justify-center mx-auto mb-8 floating"
            >
              <iconify-icon
                icon="lucide:zap"
                class="text-4xl text-brand-gradient"
              />
            </div>
            <h4 class="text-xl font-black uppercase italic font-heading">
              Zero Latency
            </h4>
            <p class="text-white/40 text-sm leading-relaxed">
              Our multi-threaded engines pull media in milliseconds, direct from
              source servers to your device.
            </p>
          </div>
          <div class="space-y-6">
            <div
              class="w-20 h-20 glass-card rounded-3xl flex items-center justify-center mx-auto mb-8 floating"
              style="animation-delay: -1.5s"
            >
              <iconify-icon
                icon="lucide:shield-check"
                class="text-4xl text-brand-gradient"
              />
            </div>
            <h4 class="text-xl font-black uppercase italic font-heading">
              Total Privacy
            </h4>
            <p class="text-white/40 text-sm leading-relaxed">
              No tracking, no logs, and no hidden scripts. Your downloads remain
              private and completely secure.
            </p>
          </div>
          <div class="space-y-6">
            <div
              class="w-20 h-20 glass-card rounded-3xl flex items-center justify-center mx-auto mb-8 floating"
              style="animation-delay: -3s"
            >
              <iconify-icon
                icon="lucide:smartphone"
                class="text-4xl text-brand-gradient"
              />
            </div>
            <h4 class="text-xl font-black uppercase italic font-heading">
              Any Device
            </h4>
            <p class="text-white/40 text-sm leading-relaxed">
              Fully responsive web interface optimized for iOS, Android, macOS,
              and Windows browsers.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const activeTab = ref<'tiktok' | 'instagram'>('tiktok');
const url = ref('');

function handleDownload() {
  if (!url.value.trim()) return;
  navigateTo(activeTab.value === 'tiktok' ? '/tiktok' : '/instagram', {
    query: { url: url.value },
  });
}
</script>
