<template>
  <section class="relative overflow-hidden">
    <div
      class="absolute top-20 left-10 text-[18rem] font-heading font-black text-outline uppercase select-none pointer-events-none hidden xl:block leading-none"
    >
      DOWNLOADER
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center pt-12 pb-16">
        <div class="order-2 lg:order-1">
          <div class="mb-6 inline-flex items-center gap-3">
            <div class="w-12 h-[2px] bg-[#E4405F]" />
            <span
              class="uppercase tracking-[0.4em] text-xs font-heading font-black text-[#E4405F]"
              >Instagram</span
            >
          </div>

          <h1 class="font-heading text-5xl md:text-7xl font-black leading-[0.9] mb-8">
            Instagram <br />
            <span class="text-[#E4405F]">Downloader</span>
          </h1>

          <p class="text-white/50 text-lg max-w-lg mb-12">
            Download Reels, posts, and carousels. Paste any public Instagram
            link and get your file in seconds.
          </p>

          <div id="download-input" class="relative max-w-2xl mb-12">
            <div
              class="bg-[#1A1A1A] p-3 rounded-full flex items-center border border-white/5 shadow-2xl shadow-black/40 focus-within:border-[#E4405F]/50 transition-all"
            >
              <div class="pl-6 pr-4">
                <iconify-icon icon="lucide:link-2" class="text-xl text-white/30" />
              </div>
              <input
                v-model="videoUrl"
                type="text"
                placeholder="Insert Instagram Post / Reel Link Here..."
                class="bg-transparent flex-1 py-4 text-white outline-none placeholder:text-white/20 font-medium"
              />
              <button
                type="button"
                class="bg-[#E4405F] hover:bg-[#E4405F]/90 hover:scale-105 active:scale-95 transition-all text-white px-10 py-4 rounded-full font-heading font-black uppercase text-sm tracking-widest shadow-lg shadow-[#E4405F]/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                :disabled="downloadLoading"
                @click="onSearch"
              >
                {{ downloadLoading ? "..." : "Download" }}
              </button>
            </div>
            <p v-if="downloadError" class="mt-3 text-sm text-red-400">
              {{ downloadError }}
            </p>
          </div>

          <div class="flex items-center gap-8">
            <span
              class="text-xs uppercase font-heading font-black text-white/30 tracking-widest"
              >Supported :</span
            >
            <div class="flex gap-6">
              <iconify-icon
                icon="lucide:monitor"
                class="text-xl text-white/50 hover:text-white cursor-pointer transition-colors"
              />
              <iconify-icon
                icon="lucide:smartphone"
                class="text-xl text-white/50 hover:text-white cursor-pointer transition-colors"
              />
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 relative flex justify-center lg:justify-end">
          <div
            class="w-full max-w-[400px] aspect-4/5 bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center"
          >
            <iconify-icon
              icon="mdi:instagram"
              class="text-[120px] text-[#E4405F]/30"
            />
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="relative mt-12 w-full">
        <div
          v-if="videoInfo"
          class="absolute top-20 left-4 text-[12rem] xl:text-[18rem] font-heading font-black text-outline uppercase select-none pointer-events-none hidden xl:block leading-none"
        >
          SUCCESS
        </div>

        <div
          v-if="downloadLoading"
          class="relative z-10 results-enter flex justify-center items-center py-24"
        >
          <div class="flex flex-col items-center gap-4">
            <div
              class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center"
            >
              <span
                class="w-8 h-8 border-2 border-white/80 border-t-transparent rounded-full animate-spin"
              />
            </div>
            <span class="text-white font-medium">Memuat...</span>
            <span class="text-sm text-white/50">Mengambil data post</span>
          </div>
        </div>

        <template v-else-if="videoInfo">
          <div class="relative z-10 mb-10 results-enter">
            <div
              class="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4 max-w-2xl"
            >
              <div
                class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
              >
                <iconify-icon icon="lucide:check-circle" class="text-white text-xl" />
              </div>
              <div>
                <p
                  class="font-heading font-black text-sm uppercase tracking-wider text-emerald-400"
                >
                  Ready for Download
                </p>
                <p class="text-white/60 text-xs">
                  Your Instagram post/reel has been processed and is ready for saving.
                </p>
              </div>
            </div>
          </div>

          <div
            class="relative z-10 grid lg:grid-cols-12 gap-12 items-start results-enter"
          >
            <div class="lg:col-span-4 group">
              <div
                class="relative aspect-9/16 bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:scale-[1.01]"
              >
                <template v-if="videoInfo.images && videoInfo.images.length > 0">
                  <img
                    :src="videoInfo.images[imageIndex]"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-if="videoInfo.images.length > 1"
                    class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                  >
                    <button
                      v-for="(_, i) in videoInfo.images"
                      :key="i"
                      type="button"
                      class="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                      :class="
                        imageIndex === i
                          ? 'bg-white text-black'
                          : 'bg-white/30 text-white/80'
                      "
                      @click.stop="imageIndex = i"
                    >
                      {{ Number(i) + 1 }}
                    </button>
                  </div>
                  <button
                    v-if="videoInfo.images.length > 1"
                    type="button"
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 flex items-center justify-center text-white z-10 transition-all hover:scale-110"
                    :disabled="imageIndex === 0"
                    @click.stop="imageIndex = Math.max(0, imageIndex - 1)"
                  >
                    <iconify-icon icon="lucide:chevron-left" class="text-xl" />
                  </button>
                  <button
                    v-if="videoInfo.images.length > 1"
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 flex items-center justify-center text-white z-10 transition-all hover:scale-110"
                    :disabled="imageIndex >= videoInfo.images.length - 1"
                    @click.stop="
                      imageIndex = Math.min(
                        videoInfo.images.length - 1,
                        imageIndex + 1
                      )
                    "
                  >
                    <iconify-icon icon="lucide:chevron-right" class="text-xl" />
                  </button>
                </template>
                <template v-else>
                  <video
                    v-if="
                      (videoInfo.previewVideoUrl || videoInfo.videoUrl) &&
                      !videoLoadFailed
                    "
                    :src="videoInfo.previewVideoUrl || videoInfo.videoUrl"
                    :poster="videoInfo.cover || undefined"
                    class="w-full h-full object-cover"
                    controls
                    muted
                    loop
                    playsinline
                    preload="metadata"
                    @error="videoLoadFailed = true"
                  />
                  <img
                    v-else-if="videoInfo.cover"
                    :src="videoInfo.cover"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center bg-neutral-800"
                  >
                    <iconify-icon icon="lucide:image" class="text-white/20 text-5xl" />
                  </div>
                </template>
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 pointer-events-none"
                >
                  <div
                    class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4"
                  >
                    <iconify-icon icon="lucide:play" class="text-white text-2xl ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-8 space-y-10">
              <div>
                <div class="inline-flex items-center gap-3 mb-6">
                  <div class="w-12 h-[2px] bg-[#E4405F]" />
                  <span
                    class="uppercase tracking-[0.4em] text-xs font-heading font-black text-[#E4405F]"
                    >Instagram Result</span
                  >
                </div>
                <h1
                  class="font-heading text-4xl md:text-5xl font-black leading-tight mb-4"
                >
                  <template
                    v-if="
                      (videoInfo.text || 'Instagram Post').split(' ').length > 1
                    "
                  >
                    <span class="text-white">{{
                      (videoInfo.text || 'Instagram Post')
                        .split(' ')
                        .slice(0, -1)
                        .join(' ')
                    }}</span>
                    <span class="text-[#E4405F]">{{
                      (videoInfo.text || 'Instagram Post').split(' ').slice(-1)[0]
                    }}</span>
                  </template>
                  <span v-else class="text-[#E4405F]">{{
                    videoInfo.text || 'Instagram Post'
                  }}</span>
                </h1>
                <div
                  class="flex flex-wrap items-center gap-6 text-white/50 text-sm font-medium"
                >
                  <div v-if="videoInfo.author" class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center"
                    >
                      <iconify-icon icon="lucide:user" class="text-white/60" />
                    </div>
                    <span class="text-white font-bold">{{
                      videoInfo.author.startsWith('@')
                        ? videoInfo.author
                        : `@${videoInfo.author}`
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-if="
                    videoInfo.videoUrl &&
                    (!videoInfo.images || videoInfo.images.length === 0)
                  "
                  class="space-y-3"
                >
                  <button
                    type="button"
                    class="w-full flex items-center justify-between bg-[#E4405F] hover:bg-[#E4405F]/90 text-white p-6 rounded-3xl hover:shadow-[0_0_40px_rgba(228,64,95,0.3)] transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="downloadVideoLoading"
                    @click="onDownloadVideo"
                  >
                    <div class="flex flex-col">
                      <span
                        class="font-heading font-black text-xl uppercase italic"
                      >
                        {{
                          downloadVideoLoading
                            ? 'Memproses...'
                            : 'Download Video'
                        }}
                      </span>
                      <span
                        class="text-white/70 text-xs font-bold uppercase tracking-widest mt-1"
                        >Format: MP4</span
                      >
                    </div>
                    <div
                      class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                    >
                      <iconify-icon icon="lucide:download" class="text-2xl" />
                    </div>
                  </button>
                  <p
                    class="text-center text-[10px] text-white/30 uppercase font-black tracking-widest"
                  >
                    Reel / video
                  </p>
                </div>

                <div
                  v-if="videoInfo.images && videoInfo.images.length > 0"
                  class="space-y-3"
                >
                  <button
                    type="button"
                    class="w-full flex items-center justify-between glass-panel text-white p-6 rounded-3xl hover:bg-white/10 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="downloadImagesLoading"
                    @click="onDownloadImages"
                  >
                    <div class="flex flex-col">
                      <span
                        class="font-heading font-black text-xl uppercase italic"
                      >
                        {{
                          downloadImagesLoading
                            ? 'Memproses...'
                            : 'Download Image'
                        }}
                      </span>
                      <span
                        class="text-white/70 text-xs font-bold uppercase tracking-widest mt-1"
                      >
                        {{
                          videoInfo.images!.length > 1
                            ? `${imageIndex + 1} of ${videoInfo.images!.length}`
                            : 'JPG/WEBP'
                        }}
                      </span>
                    </div>
                    <div
                      class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                    >
                      <iconify-icon icon="lucide:image" class="text-2xl" />
                    </div>
                  </button>
                  <p
                    class="text-center text-[10px] text-white/30 uppercase font-black tracking-widest"
                  >
                    Foto / carousel
                  </p>
                </div>
              </div>

              <div
                v-if="
                  videoInfo.videoUrl && videoInfo.images?.length
                "
                class="pt-8 border-t border-white/5"
              >
                <div class="flex items-center gap-4 mb-6">
                  <h3
                    class="text-sm font-heading font-black uppercase tracking-widest text-white/40"
                  >
                    More Options
                  </h3>
                  <div class="flex-1 h-px bg-white/5" />
                </div>
                <div class="flex flex-wrap gap-4">
                  <button
                    v-if="videoInfo.images && videoInfo.images.length > 0"
                    type="button"
                    class="px-6 py-4 glass-panel rounded-2xl flex items-center gap-3 hover:border-[#E4405F]/30 transition-all disabled:opacity-60"
                    :disabled="downloadImagesLoading"
                    @click="onDownloadImages"
                  >
                    <iconify-icon icon="lucide:image" class="text-[#E4405F]" />
                    <span class="text-sm font-bold">Download Image</span>
                  </button>
                  <button
                    v-if="videoInfo.videoUrl"
                    type="button"
                    class="px-6 py-4 glass-panel rounded-2xl flex items-center gap-3 hover:border-[#E4405F]/30 transition-all disabled:opacity-60"
                    :disabled="downloadVideoLoading"
                    @click="onDownloadVideo"
                  >
                    <iconify-icon icon="lucide:download" class="text-[#E4405F]" />
                    <span class="text-sm font-bold">Download Video</span>
                  </button>
                </div>
              </div>

              <div class="pt-4">
                <button
                  type="button"
                  class="inline-flex items-center gap-3 text-[#E4405F] font-heading font-black uppercase text-sm tracking-widest hover:translate-x-2 transition-transform"
                  @click="onDownloadAnother"
                >
                  <iconify-icon icon="lucide:arrow-left" class="text-lg" />
                  Download Another
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- Recent History -->
  <section
    class="container mx-auto px-6 py-10 md:py-24 border-t border-white/5"
  >
    <div class="flex items-center justify-between mb-12 flex-wrap gap-4">
      <div>
        <h2
          class="font-heading text-3xl md:text-4xl font-black uppercase italic"
        >
          Recent <span class="text-[#E4405F]">History</span>
        </h2>
        <p class="text-white/30 text-sm mt-2">
          Your lately processed Instagram downloads
        </p>
      </div>
      <button
        type="button"
        class="text-[#E4405F] font-heading font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
        @click="clearHistory"
      >
        Clear History
      </button>
    </div>
    <Empty
      v-if="historyItems.length === 0"
      class="border-white/5 py-4 md:py-16 text-white/30 flex flex-col text-center items-center justify-center gap-4"
    >
      <EmptyHeader>
        <iconify-icon icon="lucide:history" class="text-4xl text-[#E4405F]" />
      </EmptyHeader>
      <EmptyContent>
        Belum ada riwayat. Isi link Instagram lalu klik Download untuk menambah.
      </EmptyContent>
    </Empty>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        v-for="item in historyItems"
        :key="item.id"
        class="group relative glass-panel rounded-2xl overflow-hidden hover:border-[#E4405F]/50 transition-all"
      >
        <div class="aspect-square bg-neutral-900">
          <img
            v-if="item.cover"
            :src="item.cover"
            :alt="item.title"
            class="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-neutral-800"
          >
            <iconify-icon icon="lucide:image" class="text-white/20 text-4xl" />
          </div>
        </div>
        <div class="p-4">
          <p
            class="text-[10px] font-heading font-black uppercase tracking-tighter text-[#E4405F]"
          >
            {{ item.type }}
          </p>
          <p class="text-xs font-bold truncate mt-1">{{ item.title }}</p>
        </div>
        <button
          type="button"
          class="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-[#E4405F] transition-all opacity-0 group-hover:opacity-100"
          title="Buka & download lagi"
          @click="openHistoryItem(item)"
        >
          <iconify-icon icon="lucide:download" class="text-white text-xs" />
        </button>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section
    id="faq"
    class="container mx-auto px-6 py-10 md:py-24 border-t border-white/5"
  >
    <div class="flex flex-col items-center mb-16">
      <h2
        class="font-heading text-3xl md:text-4xl font-black uppercase text-center"
      >
        General <span class="text-[#E4405F]">Questions</span>
      </h2>
    </div>
    <div class="max-w-3xl mx-auto space-y-4">
      <div
        v-for="(item, index) in getFaqItemsInstagram()"
        :key="index"
        class="glass-panel rounded-2xl p-6 hover:border-white/20 transition-all group"
      >
        <div class="flex items-center justify-between">
          <h4 class="font-heading font-black uppercase tracking-tight">
            {{ item.question }}
          </h4>
          <iconify-icon
            icon="lucide:plus"
            class="text-[#E4405F] group-hover:rotate-45 transition-transform shrink-0"
          />
        </div>
        <p class="mt-4 text-white/40 text-sm leading-relaxed">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </section>

  <!-- Why Instagram Downloader -->
  <section
    class="container mx-auto px-6 py-10 md:py-24 border-t border-white/5"
  >
    <div class="flex flex-col md:flex-row gap-20 items-center">
      <div class="w-full md:w-1/2 relative">
        <div
          class="aspect-video glass-panel rounded-3xl p-12 flex flex-col justify-center items-center overflow-hidden relative"
        >
          <div
            class="absolute -top-20 -left-20 w-64 h-64 bg-[#E4405F] rounded-full blur-[120px] opacity-20"
          />
          <h3
            class="text-white/30 text-8xl font-heading font-black absolute inset-0 flex items-center justify-center opacity-10"
          >
            INSTAGRAM
          </h3>
          <div
            class="w-24 h-24 bg-[#E4405F] rounded-full flex items-center justify-center mb-6 relative z-10"
          >
            <iconify-icon icon="mdi:instagram" class="text-white text-4xl" />
          </div>
          <h5
            class="font-heading text-2xl font-black uppercase italic tracking-tighter"
          >
            Free <span class="text-[#E4405F]">Instagram</span> Downloader
          </h5>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <h2
          class="font-heading text-4xl md:text-5xl font-black uppercase leading-tight mb-8"
        >
          Why Use This <br />
          <span class="text-[#E4405F]">Instagram Downloader?</span>
        </h2>
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="w-6 h-6 rounded-full bg-[#E4405F] shrink-0 mt-1" />
            <p class="text-white/60">
              <span class="text-white font-bold">Reels & Posts:</span> Download
              public Reels and posts in original quality. No login required.
            </p>
          </div>
          <div class="flex gap-4">
            <div class="w-6 h-6 rounded-full bg-[#E4405F] shrink-0 mt-1" />
            <p class="text-white/60">
              <span class="text-white font-bold">Carousel Support:</span> Save
              each photo from multi-image posts individually.
            </p>
          </div>
          <div class="flex gap-4">
            <div class="w-6 h-6 rounded-full bg-[#E4405F] shrink-0 mt-1" />
            <p class="text-white/60">
              <span class="text-white font-bold">Simple:</span> Paste the link,
              click Download, and get your file in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  useStateInstagram,
  getFaqItemsInstagram,
} from "~/services/useStateInstagram";

const {
  videoUrl,
  downloadLoading,
  downloadError,
  downloadVideoLoading,
  downloadImagesLoading,
  videoLoadFailed,
  videoInfo,
  imageIndex,
  historyItems,
  clearHistory,
  openHistoryItem,
  onSearch,
  onDownloadVideo,
  onDownloadImages,
  onDownloadAnother,
} = useStateInstagram();
</script>
