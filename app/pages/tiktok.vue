<template>
  <!-- Main Content -->
  <section class="relative overflow-hidden">
    <!-- Background Decorative Text -->
    <div
      class="absolute top-20 left-10 text-[18rem] font-heading font-black text-outline uppercase select-none pointer-events-none hidden xl:block leading-none"
    >
      DOWNLOADER
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Hero: Grid Layout -->
      <div class="grid lg:grid-cols-2 gap-12 items-center pt-12 pb-16">
        <!-- Left: Content & Input -->
        <div class="order-2 lg:order-1">
          <div class="mb-6 inline-flex items-center gap-3">
            <div class="w-12 h-[2px] bg-[#FF3D57]" />
            <span
              class="uppercase tracking-[0.4em] text-xs font-heading font-black text-[#FF3D57]"
              >Be Different</span
            >
          </div>

          <h1
            class="font-heading text-5xl md:text-7xl font-black leading-[0.9] mb-8"
          >
            Online Video <br />
            <span class="text-[#FF3D57]">Downloader</span>
          </h1>

          <p class="text-white/50 text-lg max-w-lg mb-12">
            Do Not Look Below! Explore Our
            <span class="text-white font-bold">VideoMAX</span> Video Downloader,
            A Free Solution To Quickly Download Videos Or Music With Just One
            Click!
          </p>

          <!-- Input Group -->
          <div id="download-input" class="relative max-w-2xl mb-12">
            <div
              class="bg-[#1A1A1A] p-3 rounded-full flex items-center border border-white/5 shadow-2xl shadow-black/40 focus-within:border-[#FF3D57]/50 transition-all"
            >
              <div class="pl-6 pr-4">
                <iconify-icon
                  icon="lucide:link-2"
                  class="text-xl text-white/30"
                />
              </div>
              <input
                v-model="videoUrl"
                type="text"
                placeholder="Insert TikTok Video Link Here..."
                class="bg-transparent flex-1 py-4 text-white outline-none placeholder:text-white/20 font-medium"
              />
              <button
                type="button"
                class="bg-gradient-coral hover:scale-105 active:scale-95 transition-all text-white px-10 py-4 rounded-full font-heading font-black uppercase text-sm tracking-widest shadow-lg shadow-[#FF3D57]/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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

          <!-- Supported Platforms -->
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
              <iconify-icon
                icon="lucide:tablet"
                class="text-xl text-white/50 hover:text-white cursor-pointer transition-colors"
              />
              <iconify-icon
                icon="lucide:laptop"
                class="text-xl text-white/50 hover:text-white cursor-pointer transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Right: Device Mockup -->
        <div class="order-1 lg:order-2 relative">
          <div
            class="absolute -top-10 -right-10 w-full h-full pointer-events-none opacity-20"
          >
            <svg viewBox="0 0 400 400" class="w-full h-full text-[#FF3D57]">
              <path
                d="M10,200 Q100,100 200,200 T390,200"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="wavy-line"
              />
              <path
                d="M10,250 Q100,150 200,250 T390,250"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                class="wavy-line"
                style="animation-delay: -1s"
              />
            </svg>
          </div>

          <div class="relative z-10 flex justify-center lg:justify-end">
            <div
              class="w-full max-w-[500px] h-[350px] bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div class="h-8 bg-[#252525] flex items-center px-4 gap-2">
                <div class="w-2 h-2 rounded-full bg-[#FF3D57]" />
                <div class="w-2 h-2 rounded-full bg-white/10" />
                <div class="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div class="p-8">
                <div class="w-2/3 h-4 bg-white/5 rounded mb-4" />
                <div class="w-full h-12 bg-white/5 rounded-full mb-8" />
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="h-32 bg-[#FF3D57]/10 rounded-xl border border-[#FF3D57]/20"
                  />
                  <div
                    class="h-32 bg-white/5 rounded-xl border border-white/5"
                  />
                </div>
              </div>

              <div
                class="absolute -bottom-10 -left-10 w-[180px] h-[360px] bg-black rounded-[3rem] border-4 border-[#252525] overflow-hidden shadow-2xl hidden md:block"
              >
                <div class="absolute top-0 w-full h-6 bg-[#252525]" />
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400"
                  alt=""
                  class="w-full h-full object-cover opacity-60"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black to-transparent flex flex-col justify-end p-6"
                >
                  <div
                    class="w-full h-10 bg-gradient-coral rounded-lg flex items-center justify-center mb-4"
                  >
                    <span
                      class="text-[10px] font-heading font-black uppercase tracking-widest"
                      >Download Now</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute -top-4 right-10 floating-emoji">
            <iconify-icon icon="noto:sparkles" class="text-4xl" />
          </div>
          <div
            class="absolute bottom-20 left-0 floating-emoji"
            style="animation-delay: -1.5s"
          >
            <iconify-icon icon="noto:fire" class="text-5xl" />
          </div>
        </div>
      </div>

      <!-- Results: VideoMax-style layout -->
      <div class="relative mt-12 w-full">
        <!-- Decorative Background Text (VideoMax) -->
        <div
          v-if="videoInfo"
          class="absolute top-20 left-4 text-[12rem] xl:text-[18rem] font-heading font-black text-outline uppercase select-none pointer-events-none hidden xl:block leading-none"
        >
          SUCCESS
        </div>
        <!-- Loading state -->
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
            <span class="text-sm text-white/50">Mengambil data video</span>
          </div>
        </div>

        <!-- Success: VideoMax layout -->
        <template v-else-if="videoInfo">
          <!-- Success Message Banner -->
          <div class="relative z-10 mb-10 results-enter">
            <div
              class="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4 max-w-2xl"
            >
              <div
                class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
              >
                <iconify-icon
                  icon="lucide:check-circle"
                  class="text-white text-xl"
                />
              </div>
              <div>
                <p
                  class="font-heading font-black text-sm uppercase tracking-wider text-emerald-400"
                >
                  Ready for Download
                </p>
                <p class="text-white/60 text-xs">
                  Your TikTok video has been successfully processed and is ready
                  for saving.
                </p>
              </div>
            </div>
          </div>

          <!-- Result Grid -->
          <div
            class="relative z-10 grid lg:grid-cols-12 gap-12 items-start results-enter"
          >
            <!-- Thumbnail Preview -->
            <div class="lg:col-span-4 group">
              <div
                class="relative aspect-9/16 bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:scale-[1.01]"
              >
                <template
                  v-if="videoInfo.images && videoInfo.images.length > 0"
                >
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
                      type="button"
                      class="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                      :class="
                        imageIndex === i
                          ? 'bg-white text-black'
                          : 'bg-white/30 text-white/80'
                      "
                      v-for="(_, i) in videoInfo.images"
                      :key="i"
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
                        imageIndex + 1,
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
                  <img
                    v-else
                    src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=800"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                </template>
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 pointer-events-none"
                >
                  <div
                    class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4"
                  >
                    <iconify-icon
                      icon="lucide:play"
                      class="text-white text-2xl ml-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Video Details & Actions -->
            <div class="lg:col-span-8 space-y-10">
              <!-- Creator Info -->
              <div>
                <div class="inline-flex items-center gap-3 mb-6">
                  <div class="w-12 h-[2px] bg-[#FF3D57]" />
                  <span
                    class="uppercase tracking-[0.4em] text-xs font-heading font-black text-[#FF3D57]"
                    >TikTok Result</span
                  >
                </div>
                <h1
                  class="font-heading text-4xl md:text-5xl font-black leading-tight mb-4"
                >
                  <template
                    v-if="
                      (videoInfo.text || 'TikTok Video').split(' ').length > 1
                    "
                  >
                    <span class="text-white"
                      >{{
                        (videoInfo.text || "TikTok Video")
                          .split(" ")
                          .slice(0, -1)
                          .join(" ")
                      }}
                    </span>
                    <span class="text-[#FF3D57]">{{
                      (videoInfo.text || "TikTok Video").split(" ").slice(-1)[0]
                    }}</span>
                  </template>
                  <span v-else class="text-[#FF3D57]">{{
                    videoInfo.text || "TikTok Video"
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
                      videoInfo.author.startsWith("@")
                        ? videoInfo.author
                        : `@${videoInfo.author}`
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Download Buttons Group: Video, Image, Audio CTAs -->
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- CTA: Video (sembunyikan jika konten gambar/slideshow) -->
                <div
                  v-if="
                    videoInfo.videoUrl &&
                    (!videoInfo.images || videoInfo.images.length === 0)
                  "
                  class="space-y-3"
                >
                  <button
                    type="button"
                    class="w-full flex items-center justify-between bg-gradient-coral text-white p-6 rounded-3xl hover:shadow-[0_0_40px_rgba(255,61,87,0.3)] transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="downloadVideoLoading"
                    @click="onDownloadVideo"
                  >
                    <div class="flex flex-col">
                      <span
                        class="font-heading font-black text-xl uppercase italic"
                        >{{
                          downloadVideoLoading
                            ? "Memproses..."
                            : "Download Video"
                        }}</span
                      >
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
                    Tanpa watermark
                  </p>
                </div>

                <!-- CTA: Image (slideshow) -->
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
                        >{{
                          downloadImagesLoading
                            ? "Memproses..."
                            : "Download Image"
                        }}</span
                      >
                      <span
                        class="text-white/70 text-xs font-bold uppercase tracking-widest mt-1"
                      >
                        {{
                          videoInfo.images!.length > 1
                            ? `Format: ${imageIndex + 1} of ${videoInfo.images!.length}`
                            : "Format: JPG/WEBP"
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
                    Ekstrak gambar
                  </p>
                </div>

                <!-- CTA: Audio (MP3) -->
                <div v-if="videoInfo.audioUrl" class="space-y-3">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between glass-panel text-white p-6 rounded-3xl hover:bg-white/10 hover:border-[#FF3D57]/30 transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="downloadMp3Loading"
                    @click="onDownloadMp3"
                  >
                    <div class="flex flex-col">
                      <span
                        class="font-heading font-black text-xl uppercase italic"
                        >{{
                          downloadMp3Loading ? "Memproses..." : "Download Audio"
                        }}</span
                      >
                      <span
                        class="text-white/70 text-xs font-bold uppercase tracking-widest mt-1"
                        >Format: MP3</span
                      >
                    </div>
                    <div
                      class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                    >
                      <iconify-icon icon="lucide:music" class="text-2xl" />
                    </div>
                  </button>
                  <p
                    class="text-center text-[10px] text-white/30 uppercase font-black tracking-widest"
                  >
                    Ekstrak audio saja
                  </p>
                </div>
              </div>

              <!-- More Options -->
              <div
                v-if="
                  (videoInfo.audioUrl && videoInfo.images?.length) ||
                  (videoInfo.videoUrl && videoInfo.audioUrl) ||
                  (videoInfo.videoUrl && videoInfo.images?.length)
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
                    v-if="videoInfo.audioUrl"
                    type="button"
                    class="px-6 py-4 glass-panel rounded-2xl flex items-center gap-3 hover:border-[#FF3D57]/30 transition-all disabled:opacity-60"
                    :disabled="downloadMp3Loading"
                    @click="onDownloadMp3"
                  >
                    <iconify-icon icon="lucide:music" class="text-[#FF3D57]" />
                    <span class="text-sm font-bold">Audio Only (MP3)</span>
                  </button>
                  <button
                    v-if="videoInfo.images && videoInfo.images.length > 0"
                    type="button"
                    class="px-6 py-4 glass-panel rounded-2xl flex items-center gap-3 hover:border-[#FF3D57]/30 transition-all disabled:opacity-60"
                    :disabled="downloadImagesLoading"
                    @click="onDownloadImages"
                  >
                    <iconify-icon icon="lucide:image" class="text-[#FF3D57]" />
                    <span class="text-sm font-bold">Download Image</span>
                  </button>
                  <button
                    v-if="
                      videoInfo.videoUrl &&
                      (!videoInfo.images || videoInfo.images.length === 0)
                    "
                    type="button"
                    class="px-6 py-4 glass-panel rounded-2xl flex items-center gap-3 hover:border-[#FF3D57]/30 transition-all disabled:opacity-60"
                    :disabled="downloadVideoLoading"
                    @click="onDownloadVideo"
                  >
                    <iconify-icon
                      icon="lucide:shield-check"
                      class="text-[#FF3D57]"
                    />
                    <span class="text-sm font-bold">HD No Watermark</span>
                  </button>
                </div>
              </div>

              <!-- Download Another -->
              <div class="pt-4">
                <button
                  type="button"
                  class="inline-flex items-center gap-3 text-[#FF3D57] font-heading font-black uppercase text-sm tracking-widest hover:translate-x-2 transition-transform"
                  @click="onDownloadAnother"
                >
                  <iconify-icon icon="lucide:arrow-left" class="text-lg" />
                  Download Another Video
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>

  <!-- Download History Section -->
  <section
    class="container mx-auto px-6 py-10 md:py-24 border-t border-white/5"
  >
    <div class="flex items-center justify-between mb-12 flex-wrap gap-4">
      <div>
        <h2
          class="font-heading text-3xl md:text-4xl font-black uppercase italic"
        >
          Recent <span class="text-[#FF3D57]">History</span>
        </h2>
        <p class="text-white/30 text-sm mt-2">
          Your lately processed downloads
        </p>
      </div>
      <div class="flex gap-4">
        <button
          type="button"
          class="text-white/50 font-heading font-black uppercase text-xs tracking-widest hover:text-white transition-colors flex items-center gap-1"
        >
          View All
          <iconify-icon icon="lucide:arrow-right" class="text-[10px]" />
        </button>
        <button
          type="button"
          class="text-[#FF3D57] font-heading font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
          @click="clearHistory"
        >
          Clear History
        </button>
      </div>
    </div>
    <!-- Skeleton saat history belum di-load dari localStorage (hindari flash "tidak ada history") -->
    <div
      v-if="!historyReady"
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <div
        v-for="i in 5"
        :key="i"
        class="glass-panel rounded-2xl overflow-hidden animate-pulse"
      >
        <div class="aspect-4/5 bg-white/5" />
        <div class="p-4 space-y-2">
          <div class="h-3 w-16 bg-white/10 rounded" />
          <div class="h-4 w-full bg-white/10 rounded" />
        </div>
      </div>
    </div>
    <Empty
      v-else-if="!historyItems?.length"
      class="border-white/5 py-4 md:py-16 text-white/30 flex flex-col text-center items-center justify-center gap-4"
    >
      <EmptyHeader>
        <iconify-icon icon="lucide:history" class="text-4xl text-[#FF3D57]" />
      </EmptyHeader>
      <EmptyContent>
        Belum ada riwayat. Isi link TikTok lalu klik Download untuk menambah.
      </EmptyContent>
    </Empty>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        v-for="item in historyItems ?? []"
        :key="item.id"
        class="group relative glass-panel rounded-2xl overflow-hidden hover:border-[#FF3D57]/50 transition-all"
      >
        <div class="aspect-4/5 bg-neutral-900 relative">
          <img
            v-if="item.cover"
            :src="item.cover"
            :alt="item.title"
            class="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
            @error="
              (e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const pl = img.nextElementSibling as HTMLElement;
                if (pl) {
                  pl.classList.remove('hidden');
                  pl.style.display = 'flex';
                }
              }
            "
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-neutral-800"
            :class="{ hidden: !!item.cover }"
            aria-hidden="true"
          >
            <iconify-icon icon="lucide:video" class="text-white/20 text-4xl" />
          </div>
        </div>
        <div class="p-4">
          <p
            class="text-[10px] font-heading font-black uppercase tracking-tighter text-[#FF3D57]"
          >
            {{ item.type }}
          </p>
          <p class="text-xs font-bold truncate mt-1">{{ item.title }}</p>
        </div>
        <button
          type="button"
          class="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-[#FF3D57] transition-all opacity-0 group-hover:opacity-100"
          title="Buka & download lagi"
          @click="openHistoryItem(item)"
        >
          <iconify-icon icon="lucide:download" class="text-white text-xs" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStateTiktok } from "~/services/useStateTiktok";

const {
  videoUrl,
  downloadLoading,
  downloadError,
  downloadVideoLoading,
  downloadMp3Loading,
  downloadImagesLoading,
  videoLoadFailed,
  videoInfo,
  imageIndex,
  historyItems,
  historyReady,
  clearHistory,
  openHistoryItem,
  onSearch,
  onDownloadVideo,
  onDownloadMp3,
  onDownloadImages,
  onDownloadAnother,
} = useStateTiktok();
</script>
