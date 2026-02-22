import { ref, computed, watch, onMounted } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { useAppConfig } from "~/lib/config";

const HISTORY_STORAGE_KEY = "facebook-download-history";
const HISTORY_MAX = 50;
const PLATFORM = "facebook";

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

function buildVideoInfo(data: FacebookMetadataResponse, baseUrl: string, url: string): VideoInfo {
    return {
        videoUrl: data.videoUrl ?? undefined,
        videoUrlHd: data.videoUrlHd ?? undefined,
        qualities: data.qualities ?? undefined,
        previewVideoUrl: data.videoUrl
            ? `${baseUrl}/api/${PLATFORM}/preview-video?url=${encodeURIComponent(url)}`
            : undefined,
        cover: data.thumbnail ?? undefined,
        text: data.title ?? undefined,
        author: undefined,
        duration: data.duration ?? undefined,
        durationMs: data.durationMs ?? undefined,
        id: data.id ?? undefined,
    };
}

interface FacebookQualityOption {
    label: string;
    url: string;
}

interface FacebookMetadataResponse {
    id?: string | null;
    title?: string | null;
    duration?: string | null;
    durationMs?: number | null;
    videoUrl?: string | null;
    videoUrlHd?: string | null;
    qualities?: FacebookQualityOption[] | null;
    thumbnail?: string | null;
}

export function useStateFacebook() {
    const { apiUrl } = useAppConfig();
    const baseUrl = apiUrl;

    const videoUrl = ref("");
    const searchUrl = ref("");
    const selectedQualityIndex = ref(0);
    const videoLoadFailed = ref(false);
    const historyItems = ref<HistoryItem[]>([]);
    const historyReady = ref(false);

    onMounted(() => {
        historyItems.value = loadHistoryFromStorage();
        historyReady.value = true;
    });

    const metadataQuery = useQuery({
        queryKey: ["facebook", "metadata", searchUrl] as const,
        queryFn: async () => {
            const res = await fetch(
                `${baseUrl}/api/${PLATFORM}/metadata?url=${encodeURIComponent(searchUrl.value)}`,
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? data.error ?? "Gagal mengambil data");
            return data as FacebookMetadataResponse;
        },
        enabled: computed(() => !!searchUrl.value.trim()),
        retry: false,
    });

    const videoInfo = computed(() => {
        const url = searchUrl.value;
        const data = metadataQuery.data.value;
        if (!url || !data) return null;
        return buildVideoInfo(data, baseUrl, url);
    });

    const downloadLoading = computed(
        () => !!searchUrl.value.trim() && metadataQuery.isPending.value,
    );

    watch([searchUrl, () => metadataQuery.data.value], () => {
        const data = metadataQuery.data.value;
        const url = searchUrl.value;
        if (url && data)
            addToHistory(url, {
                title: data.title ?? undefined,
                thumbnail: data.thumbnail ?? undefined,
                videoUrl: data.videoUrl ?? undefined,
            });
    });

    const downloadVideoMutation = useMutation({
        mutationFn: async ({ url, qualityIndex }: { url: string; qualityIndex: number }) => {
            const qs = qualityIndex > 0 ? `&quality=${qualityIndex}` : "";
            const res = await fetch(
                `${baseUrl}/api/${PLATFORM}/download?url=${encodeURIComponent(url)}${qs}`,
            );
            if (!res.ok) throw new Error("Gagal unduh video");
            return res.blob();
        },
        onSuccess(blob: Blob) {
            triggerBlobDownload(blob, "facebook_video.mp4");
        },
    });

    const downloadImageMutation = useMutation({
        mutationFn: async (url: string) => {
            const res = await fetch(
                `${baseUrl}/api/${PLATFORM}/download-image?url=${encodeURIComponent(url)}`,
            );
            if (!res.ok) throw new Error("Gagal unduh thumbnail");
            return res.blob();
        },
        onSuccess(blob: Blob) {
            triggerBlobDownload(blob, "facebook_thumbnail.jpg");
        },
    });

    const downloadAudioMutation = useMutation({
        mutationFn: async (url: string) => {
            const res = await fetch(
                `${baseUrl}/api/${PLATFORM}/download-mp3?url=${encodeURIComponent(url)}`,
            );
            if (!res.ok) throw new Error("Gagal unduh audio");
            return res.blob();
        },
        onSuccess(blob: Blob) {
            triggerBlobDownload(blob, "facebook_audio.mp3");
        },
    });

    const downloadVideoLoading = computed(() => downloadVideoMutation.isPending.value);
    const downloadImageLoading = computed(() => downloadImageMutation.isPending.value);
    const downloadAudioLoading = computed(() => downloadAudioMutation.isPending.value);
    const downloadError = computed(() => {
        const err =
            metadataQuery.error.value ??
            downloadVideoMutation.error.value ??
            downloadImageMutation.error.value ??
            downloadAudioMutation.error.value;
        return err instanceof Error ? err.message : err ? String(err) : "";
    });

    function addToHistory(
        url: string,
        data: { title?: string; thumbnail?: string; videoUrl?: string },
    ) {
        const item: HistoryItem = {
            id: `${Date.now()}-${url.slice(-16).replace(/\W/g, "")}`,
            url,
            title: data.title?.slice(0, 80) || "Facebook Video",
            cover: data.thumbnail || "",
            type: "Video",
            date: Date.now(),
        };
        const list = [item, ...historyItems.value.filter((i: HistoryItem) => i.url !== url)].slice(
            0,
            HISTORY_MAX,
        );
        historyItems.value = list;
        saveHistoryToStorage(list);
    }

    function clearHistory() {
        historyItems.value = [];
        saveHistoryToStorage([]);
    }

    function openHistoryItem(item: HistoryItem) {
        videoUrl.value = item.url;
        searchUrl.value = item.url;
        selectedQualityIndex.value = 0;
        videoLoadFailed.value = false;
    }

    function getHistoryPreviewUrl(item: HistoryItem): string {
        return `${baseUrl}/api/${PLATFORM}/preview-image?url=${encodeURIComponent(item.url)}`;
    }

    function triggerBlobDownload(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    function onSearch() {
        const url = videoUrl.value.trim();
        if (!url) return;
        selectedQualityIndex.value = 0;
        videoLoadFailed.value = false;
        downloadVideoMutation.reset();
        downloadImageMutation.reset();
        searchUrl.value = url;
    }

    function onDownloadVideo(qualityIndex?: number) {
        const url = searchUrl.value.trim();
        if (!url || !videoInfo.value) return;
        const idx = qualityIndex ?? selectedQualityIndex.value;
        downloadVideoMutation.mutate({ url, qualityIndex: idx });
    }

    function onDownloadThumbnail() {
        const url = searchUrl.value.trim();
        if (!url) return;
        downloadImageMutation.mutate(url);
    }

    function onDownloadAudio() {
        const url = searchUrl.value.trim();
        if (!url || !videoInfo.value?.audioUrl) return;
        downloadAudioMutation.mutate(url);
    }

    function onDownloadAnother() {
        videoUrl.value = "";
        searchUrl.value = "";
        videoLoadFailed.value = false;
        document.getElementById("download-input")?.scrollIntoView({ behavior: "smooth" });
    }

    return {
        videoUrl,
        selectedQualityIndex,
        downloadLoading,
        downloadError,
        downloadVideoLoading,
        downloadImageLoading,
        videoLoadFailed,
        videoInfo,
        historyItems,
        historyReady,
        clearHistory,
        openHistoryItem,
        getHistoryPreviewUrl,
        onSearch,
        onDownloadVideo,
        onDownloadThumbnail,
        onDownloadAnother,
    };
}
