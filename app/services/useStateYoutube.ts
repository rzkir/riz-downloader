import { ref, computed, watch, onMounted } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { useAppConfig } from "~/lib/config";

const HISTORY_STORAGE_KEY = "youtube-download-history";
const HISTORY_MAX = 50;
const PLATFORM = "youtube";

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

interface YoutubeFormat {
  itag: number;
  qualityLabel: string | null;
  mimeType: string | null;
  isAudioOnly: boolean;
}

interface YoutubeMetadataResponse {
  id?: string | null;
  title?: string | null;
  duration?: string | null;
  durationSeconds?: number | null;
  thumbnail?: string | null;
  formats?: YoutubeFormat[] | null;
}

function buildVideoInfo(
  data: YoutubeMetadataResponse,
  baseUrl: string,
  url: string,
): VideoInfo {
  const formats = data.formats ?? [];
  const hasVideo = formats.some((f) => !f.isAudioOnly);
  const hasAudio = formats.some((f) => f.isAudioOnly);
  const firstVideoIndex = formats.findIndex((f) => !f.isAudioOnly);

  const qualityParam =
    hasVideo && firstVideoIndex > 0 ? `&quality=${firstVideoIndex}` : "";

  const previewVideoUrl = hasVideo
    ? `${baseUrl}/api/${PLATFORM}/preview-video?url=${encodeURIComponent(
        url,
      )}${qualityParam}`
    : undefined;

  return {
    videoUrl: undefined,
    videoUrlHd: undefined,
    qualities: undefined,
    previewVideoUrl,
    audioUrl: hasAudio ? "available" : undefined,
    images: undefined,
    cover: data.thumbnail ?? undefined,
    previewImageUrls: undefined,
    text: data.title ?? undefined,
    author: undefined,
    duration: data.duration ?? undefined,
    durationMs: data.durationSeconds ?? undefined,
    id: data.id ?? undefined,
  };
}

export function useStateYoutube() {
  const { apiUrl } = useAppConfig();
  const baseUrl = apiUrl;

  const videoUrl = ref("");
  const searchUrl = ref("");
  const imageIndex = ref(0);
  const videoLoadFailed = ref(false);
  const historyItems = ref<HistoryItem[]>([]);
  const historyReady = ref(false);

  onMounted(() => {
    historyItems.value = loadHistoryFromStorage();
    historyReady.value = true;
  });

  const metadataQuery = useQuery({
    queryKey: [PLATFORM, "metadata", searchUrl] as const,
    queryFn: async () => {
      const res = await fetch(
        `${baseUrl}/api/${PLATFORM}/metadata?url=${encodeURIComponent(
          searchUrl.value,
        )}`,
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message ?? data.error ?? "Gagal mengambil data");
      return data as YoutubeMetadataResponse;
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
      });
  });

  const downloadVideoMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch(
        `${baseUrl}/api/${PLATFORM}/download?url=${encodeURIComponent(url)}`,
      );
      if (!res.ok) throw new Error("Gagal unduh video");
      return res.blob();
    },
    onSuccess(blob: Blob) {
      triggerBlobDownload(blob, "youtube_video.mp4");
    },
  });

  const downloadMp3Mutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch(
        `${baseUrl}/api/${PLATFORM}/download-mp3?url=${encodeURIComponent(url)}`,
      );
      if (!res.ok) throw new Error("Gagal unduh audio");
      return res.blob();
    },
    onSuccess(blob: Blob) {
      triggerBlobDownload(blob, "youtube_audio.mp3");
    },
  });

  const downloadVideoLoading = computed(() => downloadVideoMutation.isPending.value);
  const downloadMp3Loading = computed(() => downloadMp3Mutation.isPending.value);
  const downloadImagesLoading = computed(() => false);
  const downloadError = computed(() => {
    const err =
      metadataQuery.error.value ??
      downloadVideoMutation.error.value ??
      downloadMp3Mutation.error.value;
    return err instanceof Error ? err.message : err ? String(err) : "";
  });

  function addToHistory(
    url: string,
    data: { title?: string; thumbnail?: string },
  ) {
    const item: HistoryItem = {
      id: `${Date.now()}-${url.slice(-16).replace(/\W/g, "")}`,
      url,
      title: data.title?.slice(0, 80) || "YouTube Video",
      author: undefined,
      cover: data.thumbnail || "",
      type: "Video",
      date: Date.now(),
    };
    const list = [
      item,
      ...historyItems.value.filter((i: HistoryItem) => i.url !== url),
    ].slice(0, HISTORY_MAX);
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
    imageIndex.value = 0;
    videoLoadFailed.value = false;
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
    imageIndex.value = 0;
    videoLoadFailed.value = false;
    downloadVideoMutation.reset();
    downloadMp3Mutation.reset();
    searchUrl.value = url;
  }

  function onDownloadVideo() {
    const url = searchUrl.value.trim();
    if (!url || !videoInfo.value) return;
    downloadVideoMutation.mutate(url);
  }

  function onDownloadMp3() {
    const url = searchUrl.value.trim();
    if (!url || !videoInfo.value) return;
    downloadMp3Mutation.mutate(url);
  }

  function onDownloadImages() {
    // Not used for YouTube (no image-only posts)
  }

  function onDownloadAnother() {
    videoUrl.value = "";
    searchUrl.value = "";
    imageIndex.value = 0;
    videoLoadFailed.value = false;
    document
      .getElementById("download-input")
      ?.scrollIntoView({ behavior: "smooth" });
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
    historyReady,
    clearHistory,
    openHistoryItem,
    onSearch,
    onDownloadVideo,
    onDownloadMp3,
    onDownloadImages,
    onDownloadAnother,
  };
}

