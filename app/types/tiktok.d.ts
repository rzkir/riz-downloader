type QualityOption = { label: string; url: string };

/** For YouTube: index = backend quality param, label = e.g. "720p" */
type FormatOption = { index: number; label: string };

type VideoInfo = {
  videoUrl?: string;
  videoUrlHd?: string;
  qualities?: QualityOption[];
  /** Video format options (resolution) for download/preview. Used by YouTube. */
  formatOptions?: FormatOption[];
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

interface TiktokMetadataResponse {
  videoUrl?: string;
  videoUrlNoWaterMark?: string;
  audioUrl?: string;
  images?: string[] | null;
  cover?: string;
  text?: string;
  author?: string;
}
