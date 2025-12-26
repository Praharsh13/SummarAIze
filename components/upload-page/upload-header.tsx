import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 py-12 sm:py-16">
      {/* Background (same as earlier pages) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[360px] w-[360px] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/40" />
      </div>

      {/* Container card */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-8 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-10">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/80 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              AI-powered content creation
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Start uploading your{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              PDFs
            </span>
          </h1>

          {/* Subheading */}
          <h3 className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/65 sm:text-lg">
            Upload your document and watch it transform into a clean, easy-to-read
            summary in seconds.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Header;
