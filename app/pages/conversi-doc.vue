<template>
  <section class="relative overflow-hidden">
    <div
      class="absolute top-20 left-10 text-[18rem] font-heading font-black text-outline uppercase select-none pointer-events-none hidden xl:block leading-none"
    >
      CONVERT
    </div>

    <div class="container mx-auto px-4 sm:px-6 relative z-10">
      <div
        class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-16"
      >
        <div class="order-2 lg:order-1">
          <div class="mb-6 inline-flex items-center gap-3">
            <div class="w-12 h-[2px] bg-[#22C55E]" />
            <span
              class="uppercase tracking-[0.4em] text-xs font-heading font-black text-[#22C55E]"
              >Document</span
            >
          </div>

          <h1
            class="font-heading text-4xl sm:text-5xl md:text-7xl font-black leading-[0.95] mb-6 sm:mb-8"
          >
            Document <br />
            <span class="text-[#22C55E]">Converter</span>
          </h1>

          <p class="text-white/50 text-base sm:text-lg max-w-lg mb-8 sm:mb-12">
            Ubah dokumen Office dan PDF ke format lain hanya dengan sekali
            klik. Upload file lalu pilih format tujuan.
          </p>

          <div
            id="download-input"
            class="relative w-full max-w-2xl mb-8 sm:mb-10 space-y-4"
          >
            <div
              class="bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl border border-white/5 shadow-2xl shadow-black/40"
            >
              <label
                class="block text-xs font-heading font-black uppercase tracking-widest text-white/50 mb-2"
              >
                Pilih file dokumen
              </label>
              <label
                class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 cursor-pointer group"
              >
                <div
                  class="flex-1 min-w-0 px-4 py-3 rounded-xl border border-dashed border-white/10 bg-black/20 group-hover:border-[#22C55E]/60 transition-colors"
                >
                  <p
                    class="text-xs sm:text-sm text-white/70 truncate"
                    v-if="file"
                  >
                    {{ file.name }}
                  </p>
                  <p
                    v-else
                    class="text-xs sm:text-sm text-white/40 flex items-center gap-2"
                  >
                    <iconify-icon
                      icon="lucide:upload-cloud"
                      class="text-base sm:text-lg"
                    />
                    <span>Click to choose file (PDF / DOCX / PPTX / XLSX)</span>
                  </p>
                  <p
                    class="mt-1 text-[10px] text-white/30 uppercase font-heading tracking-widest"
                  >
                    Maksimal 50 MB
                  </p>
                </div>
                <div class="shrink-0 flex flex-col gap-2">
                  <span
                    class="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#22C55E] text-xs font-heading font-black uppercase tracking-widest text-black"
                  >
                    Browse
                  </span>
                </div>
                <input
                  type="file"
                  class="hidden"
                  @change="handleFileInput"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.odt,.ods,.odp"
                />
              </label>

              <div class="mt-4 grid grid-cols-1 sm:grid-cols-[1.3fr_auto] gap-3">
                <div>
                  <label
                    class="block text-xs font-heading font-black uppercase tracking-widest text-white/50 mb-2"
                  >
                    Format tujuan
                  </label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="fmt in formats"
                      :key="fmt.value"
                      type="button"
                      class="px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-widest transition-all border"
                      :class="
                        targetFormat === fmt.value
                          ? 'bg-[#22C55E] border-[#22C55E] text-black'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-[#22C55E]/50'
                      "
                      @click="targetFormat = fmt.value"
                    >
                      {{ fmt.label }}
                    </button>
                  </div>
                </div>
                <div class="flex items-end">
                  <button
                    type="button"
                    class="w-full sm:w-auto bg-[#22C55E] hover:bg-[#22C55E]/90 hover:scale-105 active:scale-95 transition-all text-black px-6 sm:px-8 py-3 rounded-2xl font-heading font-black uppercase text-xs sm:text-sm tracking-widest shadow-lg shadow-[#22C55E]/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    :disabled="!hasFile || converting"
                    @click="onConvert"
                  >
                    {{ converting ? "Memproses..." : "Convert & Download" }}
                  </button>
                </div>
              </div>

              <p v-if="downloadError" class="mt-3 text-sm text-red-400">
                {{ downloadError }}
              </p>
            </div>

            <p class="text-xs text-white/40">
              Didukung: PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX) dan
              format OpenDocument (ODT/ODS/ODP). Hasil konversi bergantung pada
              kualitas dokumen asli dan engine LibreOffice di server.
            </p>
          </div>
        </div>

        <div
          class="order-1 lg:order-2 relative flex justify-center lg:justify-end w-full min-w-0 max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto lg:mx-0"
        >
          <div
            class="w-full aspect-4/5 bg-[#1A1A1A] rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center"
          >
            <div class="flex flex-col items-center gap-4 px-6">
              <div
                class="w-16 h-16 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/40 flex items-center justify-center"
              >
                <iconify-icon
                  icon="lucide:file-symlink"
                  class="text-3xl text-[#22C55E]"
                />
              </div>
              <p
                class="font-heading text-lg sm:text-2xl font-black text-center leading-snug"
              >
                Convert PDF &amp; Office
              </p>
              <p class="text-xs text-white/50 text-center">
                Optimized for quick one-click conversion. No watermark, no
                signup.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-8 sm:mt-12 w-full border-t border-white/5 pt-8 sm:pt-10">
        <div
          class="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4"
        >
          <div>
            <h2
              class="font-heading text-2xl sm:text-3xl font-black uppercase italic"
            >
              Recent <span class="text-[#22C55E]">Conversions</span>
            </h2>
            <p class="text-white/30 text-xs sm:text-sm mt-1">
              Riwayat dokumen yang pernah Anda konversi
            </p>
          </div>
          <button
            type="button"
            class="text-[#22C55E] font-heading font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
            @click="clearHistory"
          >
            Clear History
          </button>
        </div>

        <div
          v-if="!historyReady"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="glass-panel rounded-2xl overflow-hidden animate-pulse p-4 flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-xl bg-white/5" />
            <div class="flex-1 space-y-2">
              <div class="h-3 w-32 bg-white/10 rounded" />
              <div class="h-3 w-20 bg-white/10 rounded" />
            </div>
          </div>
        </div>
        <Empty
          v-else-if="!historyItems?.length"
          class="border-white/5 py-6 sm:py-10 text-white/30 flex flex-col text-center items-center justify-center gap-3"
        >
          <EmptyHeader>
            <iconify-icon icon="lucide:history" class="text-3xl text-[#22C55E]" />
          </EmptyHeader>
          <EmptyContent>
            Belum ada riwayat. Upload file dan lakukan konversi untuk melihat
            di sini.
          </EmptyContent>
        </Empty>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <div
            v-for="item in historyItems"
            :key="item.id"
            class="glass-panel rounded-2xl p-4 flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/40 flex items-center justify-center shrink-0"
            >
              <span class="text-xs font-heading font-black text-[#22C55E]">
                {{ item.fromExt.toUpperCase() || "DOC" }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold truncate text-white">
                {{ item.name }}
              </p>
              <p class="text-[11px] text-white/40 mt-0.5">
                {{ item.fromExt || "?" }} → {{ item.toExt || targetFormat }}
                ·
                {{
                  (item.size / 1024 / 1024).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
                MB
              </p>
              <p class="text-[10px] text-white/30">
                {{ new Date(item.date).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Empty, EmptyHeader, EmptyContent } from "~/components/ui/empty";
import { useStateConvertDoc } from "~/services/useStateConvertDoc";

const {
  file,
  targetFormat,
  hasFile,
  converting,
  downloadError,
  historyItems,
  historyReady,
  clearHistory,
  onFileChange,
  onConvert,
} = useStateConvertDoc();

const formats = computed(() => [
  { value: "pdf", label: "PDF" },
  { value: "docx", label: "DOCX" },
  { value: "pptx", label: "PPTX" },
  { value: "xlsx", label: "XLSX" },
  { value: "odt", label: "ODT" },
  { value: "odp", label: "ODP" },
  { value: "ods", label: "ODS" },
]);

function handleFileInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const f = input.files?.[0] ?? null;
  onFileChange(f);
}
</script>

