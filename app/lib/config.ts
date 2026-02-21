export const DEFAULT_API_URL = process.env.NUXT_PUBLIC_API_URL;

export function useAppConfig() {
    const config = useRuntimeConfig();
    const apiUrl = (config.public.apiUrl as string)?.trim() || DEFAULT_API_URL || "";
    return { apiUrl };
}