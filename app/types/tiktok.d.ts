type QualityOption = { label: string; url: string };

type VideoInfo = {
    videoUrl?: string;
    videoUrlHd?: string;
    qualities?: QualityOption[];
    previewVideoUrl?: string;
    audioUrl?: string;
    images?: string[];
    cover?: string;
    previewImageUrls?: string[];
    text?: string;
    author?: string;
    duration?: string;
    durationMs?: number;
    id?: string;
};

type HistoryItem = {
    id: string;
    url: string;
    title: string;
    author?: string;
    cover: string;
    type: "Video" | "Music" | "Image";
    date: number;
};