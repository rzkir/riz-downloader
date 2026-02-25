<template>
  <section class="container mx-auto px-6 md:px-20 pt-16 pb-32 space-y-12">
    <!-- Hero -->
    <header class="max-w-3xl">
      <p
        class="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-xs font-medium text-white/60 ring-1 ring-white/10">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        Donasi terbuka — bantu dukung pengembangan tools ini
      </p>

      <h1 class="mt-6 text-4xl md:text-5xl font-black font-heading leading-tight">
        Dukung pengembangan <span class="text-emerald-400">Media Tools</span>
      </h1>

      <p class="mt-4 text-base md:text-lg text-white/70 max-w-2xl">
        Donasi kamu membantu biaya server, maintenance, dan pengembangan fitur baru agar
        layanan tetap <span class="font-semibold text-white">gratis, cepat, dan bebas iklan</span> untuk semua orang.
      </p>
    </header>

    <!-- Main content -->
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <!-- Left: Donation card -->
      <div class="space-y-6">
        <div
          class="rounded-3xl bg-white/5 border border-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.7)] p-6 md:p-8 backdrop-blur">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-xl md:text-2xl font-semibold">Pilih nominal donasi</h2>
              <p class="text-sm text-white/60 mt-1">
                Berapa pun kontribusi kamu sangat berarti.
              </p>
            </div>
            <span
              class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
              Transparan & tanpa biaya tambahan
            </span>
          </div>

          <!-- Preset amounts -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <button type="button" class="group rounded-2xl px-4 py-3 text-sm flex flex-col items-start gap-1 transition"
              :class="selectedPresetId === '20k'
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'
                " @click="selectPreset(20000, '20k')">
              <span>Rp20.000</span>
              <span class="text-[11px] text-white/50 group-hover:text-emerald-200">
                Setara 1 kopi
              </span>
            </button>
            <button type="button" class="group rounded-2xl px-4 py-3 text-sm flex flex-col items-start gap-1 transition"
              :class="selectedPresetId === '50k'
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'
                " @click="selectPreset(50000, '50k')">
              <span>Rp50.000</span>
              <span class="text-[11px] text-emerald-200">
                Bantu biaya server 1 hari
              </span>
            </button>
            <button type="button" class="group rounded-2xl px-4 py-3 text-sm flex flex-col items-start gap-1 transition"
              :class="selectedPresetId === '100k'
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'
                " @click="selectPreset(100000, '100k')">
              <span>Rp100.000</span>
              <span class="text-[11px] text-white/50 group-hover:text-emerald-200">
                Bantu pengembangan fitur baru
              </span>
            </button>
            <button type="button" class="group rounded-2xl px-4 py-3 text-sm flex flex-col items-start gap-1 transition"
              :class="selectedPresetId === '200k'
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'
                " @click="selectPreset(200000, '200k')">
              <span>Rp200.000</span>
              <span class="text-[11px] text-white/50 group-hover:text-emerald-200">
                Support jangka panjang
              </span>
            </button>
            <button type="button" class="group rounded-2xl px-4 py-3 text-sm flex flex-col items-start gap-1 transition"
              :class="selectedPresetId === '500k'
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'
                " @click="selectPreset(500000, '500k')">
              <span>Rp500.000</span>
              <span class="text-[11px] text-white/50 group-hover:text-emerald-200">
                Bantu cover biaya bulanan
              </span>
            </button>
            <button type="button" class="group rounded-2xl px-4 py-3 text-sm flex flex-col items-start gap-1 transition"
              :class="selectedPresetId === 'custom'
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'
                " @click="selectCustom()">
              <span>Nominal lain</span>
              <span class="text-[11px] text-white/50 group-hover:text-emerald-200">
                Kamu yang tentukan
              </span>
            </button>
          </div>

          <!-- Custom amount -->
          <div class="space-y-2 mb-6">
            <label class="text-xs font-medium text-white/70">
              Atau masukkan nominal sendiri
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-white/40">
                Rp
              </span>
              <input v-model.number="amount" type="number" inputmode="numeric" placeholder="0"
                class="w-full rounded-2xl border border-white/10 bg-black/40 px-11 py-3 text-sm text-white placeholder:text-white/25 outline-none ring-emerald-500/0 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition"
                @input="onCustomInput" />
            </div>
            <p class="text-[11px] text-white/40">
              Minimun saran donasi Rp10.000, tapi kamu bebas memberi berapa pun.
            </p>
            <p v-if="hasValidAmount" class="text-[11px] text-emerald-200">
              Nominal donasi saat ini: <span class="font-semibold">{{ formattedAmount }}</span>
            </p>
          </div>

          <!-- Payment method: GoPay only -->
          <div class="space-y-3">
            <label class="text-xs font-medium text-white/70">
              Metode pembayaran
            </label>
            <div class="rounded-2xl border border-emerald-500 bg-emerald-500/5 p-4 flex flex-col gap-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold text-emerald-200">GoPay</p>
                  <p class="mt-0.5 text-[11px] text-white/60">
                    Kirim donasi ke nomor GoPay berikut:
                  </p>
                </div>
                <span
                  class="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-medium text-emerald-200 ring-1 ring-emerald-500/30">
                  Satu-satunya metode donasi
                </span>
              </div>

              <div
                class="rounded-xl bg-black/40 border border-emerald-500/40 px-4 py-3 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 flex-col">
                  <div>
                    <p class="text-[11px] text-white/45">Nama penerima</p>
                    <button type="button"
                      class="mt-0.5 text-sm font-semibold tracking-wide text-emerald-100 hover:text-emerald-200 transition">
                      Rizki Ramadhan
                    </button>
                  </div>

                  <div>
                    <p class="text-[11px] text-white/45">Nomor GoPay</p>
                    <button type="button"
                      class="mt-0.5 text-sm font-semibold tracking-wide text-emerald-100 hover:text-emerald-200 transition"
                      @click="copyGopay">
                      0813 9863 2939
                    </button>
                  </div>
                </div>
                <button type="button"
                  class="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-slate-950 shadow-[0_10px_25px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition"
                  @click="copyGopay">
                  <span>Copy</span>
                </button>
              </div>

              <p class="text-[11px] text-white/40">
                Setelah transfer, kamu bisa menyimpan bukti donasi di aplikasi GoPay. Terima kasih 🙏
              </p>
            </div>
          </div>

          <!-- Donate CTA -->
          <div class="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button type="button"
              class="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition w-full md:w-auto disabled:opacity-50 disabled:hover:bg-emerald-500"
              :disabled="!hasValidAmount">
              <span v-if="hasValidAmount">
                Kirim {{ formattedAmount }} via GoPay
              </span>
              <span v-else>
                Pilih nominal donasi terlebih dahulu
              </span>
            </button>
            <p class="text-[11px] text-white/40 max-w-xs md:text-right">
              Setelah klik, kamu akan diarahkan ke halaman donasi resmi.
              Proses aman dan terenkripsi.
            </p>
          </div>
        </div>

        <!-- Guarantees -->
        <div class="grid gap-4 md:grid-cols-3 text-xs text-white/70">
          <div class="space-y-1">
            <p class="font-semibold text-white">Transparan</p>
            <p>Donasi digunakan untuk biaya server dan pengembangan fitur.</p>
          </div>
          <div class="space-y-1">
            <p class="font-semibold text-white">Tanpa iklan</p>
            <p>Dukungan kamu membantu Media Tools tetap bebas iklan.</p>
          </div>
          <div class="space-y-1">
            <p class="font-semibold text-white">Bisa berhenti kapan saja</p>
            <p>Tidak ada komitmen. Donasi sepenuhnya sukarela.</p>
          </div>
        </div>
      </div>

      <!-- Right: Impact & FAQ -->
      <aside class="space-y-6 lg:pl-4">
        <div class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 class="text-sm font-semibold text-white mb-3">Dampak donasi kamu</h3>
          <ul class="space-y-3 text-xs text-white/70">
            <li class="flex gap-3">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Menjaga layanan tetap stabil dan cepat untuk ribuan pengguna.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Mempercepat rilis fitur baru dan perbaikan bug.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Mendukung pengembangan open-source yang bermanfaat untuk komunitas.</span>
            </li>
          </ul>
        </div>

        <div class="rounded-3xl border border-white/5 bg-linear-to-br from-white/5 to-white/0 p-6">
          <h3 class="text-sm font-semibold text-white mb-3">FAQ singkat</h3>
          <dl class="space-y-4 text-xs text-white/70">
            <div>
              <dt class="font-medium text-white mb-1">Apakah donasi ini wajib?</dt>
              <dd>Tidak. Layanan tetap bisa digunakan secara gratis tanpa donasi.</dd>
            </div>
            <div>
              <dt class="font-medium text-white mb-1">Apakah ada bukti donasi?</dt>
              <dd>Ya, kamu akan mendapatkan bukti transaksi dari penyedia pembayaran.</dd>
            </div>
            <div>
              <dt class="font-medium text-white mb-1">Bisa donasi rutin bulanan?</dt>
              <dd>Bisa, silakan atur langsung di halaman donasi (jika tersedia).</dd>
            </div>
          </dl>
        </div>

        <p class="text-[11px] text-white/35">
          Terima kasih sudah mempertimbangkan untuk berdonasi. Dukungan kecil dari banyak orang
          membuat project seperti ini bisa terus hidup dan berkembang.
        </p>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { toast } from "vue-sonner";

const GOPAY_NUMBER = "081398632939";

const amount = ref<number | null>(50000);
const selectedPresetId = ref<string | null>("50k");

const hasValidAmount = computed(
  () => typeof amount.value === "number" && amount.value >= 10000,
);

const formattedAmount = computed(() => {
  if (!hasValidAmount.value || typeof amount.value !== "number") {
    return "";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount.value);
});

function selectPreset(value: number, id: string) {
  amount.value = value;
  selectedPresetId.value = id;
}

function selectCustom() {
  selectedPresetId.value = "custom";
}

function onCustomInput() {
  selectedPresetId.value = "custom";
}

async function copyGopay() {
  try {
    await navigator.clipboard.writeText(GOPAY_NUMBER);
    toast.success("Nomor GoPay berhasil disalin");
  } catch {
    toast.error("Gagal menyalin nomor GoPay. Coba salin manual.");
  }
}
</script>
