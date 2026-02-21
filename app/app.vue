<template>
  <NuxtLayout>
    <div class="min-h-screen flex flex-col relative">
      <div class="mesh-bg" aria-hidden="true" />
      <Header />
      <NuxtPage />
      <Footer />
    </div>
    <Toaster
      position="top-center"
      rich-colors
      :toast-options="{
        duration: 3000,
        className: 'font-medium',
      }"
    />
  </NuxtLayout>
</template>

<script setup>
import { Toaster } from "~/components/ui/sonner";

useHead({
  title: "VideoMax - Universal Social Media Downloader",
  htmlAttrs: {
    lang: "id",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
