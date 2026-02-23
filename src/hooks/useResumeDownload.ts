import { useState, useCallback } from "react";

interface UseResumeDownloadResult {
  isDownloading: boolean;
  error: string | null;
  downloadResume: () => Promise<void>;
}

export function useResumeDownload(): UseResumeDownloadResult {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadResume = useCallback(async () => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch("/api/resume");

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "nathaniel-bowman_resume.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { isDownloading, error, downloadResume };
}
