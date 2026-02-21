<template>
  <NuxtLayout>
    <AuthContext>
      <Header />
      <NuxtPage />
      <Footer />
      <ClientOnly>
        <Toaster
          position="top-center"
          rich-colors
          :toast-options="{
            duration: 3000,
            className: 'font-medium',
          }"
        />
        <template #fallback />
      </ClientOnly>
    </AuthContext>
  </NuxtLayout>
</template>

<script setup>
import { Toaster } from "~/components/ui/sonner";

useHead({
  title: "DownTik.to | Download TikTok Video by Link!",
  htmlAttrs: {
    lang: "id",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
