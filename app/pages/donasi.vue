<template>
  <section class="container mx-auto px-6 py-10 space-y-12">
    <!-- Hero -->
    <header class="max-w-3xl">
      <p
        class="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-sm sm:text-base font-medium text-white/60 ring-1 ring-white/10">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        Donasi terbuka — bantu dukung pengembangan tools ini
      </p>

      <h1 class="mt-6 text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight">
        Dukung pengembangan <span class="text-emerald-400">Media Tools</span>
      </h1>

      <p class="mt-4 text-sm sm:text-base text-white/70 max-w-2xl">
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
              <h2 class="text-2xl font-semibold">Pilih nominal donasi</h2>
              <p class="text-sm sm:text-base text-white/60 mt-1">
                Berapa pun kontribusi kamu sangat berarti.
              </p>
            </div>
            <span
              class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm sm:text-base font-medium text-emerald-300 ring-1 ring-emerald-500/30">
              Transparan & tanpa biaya tambahan
            </span>
          </div>

          <!-- Preset amounts -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <button v-for="preset in DONATION_PRESETS" :key="preset.id" type="button" class="group rounded-2xl px-4 py-3 text-sm sm:text-ba
              se flex flex-col items-start gap-1 transition" :class="selectedPresetId === preset.id
                ? 'border border-emerald-500 bg-emerald-500/10 text-emerald-50 font-semibold shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                : 'border border-white/15 bg-white/5 text-white hover:border-emerald-400 hover:bg-emerald-400/10'"
              @click="onPresetClick(preset)">
              <span>{{ preset.label }}</span>
              <span class="text-sm sm:text-base text-white/50 group-hover:text-emerald-200">
                {{ preset.description }}
              </span>
            </button>
          </div>

          <!-- Custom amount -->
          <div class="space-y-2 mb-6">
            <label class="text-sm sm:text-base font-medium text-white/70">
              Atau masukkan nominal sendiri
            </label>
            <div class="relative">
              <span
                class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm sm:text-base text-white/40">
                Rp
              </span>
              <input v-model.number="amount" type="number" inputmode="numeric" placeholder="0"
                class="w-full rounded-2xl border border-white/10 bg-black/40 px-11 py-3 text-sm sm:text-base text-white placeholder:text-white/25 outline-none ring-emerald-500/0 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/50 transition"
                @input="onCustomInput" />
            </div>
            <p class="text-sm sm:text-base text-white/40">
              Minimun saran donasi Rp10.000, tapi kamu bebas memberi berapa pun.
            </p>
            <p v-if="hasValidAmount" class="text-sm sm:text-base text-emerald-200">
              Nominal donasi saat ini: <span class="font-semibold">{{ formattedAmount }}</span>
            </p>
          </div>

          <!-- Payment method: GoPay only -->
          <div class="space-y-3">
            <label class="text-sm sm:text-base font-medium text-white/70">
              Metode pembayaran
            </label>
            <div class="rounded-2xl border border-emerald-500 bg-emerald-500/5 p-4 flex flex-col gap-3">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-sm sm:text-base font-semibold text-emerald-200">GoPay</p>
                  <p class="mt-0.5 text-sm sm:text-base text-white/60">
                    Kirim donasi ke nomor GoPay berikut:
                  </p>
                </div>
                <span
                  class="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-sm sm:text-base font-medium text-emerald-200 ring-1 ring-emerald-500/30">
                  Satu-satunya metode donasi
                </span>
              </div>

              <div
                class="rounded-xl bg-black/40 border border-emerald-500/40 px-4 py-3 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 flex-col">
                  <div>
                    <p class="text-sm sm:text-base text-white/45">Nama penerima</p>
                    <button type="button"
                      class="mt-0.5 text-sm sm:text-base font-semibold tracking-wide text-emerald-100 hover:text-emerald-200 transition">
                      Rizki Ramadhan
                    </button>
                  </div>

                  <div>
                    <p class="text-sm sm:text-base text-white/45">Nomor GoPay</p>
                    <button type="button"
                      class="mt-0.5 text-sm sm:text-base font-semibold tracking-wide text-emerald-100 hover:text-emerald-200 transition"
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

              <p class="text-sm sm:text-base text-white/40">
                Setelah transfer, kamu bisa menyimpan bukti donasi di aplikasi GoPay. Terima kasih 🙏
              </p>
            </div>
          </div>

          <!-- Donate CTA -->
          <div class="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button type="button"
              class="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm sm:text-base font-semibold text-slate-950 shadow-[0_18px_40px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition w-full md:w-auto disabled:opacity-50 disabled:hover:bg-emerald-500"
              :disabled="!hasValidAmount" @click="openBankModal">
              <span v-if="hasValidAmount">
                Kirim {{ formattedAmount }} via GoPay
              </span>
              <span v-else>
                Pilih nominal donasi terlebih dahulu
              </span>
            </button>
            <p class="text-[11px] text-white/40 max-w-xs md:text-right">
              Setelah klik, kamu akan melihat panduan transfer dari semua bank ke GoPay.
            </p>
          </div>
        </div>

        <!-- Guarantees -->
        <div class="grid gap-4 md:grid-cols-3 text-sm sm:text-base text-white/70">
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
          <h3 class="text-sm sm:text-base font-semibold text-white mb-3">Dampak donasi kamu</h3>
          <ul class="space-y-3 text-sm sm:text-base text-white/70">
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
          <h3 class="text-sm sm:text-base font-semibold text-white mb-3">FAQ singkat</h3>
          <dl class="space-y-4 text-sm sm:text-base text-white/70">
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

        <p class="text-sm sm:text-base text-white/35">
          Terima kasih sudah mempertimbangkan untuk berdonasi. Dukungan kecil dari banyak orang
          membuat project seperti ini bisa terus hidup dan berkembang.
        </p>
      </aside>
    </div>
  </section>
  <!-- Modal panduan transfer bank ke GoPay -->
  <transition name="fade">
    <div v-if="isBankModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur">
      <div
        class="relative w-full max-w-3xl rounded-3xl space-y-4 bg-slate-950/95 border border-white/10 shadow-[0_24px_60px_rgba(15,23,42,0.9)] max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between px-6 border-b border-white/10">
          <div class="py-4">
            <p class="text-base text-emerald-300">Panduan transfer ke GoPay</p>
            <h2 class="text-base font-semibold text-white mt-1">
              Cara transfer dari berbagai bank ke GoPay
            </h2>
          </div>
          <button type="button"
            class="text-xs text-white/60 hover:text-white rounded-full border border-white/20 px-3 py-1"
            @click="closeBankModal">
            Tutup
          </button>
        </div>

        <div class="px-6 text-base text-white/70 space-y-6 overflow-y-auto max-h-[70vh]">
          <p>
            Silakan transfer ke nomor GoPay
            <span class="font-semibold text-emerald-300">{{ GOPAY_NUMBER }}</span>
            dengan nominal
            <span class="font-semibold text-emerald-300">{{ formattedAmount }}</span>.
          </p>

          <!-- Filter bank -->
          <div class="flex flex-wrap gap-2 text-base">
            <button type="button" class="px-3 py-1 rounded-full border transition" :class="selectedBank === 'bca'
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
              : 'border-white/20 bg-white/5 text-white/60 hover:border-emerald-400 hover:text-emerald-200'"
              @click="selectedBank = 'bca'">
              BCA
            </button>
            <button type="button" class="px-3 py-1 rounded-full border transition" :class="selectedBank === 'bri'
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
              : 'border-white/20 bg-white/5 text-white/60 hover:border-emerald-400 hover:text-emerald-200'"
              @click="selectedBank = 'bri'">
              BRI
            </button>
            <button type="button" class="px-3 py-1 rounded-full border transition" :class="selectedBank === 'bni'
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
              : 'border-white/20 bg-white/5 text-white/60 hover:border-emerald-400 hover:text-emerald-200'"
              @click="selectedBank = 'bni'">
              BNI
            </button>
            <button type="button" class="px-3 py-1 rounded-full border transition" :class="selectedBank === 'mandiri'
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
              : 'border-white/20 bg-white/5 text-white/60 hover:border-emerald-400 hover:text-emerald-200'"
              @click="selectedBank = 'mandiri'">
              Mandiri
            </button>
            <button type="button" class="px-3 py-1 rounded-full border transition" :class="selectedBank === 'lain'
              ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
              : 'border-white/20 bg-white/5 text-white/60 hover:border-emerald-400 hover:text-emerald-200'"
              @click="selectedBank = 'lain'">
              Bank lain
            </button>
          </div>

          <div v-if="selectedBank === 'bca'" class="space-y-3">
            <h3 class="text-base font-semibold text-white">1. Dari bank BCA</h3>
            <ol class="list-decimal list-inside space-y-1">
              <li>Buka aplikasi myBCA / m-BCA / ATM BCA.</li>
              <li>Pilih menu <span class="font-semibold">Transfer &gt; ke Virtual Account / e-Wallet</span>.</li>
              <li>
                Pilih tujuan <span class="font-semibold">GoPay</span> (jika ada) atau masukkan kode sesuai petunjuk
                di aplikasi bank.
              </li>
              <li>
                Masukkan nomor GoPay:
                <span class="font-mono">{{ GOPAY_NUMBER }}</span>.
              </li>
              <li>Masukkan nominal donasi sesuai yang tertera.</li>
              <li>Periksa detail, lalu konfirmasi dan selesaikan transaksi.</li>
            </ol>
          </div>

          <div v-else-if="selectedBank === 'bri'" class="space-y-3">
            <h3 class="text-base font-semibold text-white">2. Dari bank BRI</h3>
            <ol class="list-decimal list-inside space-y-1">
              <li>Buka BRImo / Internet Banking / ATM BRI.</li>
              <li>Pilih menu <span class="font-semibold">Pembayaran / e-Wallet / BRIVA</span>.</li>
              <li>Pilih atau cari tujuan <span class="font-semibold">GoPay</span>.</li>
              <li>
                Masukkan nomor GoPay:
                <span class="font-mono">{{ GOPAY_NUMBER }}</span>.
              </li>
              <li>Isi nominal donasi, lalu lanjutkan hingga pembayaran berhasil.</li>
            </ol>
          </div>

          <div v-else-if="selectedBank === 'bni'" class="space-y-3">
            <h3 class="text-base font-semibold text-white">3. Dari bank BNI</h3>
            <ol class="list-decimal list-inside space-y-1">
              <li>Buka aplikasi BNI Mobile Banking atau gunakan ATM BNI.</li>
              <li>Pilih menu <span class="font-semibold">e-Wallet / Pembayaran</span>.</li>
              <li>Pilih tujuan <span class="font-semibold">GoPay</span> bila tersedia.</li>
              <li>
                Masukkan nomor GoPay:
                <span class="font-mono">{{ GOPAY_NUMBER }}</span>.
              </li>
              <li>Masukkan jumlah donasi dan konfirmasi transaksi.</li>
            </ol>
          </div>

          <div v-else-if="selectedBank === 'mandiri'" class="space-y-3">
            <h3 class="text-base font-semibold text-white">4. Dari bank Mandiri</h3>
            <ol class="list-decimal list-inside space-y-1">
              <li>Buka Livin&apos; by Mandiri atau ATM Mandiri.</li>
              <li>Pilih menu <span class="font-semibold">Bayar / e-Wallet</span>.</li>
              <li>Pilih <span class="font-semibold">GoPay</span> sebagai tujuan.</li>
              <li>
                Masukkan nomor GoPay:
                <span class="font-mono">{{ GOPAY_NUMBER }}</span>.
              </li>
              <li>Isi nominal donasi dan selesaikan pembayaran.</li>
            </ol>
          </div>

          <div v-else-if="selectedBank === 'lain'" class="space-y-3">
            <h3 class="text-base font-semibold text-white">5. Dari bank lain</h3>
            <ol class="list-decimal list-inside space-y-1">
              <li>Buka aplikasi mobile banking / internet banking / ATM bank kamu.</li>
              <li>Cari menu <span class="font-semibold">e-Wallet / Dompet Digital / Virtual Account</span>.</li>
              <li>Pilih tujuan <span class="font-semibold">GoPay</span> bila tersedia.</li>
              <li>
                Masukkan nomor GoPay:
                <span class="font-mono">{{ GOPAY_NUMBER }}</span>.
              </li>
              <li>Isi nominal donasi lalu lanjutkan hingga transaksi berhasil.</li>
            </ol>
          </div>

          <p class="text-base text-white/40">
            Catatan: tampilan dan langkah di setiap aplikasi bank bisa sedikit berbeda, namun alurnya serupa.
            Jika ragu, ikuti petunjuk yang ada di aplikasi bank saat memilih tujuan GoPay.
          </p>
        </div>

        <div class="px-6 py-3 border-t border-white/10 flex items-center justify-between gap-3">
          <p class="text-base text-white/40">
            Jika donasi sudah terkirim, terima kasih banyak atas dukunganmu 🙏
          </p>
          <button type="button"
            class="text-base font-semibold rounded-full bg-emerald-500 px-4 py-1.5 text-slate-950 hover:bg-emerald-400"
            @click="closeBankModal">
            Oke, sudah mengerti
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { toast } from "vue-sonner";
import type { DonationPreset, DonationPresetId } from "~/lib/data";
import { DONATION_PRESETS } from "~/lib/data";

const GOPAY_NUMBER = "081398632939";

type BankKey = "bca" | "bri" | "bni" | "mandiri" | "lain";

const amount = ref<number | null>(50000);
const selectedPresetId = ref<DonationPresetId | null>("50k");
const isBankModalOpen = ref(false);
const selectedBank = ref<BankKey>("bca");

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

watch(isBankModalOpen, (open) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = open ? "hidden" : "";
});

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = "";
});

function selectPreset(value: number, id: string) {
  amount.value = value;
  selectedPresetId.value = id as DonationPresetId;
}

function selectCustom() {
  selectedPresetId.value = "custom";
}

function onCustomInput() {
  selectedPresetId.value = "custom";
}

function onPresetClick(preset: DonationPreset) {
  if (preset.id === "custom") {
    selectCustom();
    return;
  }

  if (typeof preset.amount === "number") {
    selectPreset(preset.amount, preset.id);
  }
}

async function copyGopay() {
  try {
    await navigator.clipboard.writeText(GOPAY_NUMBER);
    toast.success("Nomor GoPay berhasil disalin");
  } catch {
    toast.error("Gagal menyalin nomor GoPay. Coba salin manual.");
  }
}

function openBankModal() {
  if (!hasValidAmount.value) return;
  isBankModalOpen.value = true;
}

function closeBankModal() {
  isBankModalOpen.value = false;
}
</script>
