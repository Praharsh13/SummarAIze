import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[460px] w-[460px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        {/* subtle vignette so centre pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/40" />
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-12">
          {/* Badge */}
          <div className="flex justify-center">
          <Badge
  className="
    inline-flex items-center gap-2
    rounded-full border border-slate-200
    bg-white px-4 py-1.5
    text-sm font-medium text-slate-700
    shadow-sm
  "
>
  <Sparkles className="h-4 w-4 text-rose-500" />
  Powered by AI
</Badge>
          </div>

          {/* Headings */}
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
            Transform PDFs into{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              concise summaries
            </span>
          </h1>

          <h2 className="mt-4 text-base leading-relaxed text-black/65 sm:text-lg">
            Get a beautiful summary reel of your documents in seconds.
          </h2>

         
          <div className="mt-8 flex justify-center">
            <Button
              className="
                relative h-11 overflow-hidden rounded-xl px-8 text-sm font-medium text-white
                bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600
                shadow-[0_12px_30px_-12px_rgba(225,29,72,0.55)]
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-16px_rgba(124,58,237,0.55)]
                active:translate-y-0
              "
            >
              {/* gradient shift layer */}
              <span className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-r from-cyan-600 via-purple-600 to-rose-600" />
              <span className="relative">Try SummarAIze</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
