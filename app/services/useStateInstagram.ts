const HISTORY_STORAGE_KEY = "instagram-download-history";
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

export function useStateInstagram() {
    const config = useRuntimeConfig();
    const platform = "instagram";

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

    function addToHistory(url: string, data: { text?: string; author?: string; cover?: string; images?: string[]; videoUrl?: string }) {
        const type: HistoryItem["type"] = data.images?.length
            ? "Image"
            : "Video";
        const cover = data.cover || data.images?.[0] || "";
        const item: HistoryItem = {
            id: `${Date.now()}-${url.slice(-12)}`,
            url,
            title: data.text?.slice(0, 80) || "Instagram Post",
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
                videoUrl: data.videoUrl,
                previewVideoUrl: data.videoUrl
                    ? `${baseUrl}/api/${platform}/preview-video?url=${encodeURIComponent(url)}`
                    : undefined,
                audioUrl: undefined,
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
                videoUrl: data.videoUrl,
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
            triggerBlobDownload(blob, "instagram_video.mp4");
        } catch (e: unknown) {
            downloadError.value = e instanceof Error ? e.message : "Gagal unduh video";
        } finally {
            downloadVideoLoading.value = false;
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
            triggerBlobDownload(blob, `instagram_image_${idx + 1}.${ext}`);
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
        onDownloadImages,
        onDownloadAnother,
    };
}

export function getFaqItemsInstagram() {
    return [
        {
            question: "Is the Instagram downloader free?",
            answer:
                "Yes! Download Instagram reels and posts for free. No sign-up or subscription required.",
        },
        {
            question: "Can I download Instagram Reels?",
            answer:
                "Yes. Paste any public Reel or post link (including /p/ and /reel/) and we'll fetch the video or photos for download.",
        },
        {
            question: "Do you support carousel posts?",
            answer:
                "Yes. For posts with multiple photos, you can download each image individually.",
        },
    ];
}
