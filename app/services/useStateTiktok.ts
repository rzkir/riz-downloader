const HISTORY_STORAGE_KEY = "tiktok-download-history";
const HISTORY_MAX = 50;

function loadHistoryFromStorage(): HistoryItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveHistoryToStorage(items: HistoryItem[]) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
    } catch {
        // ignore
    }
}

export function useStateTiktok() {
    const config = useRuntimeConfig();
    const platform = "tiktok";

    const videoUrl = ref("");
    const downloadLoading = ref(false);
    const downloadError = ref("");
    const downloadVideoLoading = ref(false);
    const downloadMp3Loading = ref(false);
    const downloadImagesLoading = ref(false);
    const videoLoadFailed = ref(false);
    const videoInfo = ref<VideoInfo | null>(null);
    const imageIndex = ref(0);

    const historyItems = ref<HistoryItem[]>([]);
    if (typeof window !== "undefined") {
        historyItems.value = loadHistoryFromStorage();
    }

    function addToHistory(url: string, data: { text?: string; author?: string; cover?: string; images?: string[]; videoUrl?: string; audioUrl?: string }) {
        const type: HistoryItem["type"] = data.images?.length
            ? "Image"
            : data.audioUrl && !data.videoUrl
                ? "Music"
                : "Video";
        const cover = data.cover || data.images?.[0] || "";
        const item: HistoryItem = {
            id: `${Date.now()}-${url.slice(-12)}`,
            url,
            title: data.text?.slice(0, 80) || "TikTok Video",
            author: data.author,
            cover,
            type,
            date: Date.now(),
        };
        const list = [item, ...historyItems.value.filter((i) => i.url !== url)].slice(0, HISTORY_MAX);
        historyItems.value = list;
        saveHistoryToStorage(list);
    }

    function clearHistory() {
        historyItems.value = [];
        saveHistoryToStorage([]);
    }

    function openHistoryItem(item: HistoryItem) {
        videoUrl.value = item.url;
        onSearch();
    }

    function triggerBlobDownload(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    async function onSearch() {
        const url = videoUrl.value.trim();
        if (!url) return;
        downloadError.value = "";
        videoInfo.value = null;
        videoLoadFailed.value = false;
        imageIndex.value = 0;
        downloadLoading.value = true;
        try {
            const base = config.public.apiUrl as string;
            const res = await fetch(
                `${base}/api/${platform}/metadata?url=${encodeURIComponent(url)}`,
            );
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || data.error || "Gagal mengambil data");
            const baseUrl = config.public.apiUrl as string;
            videoInfo.value = {
                videoUrl: data.videoUrlNoWaterMark || data.videoUrl,
                previewVideoUrl: `${baseUrl}/api/${platform}/preview-video?url=${encodeURIComponent(url)}`,
                audioUrl: data.audioUrl,
                images: data.images || undefined,
                cover: data.cover,
                text: data.text,
                author: data.author,
            };
            addToHistory(url, {
                text: data.text,
                author: data.author,
                cover: data.cover,
                images: data.images,
                videoUrl: data.videoUrlNoWaterMark || data.videoUrl,
                audioUrl: data.audioUrl,
            });
        } catch (e: unknown) {
            downloadError.value =
                e instanceof Error ? e.message : "Gagal mengambil data";
        } finally {
            downloadLoading.value = false;
        }
    }

    async function onDownloadVideo() {
        const url = videoUrl.value.trim();
        if (!url || !videoInfo.value) return;
        downloadVideoLoading.value = true;
        try {
            const base = config.public.apiUrl as string;
            const res = await fetch(
                `${base}/api/${platform}/download?url=${encodeURIComponent(url)}`,
            );
            if (!res.ok) throw new Error("Gagal unduh video");
            const blob = await res.blob();
            triggerBlobDownload(blob, "tiktok_video.mp4");
        } catch (e: unknown) {
            downloadError.value = e instanceof Error ? e.message : "Gagal unduh video";
        } finally {
            downloadVideoLoading.value = false;
        }
    }

    async function onDownloadMp3() {
        const url = videoUrl.value.trim();
        if (!url || !videoInfo.value) return;
        downloadMp3Loading.value = true;
        try {
            const base = config.public.apiUrl as string;
            const res = await fetch(
                `${base}/api/${platform}/download-mp3?url=${encodeURIComponent(url)}`,
            );
            if (!res.ok) throw new Error("Gagal unduh audio");
            const blob = await res.blob();
            triggerBlobDownload(blob, "tiktok_audio.mp3");
        } catch (e: unknown) {
            downloadError.value = e instanceof Error ? e.message : "Gagal unduh audio";
        } finally {
            downloadMp3Loading.value = false;
        }
    }

    async function onDownloadImages() {
        const url = videoUrl.value.trim();
        const info = videoInfo.value;
        if (!url || !info?.images?.length) return;
        downloadImagesLoading.value = true;
        downloadError.value = "";
        const idx = imageIndex.value;
        try {
            const base = config.public.apiUrl as string;
            const res = await fetch(
                `${base}/api/${platform}/download-image?url=${encodeURIComponent(url)}&index=${idx}`,
            );
            if (!res.ok) throw new Error("Gagal unduh gambar");
            const blob = await res.blob();
            const ext = info.images[idx]?.includes(".webp")
                ? "webp"
                : info.images[idx]?.includes(".png")
                    ? "png"
                    : "jpg";
            triggerBlobDownload(blob, `tiktok_image_${idx + 1}.${ext}`);
        } catch (e: unknown) {
            downloadError.value = e instanceof Error ? e.message : "Gagal unduh gambar";
        } finally {
            downloadImagesLoading.value = false;
        }
    }

    function onDownloadAnother() {
        videoUrl.value = "";
        videoInfo.value = null;
        downloadError.value = "";
        imageIndex.value = 0;
        document.getElementById("download-input")?.scrollIntoView({ behavior: "smooth" });
    }

    return {
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
        clearHistory,
        openHistoryItem,
        onSearch,
        onDownloadVideo,
        onDownloadMp3,
        onDownloadImages,
        onDownloadAnother,
    };
}

export function getFaqItems() {
    return [
        {
            question: "Is VideoMax totally free to use?",
            answer:
                "Yes! VideoMax is and will always be free. We provide high-quality downloads without any hidden subscription fees.",
        },
        {
            question: "Can I download videos without watermarks?",
            answer:
                "Absolutely. Our tool specifically extracts the clean video stream directly from the servers to ensure no platform watermark is present.",
        },
        {
            question: "Do you support MP3 conversion?",
            answer:
                "Yes, you can choose to download only the audio track in high-quality MP3 format for any video link provided.",
        },
    ];
}