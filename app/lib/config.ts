export const DEFAULT_API_URL = process.env.NUXT_PUBLIC_API_URL;

export const DEFAULT_API_SECRET = process.env.NUXT_PUBLIC_API_SECRET;

/** Menambahkan api_secret ke URL (untuk preview video/image src yang tidak bisa pakai header). */
export function withApiSecret(url: string, secret: string): string {
  if (!secret) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}api_secret=${encodeURIComponent(secret)}`;
}

export function useAppConfig() {
  const config = useRuntimeConfig();
  const apiUrl =
    (config.public.apiUrl as string)?.trim() || DEFAULT_API_URL || "";
  const apiSecret =
    (config.public.apiSecret as string)?.trim() || DEFAULT_API_SECRET || "";
  return { apiUrl, apiSecret };
}
