"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
  Sparkles,
  Clock,
  Hash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Summary = {
  id: string;
  title?: string | null;
  file_name?: string | null;
  summary_text: string;
  original_file_url?: string | null;
  created_at: string | Date;
};

const stripMarkdown = (md: string) => {
  let text = md || "";
  text = text.replace(/```[\s\S]*?```/g, (block) =>
    block.replace(/```[\w-]*\n?/g, "").replace(/```/g, "")
  );
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/^>\s?/gm, "");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");
  text = text.replace(/^\s*[-*+]\s+/gm, "• ");
  text = text.replace(/^\s*\d+\.\s+/gm, "• ");
  text = text.replace(/^---$/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text;
};

function countWords(text: string) {
  return (text || "")
    .replace(/[#>*_`-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function countChars(text: string) {
  return (text || "").replace(/\s/g, "").length;
}

function estimateReadTime(words: number) {
  return Math.max(1, Math.round(words / 200));
}

function cleanHeading(raw: string) {
  return (raw || "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim() || "Section";
}

/**
 * Reel slides:
 * - Overview slide = content before first ## only if meaningful
 * - Each ## becomes a slide
 * - No empty slides
 */
function buildSlides(markdown: string) {
  const raw = markdown || "";
  const lines = raw.split("\n");

  const beforeFirstH2: string[] = [];
  const sections: { title: string; body: string }[] = [];

  let currentTitle: string | null = null;
  let currentBody: string[] = [];

  const pushCurrent = () => {
    if (!currentTitle) return;
    const body = currentBody.join("\n").trim();
    if (!body) return; // ✅ no empty slide
    sections.push({ title: currentTitle, body });
  };

  for (const line of lines) {
    // ignore H1 (page title already shown)
    if (/^#\s+/.test(line)) continue;

    const h2 = line.match(/^##\s+(.*)\s*$/);

    if (!currentTitle) {
      if (h2) {
        currentTitle = cleanHeading(h2[1]);
        currentBody = [];
      } else {
        beforeFirstH2.push(line);
      }
      continue;
    }

    if (h2) {
      pushCurrent();
      currentTitle = cleanHeading(h2[1]);
      currentBody = [];
      continue;
    }

    currentBody.push(line);
  }

  pushCurrent();

  const overview = beforeFirstH2.join("\n").trim();
  const overviewMeaningful = overview.replace(/[\s_*`>#-]/g, "").length > 20;

  const slides: { title: string; body: string }[] = [];

  if (overviewMeaningful) {
    slides.push({ title: "Overview", body: overview });
  }

  slides.push(...sections);

  // If no H2 at all, make a single slide from all content
  if (!slides.length) {
    const fallback = raw.trim();
    if (fallback) slides.push({ title: "Summary", body: fallback });
  }

  return slides;
}

export default function SummaryDetail({ summary }: { summary: Summary }) {
  const title =
    summary.title?.trim() || summary.file_name?.trim() || "AI Summary";

  const createdAt = useMemo(
    () => new Date(summary.created_at),
    [summary.created_at]
  );

  const stats = useMemo(() => {
    const words = countWords(summary.summary_text);
    const chars = countChars(summary.summary_text);
    const mins = estimateReadTime(words);
    return { words, chars, mins };
  }, [summary.summary_text]);

  const slides = useMemo(() => buildSlides(summary.summary_text), [summary.summary_text]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(idx, slides.length - 1));
    const slideWidth = el.clientWidth;
    el.scrollTo({ left: next * slideWidth, behavior: "smooth" });
  };

  const onPrev = () => scrollToIndex(active - 1);
  const onNext = () => scrollToIndex(active + 1);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.max(0, Math.min(i, slides.length - 1)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const downloadPlainText = () => {
    const fileBase =
      (summary.file_name || "summary")
        .replace(/\.[^/.]+$/, "")
        .replace(/[^\w-]+/g, "_") || "summary";

    const plain = stripMarkdown(summary.summary_text);
    const blob = new Blob([plain], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileBase}_summary.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-indigo-50">
      {/* top bar */}
      <div className="sticky top-0 z-30 border-b border-black/5 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-xs font-semibold text-black/70">
              <Sparkles className="h-4 w-4 text-rose-600" />
              AI Summary
            </span>

            <span className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-xs text-black/60 sm:inline-flex">
              <Clock className="h-4 w-4" />
              {format(createdAt, "MMM d, yyyy")}
            </span>

            <span className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 text-xs text-black/60 sm:inline-flex">
              <FileText className="h-4 w-4" />
              {stats.mins} min read
            </span>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm font-semibold text-black/70 shadow-sm transition hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* header card */}
        <div className="rounded-3xl border border-black/10 bg-white/75 p-6 shadow-[0_18px_70px_-45px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <h1 className="text-2xl font-semibold tracking-tight text-black/90 sm:text-3xl">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5">
              <FileText className="h-4 w-4" />
              Source: {summary.file_name || "PDF"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5">
              <Hash className="h-4 w-4" />
              {stats.chars.toLocaleString()} chars, {stats.words.toLocaleString()} words
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {summary.original_file_url ? (
              <a
                href={summary.original_file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black/70 shadow-sm transition hover:bg-white"
              >
                <ExternalLink className="h-4 w-4" />
                View original
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-sm text-black/45">
                <ExternalLink className="h-4 w-4" />
                Original not available
              </div>
            )}

            <button
              onClick={downloadPlainText}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
            >
              <Download className="h-4 w-4" />
              Download summary (.txt)
            </button>
          </div>
        </div>

        {/* REEL CAROUSEL */}
        <div className="mt-6 rounded-3xl border border-black/10 bg-white/75 shadow-[0_18px_70px_-45px_rgba(0,0,0,0.32)] backdrop-blur-xl overflow-hidden">
          {/* Top controls */}
          <div className="flex items-center justify-between border-b border-black/5 bg-white/70 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-black/80">Summary Reel</span>
              <span className="text-xs text-black/45">
                Swipe to read, {slides.length} cards
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={active === 0}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-black/70 shadow-sm transition disabled:opacity-40 hover:bg-white"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={onNext}
                disabled={active === slides.length - 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/90 text-black/70 shadow-sm transition disabled:opacity-40 hover:bg-white"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Swipe area */}
          <div className="relative">
            <div
              ref={scrollerRef}
              className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {/* hide scrollbar (webkit) */}
              <style>{`
                .reel::-webkit-scrollbar { display: none; }
              `}</style>

              {slides.map((s, i) => (
                <div
                  key={`${s.title}-${i}`}
                  className="reel w-full flex-none snap-center p-5 sm:p-7"
                >
                  <div className="mx-auto max-w-2xl">
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold text-black/40">
                          {String(i + 1).padStart(2, "0")} /{" "}
                          {String(slides.length).padStart(2, "0")}
                        </div>
                        <h2 className="mt-1 text-xl font-semibold tracking-tight text-black/90 sm:text-2xl">
                          {s.title}
                        </h2>
                      </div>

                      <div className="rounded-full border border-black/10 bg-white/85 px-3 py-1.5 text-xs font-semibold text-black/60">
                        Reel
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/85 p-5 shadow-sm">
                      <article className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-li:my-1 prose-a:text-rose-700">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h3 className="mt-4 text-sm font-semibold text-black/70">
                                {children}
                              </h3>
                            ),
                            h2: ({ children }) => (
                              <h3 className="mt-4 text-sm font-semibold text-black/70">
                                {children}
                              </h3>
                            ),
                            h3: ({ children }) => (
                              <h4 className="mt-3 text-sm font-semibold text-black/65">
                                {children}
                              </h4>
                            ),
                            code: ({ children, className }) => {
                              const isBlock = (className || "").includes("language-");
                              if (isBlock) {
                                return (
                                  <pre className="overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                                    <code className={className}>{children}</code>
                                  </pre>
                                );
                              }
                              return (
                                <code className="rounded-md border border-black/10 bg-black/[0.03] px-1.5 py-0.5 text-[0.95em]">
                                  {children}
                                </code>
                              );
                            },
                            blockquote: ({ children }) => (
                              <blockquote className="rounded-2xl border border-black/10 bg-white/80 px-5 py-4">
                                {children}
                              </blockquote>
                            ),
                            hr: () => <div className="my-6 h-px w-full bg-black/10" />,
                          }}
                        >
                          {s.body}
                        </ReactMarkdown>
                      </article>
                    </div>

                    {/* Bottom hint */}
                    <div className="mt-4 flex items-center justify-between text-xs text-black/45">
                      <span>Swipe left/right</span>
                      <span>Use ← → keys too</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 border-t border-black/5 bg-white/70 px-5 py-4">
              {slides.map((_, i) => {
                const on = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={[
                      "h-2.5 rounded-full transition",
                      on ? "w-7 bg-rose-600" : "w-2.5 bg-black/15 hover:bg-black/25",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
