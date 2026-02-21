type VideoInfo = {
    videoUrl?: string;
    previewVideoUrl?: string;
    audioUrl?: string;
    images?: string[];
    cover?: string;
    text?: string;
    author?: string;
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