"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string };

export function ResumePdfViewer({ src }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const root = wrapRef.current;

    async function run() {
      setLoading(true);
      setError(null);
      if (root) root.innerHTML = "";

      try {
        const pdfjs = await import("pdfjs-dist");
        const pdfjsWithWorker = pdfjs as typeof import("pdfjs-dist") & {
          GlobalWorkerOptions: { workerSrc: string };
        };
        pdfjsWithWorker.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const task = pdfjsWithWorker.getDocument({
          url: src,
          withCredentials: false,
        });
        const doc = await task.promise;

        if (cancelled || !root) {
          await task.destroy();
          return;
        }

        const container = root;
        const maxWidth = Math.min(container.clientWidth || 800, 900);

        for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
          if (cancelled) break;
          const page = await doc.getPage(pageNum);
          const baseVp = page.getViewport({ scale: 1 });
          const scale = Math.min(2, maxWidth / baseVp.width);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas not available");

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.className =
            "mx-auto block max-h-none max-w-full bg-white";

          const pageWrap = document.createElement("div");
          pageWrap.className = "mb-6 flex justify-center last:mb-0";
          pageWrap.appendChild(canvas);
          container.appendChild(pageWrap);

          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        }

        await task.destroy();
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load PDF");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
      if (root) root.innerHTML = "";
    };
  }, [src]);

  return (
    <div data-lenis-prevent className="relative min-h-[min(80svh,56rem)] overflow-y-auto  sm:p-6">
      {loading ? (
        <p className="py-16 text-center font-mono text-sm text-white/75">Loading PDF…</p>
      ) : null}
      {error ? (
        <p className="py-8 text-center font-mono text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : null}
      <div ref={wrapRef} className={loading ? "opacity-0" : ""} />
    </div>
  );
}
