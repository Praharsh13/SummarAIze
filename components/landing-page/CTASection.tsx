// CTASection.tsx
import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 py-14 sm:py-20">
      {/* Background (same as Hero/Pricing) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[460px] w-[460px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/40" />
      </div>

      {/* Same container + card style */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-12">
          <div className="flex justify-center">
            <Badge className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/80 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              Ready when you are
            </Badge>
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Turn your PDFs into{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              clear summaries
            </span>{" "}
            in seconds
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/65 sm:text-lg">
            Upload a document and get a swipeable summary reel you can export, share,
            and revisit anytime.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button className="h-11 rounded-xl px-8 text-sm font-medium">
              Try SummarAIze
            </Button>

            <Button
              variant="outline"
              className="h-11 rounded-xl border-black/10 bg-white/60 px-8 text-sm font-medium text-black/80 hover:bg-white"
            >
              View demo
            </Button>
          </div>

          <p className="mt-5 text-xs text-black/50">
            No clutter, no confusion, just clean summaries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
