<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <!-- Background Glows -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-glow z-0" />

    <Header />

    <!-- Hero Section -->
    <section class="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
      <!-- Floating Elements -->
      <div class="absolute -left-10 top-20 floating opacity-50">
        <div class="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center">
          <iconify-icon icon="lucide:play" class="text-green-400" />
        </div>
      </div>
      <div class="absolute right-20 top-0 floating opacity-80" style="animation-delay: -1s">
        <iconify-icon icon="noto:smiling-face-with-heart-eyes" class="text-7xl" />
      </div>
      <div class="absolute left-1/4 -bottom-10 floating opacity-40">
        <div class="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
          <iconify-icon icon="lucide:video" class="text-yellow-400" />
        </div>
      </div>
      <div class="absolute right-10 bottom-20 floating opacity-60" style="animation-delay: -2s">
        <div class="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center">
          <iconify-icon icon="lucide:volume-2" class="text-indigo-400 text-2xl" />
        </div>
      </div>

      <h1 class="text-5xl md:text-8xl font-extrabold leading-tight mb-8">
        <span class="text-gradient">Download TikTok</span><br>
        <span class="text-white">Video by Link!</span>
      </h1>

      <div class="flex flex-wrap justify-center gap-8 mb-12 text-sm md:text-base font-medium text-gray-300">
        <div class="flex items-center gap-2">
          <iconify-icon icon="lucide:check-circle" class="text-green-400" />
          Unlimited Downloads
        </div>
        <div class="flex items-center gap-2">
          <iconify-icon icon="lucide:check-circle" class="text-green-400" />
          No Watermark!
        </div>
      </div>

      <!-- Input Box -->
      <div class="max-w-3xl mx-auto relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
        <div class="relative flex items-center bg-[#0d0e1a] border border-white/10 rounded-full p-2 pl-8">
          <iconify-icon icon="lucide:link-2" class="text-gray-500 text-xl mr-4" />
          <input
            v-model="videoUrl"
            type="text"
            placeholder="Paste link here!"
            class="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
          >
          <button
            type="button"
            class="btn-gradient px-12 py-4 rounded-full font-bold text-white hover:opacity-90 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="downloadLoading"
            @click="onSearch"
          >
            {{ downloadLoading ? '...' : 'Cari' }}
          </button>
        </div>
        <p v-if="downloadError" class="mt-3 text-sm text-red-400">
          {{ downloadError }}
        </p>
      </div>

      <!-- Phone Mockup (single) + Download buttons -->
      <div class="mt-24 flex flex-col items-center gap-8">
        <div class="w-48 md:w-72 aspect-[9/19] bg-zinc-900 rounded-[2.5rem] p-3 border-4 border-zinc-800 phone-mockup">
          <div class="w-full h-full bg-black rounded-[1.8rem] overflow-hidden relative">
            <template v-if="videoInfo">
              <video
                v-if="(videoInfo.previewVideoUrl || videoInfo.videoUrl) && !videoLoadFailed"
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
              >
              <img
                v-else
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400"
                alt="Preview"
                class="w-full h-full object-cover opacity-60"
              >
            </template>
            <img
              v-else
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400"
              alt="Preview"
              class="w-full h-full object-cover opacity-60"
            >
            <div v-if="downloadLoading" class="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div class="flex flex-col items-center gap-3">
                <span class="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span class="text-sm text-white">Memuat...</span>
              </div>
            </div>
            <div v-else-if="videoInfo" class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div class="text-left">
                <p v-if="videoInfo.author" class="text-[10px] text-gray-300">
                  {{ videoInfo.author.startsWith('@') ? videoInfo.author : `@${videoInfo.author}` }}
                </p>
                <p class="text-xs font-bold">
                  {{ videoInfo.text || 'TikTok Video' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="videoInfo" class="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            class="btn-gradient px-8 py-3 rounded-full font-bold text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
            :disabled="downloadVideoLoading"
            @click="onDownloadVideo"
          >
            <iconify-icon icon="lucide:download" />
            {{ downloadVideoLoading ? '...' : 'Tanpa tanda air' }}
          </button>
          <button
            type="button"
            class="glass-card px-8 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
            :disabled="downloadMp3Loading"
            @click="onDownloadMp3"
          >
            <iconify-icon icon="lucide:music" />
            {{ downloadMp3Loading ? '...' : 'Unduh MP3' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-[#080915] py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-16">
          Here are some of the features<br>of this website
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="glass-card p-10 rounded-[2rem] hover:bg-white/5 transition-all group"
          >
            <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <iconify-icon :icon="feature.icon" class="text-2xl text-white" />
            </div>
            <h3 class="text-xl font-bold mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-20">
          Frequently asked questions (FAQ)
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="relative flex justify-center">
            <div class="relative">
              <div class="absolute -top-10 -right-10 bg-indigo-600 px-6 py-4 rounded-3xl rounded-bl-none shadow-xl">
                <span class="text-2xl font-black">FAQ</span>
              </div>
              <img
                src="https://illustrations.popsy.co/white/surreal-person-floating.svg"
                alt="FAQ Illustration"
                class="w-80 h-auto opacity-80"
              >
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-2xl font-bold mb-8">
              Frequently Asked Questions
            </h3>

            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="accordion-item glass-card rounded-2xl overflow-hidden"
              :class="{ open: openFaqIndex === index }"
              @click="toggleFaq(index)"
            >
              <div class="p-6 cursor-pointer flex justify-between items-center group">
                <span class="font-semibold">{{ item.question }}</span>
                <iconify-icon
                  icon="lucide:chevron-down"
                  class="accordion-chevron shrink-0"
                />
              </div>
              <div class="accordion-content">
                <div class="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
const videoUrl = ref('')
const openFaqIndex = ref<number | null>(0)
const downloadLoading = ref(false)
const downloadError = ref('')
const downloadVideoLoading = ref(false)
const downloadMp3Loading = ref(false)
const videoLoadFailed = ref(false)
const videoInfo = ref<{
  videoUrl?: string
  previewVideoUrl?: string
  audioUrl?: string
  cover?: string
  text?: string
  author?: string
} | null>(null)
const config = useRuntimeConfig()

const features = [
  {
    icon: 'lucide:layers',
    title: 'No Watermark',
    description: 'There are no watermarks when downloading videos from this website.',
  },
  {
    icon: 'lucide:monitor-play',
    title: 'HD Quality',
    description: 'If you download videos from this website, any video will be in HD quality.',
  },
  {
    icon: 'lucide:smartphone',
    title: 'Responsive',
    description: 'This website will run on any operating system, such as Android, iOS, Windows, Mac.',
  },
  {
    icon: 'lucide:mouse-pointer-2',
    title: 'Easy',
    description: 'It is very easy to download videos from TikTok using this website.',
  },
  {
    icon: 'lucide:zap',
    title: 'Fast',
    description: 'Download videos from TikTok in much less time using this website.',
  },
  {
    icon: 'lucide:smile',
    title: 'User Friendly',
    description: 'This is a very user-friendly website. Users feel very comfortable using it.',
  },
]

const faqItems = [
  {
    question: 'How to download TikTok videos on iPhone?',
    answer:
      'Simply copy the TikTok video link, paste it into our website using Safari, and click download. You can then save it to your Files app.',
  },
  {
    question: 'How to download TikToks on Mac OS?',
    answer:
      'Open any browser on your Mac, navigate to DownTik.to, and paste your video link. The download will start automatically.',
  },
  {
    question: 'Where can I find the downloaded files?',
    answer:
      "Check your browser's default downloads folder. On mobile, look for the 'Downloads' section in your file manager or browser history.",
  },
  {
    question: 'Do you keep a history of my downloads?',
    answer:
      'No, we value your privacy. We do not store links or video data processed through our platform.',
  },
]

async function onSearch() {
  const url = videoUrl.value.trim()
  if (!url) return
  downloadError.value = ''
  videoInfo.value = null
  videoLoadFailed.value = false
  downloadLoading.value = true
  try {
    const base = config.public.apiUrl as string
    const res = await fetch(`${base}/api/metadata?url=${encodeURIComponent(url)}`)
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || data.error || 'Gagal mengambil data')
    const baseUrl = config.public.apiUrl as string
    videoInfo.value = {
      videoUrl: data.videoUrlNoWaterMark || data.videoUrl,
      previewVideoUrl: `${baseUrl}/api/preview-video?url=${encodeURIComponent(url)}`,
      audioUrl: data.audioUrl,
      cover: data.cover,
      text: data.text,
      author: data.author,
    }
  } catch (e: unknown) {
    downloadError.value = e instanceof Error ? e.message : 'Gagal mengambil data'
  } finally {
    downloadLoading.value = false
  }
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function onDownloadVideo() {
  const url = videoUrl.value.trim()
  if (!url || !videoInfo.value) return
  downloadVideoLoading.value = true
  try {
    const base = config.public.apiUrl as string
    const res = await fetch(`${base}/api/download?url=${encodeURIComponent(url)}`)
    if (!res.ok) throw new Error('Gagal unduh video')
    const blob = await res.blob()
    triggerBlobDownload(blob, 'tiktok_video.mp4')
  } catch (e: unknown) {
    downloadError.value = e instanceof Error ? e.message : 'Gagal unduh video'
  } finally {
    downloadVideoLoading.value = false
  }
}

async function onDownloadMp3() {
  const url = videoUrl.value.trim()
  if (!url || !videoInfo.value) return
  downloadMp3Loading.value = true
  try {
    const base = config.public.apiUrl as string
    const res = await fetch(`${base}/api/download-mp3?url=${encodeURIComponent(url)}`)
    if (!res.ok) throw new Error('Gagal unduh audio')
    const blob = await res.blob()
    triggerBlobDownload(blob, 'tiktok_audio.mp3')
  } catch (e: unknown) {
    downloadError.value = e instanceof Error ? e.message : 'Gagal unduh audio'
  } finally {
    downloadMp3Loading.value = false
  }
}

function toggleFaq(index: number) {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}
</script>
