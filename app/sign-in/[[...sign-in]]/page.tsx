import { SignIn } from '@clerk/nextjs'

import React from "react";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-14 sm:py-20">
      {/* Background (same as your other sections) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[460px] w-[460px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/40" />
      </div>

      {/* Container card (same style) */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-12">
          <div className="flex justify-center">
            <Badge className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/80 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              Login to your account
            </Badge>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Start using{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              SummarAIze
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-black/65 sm:text-lg">
            Sign in to generate clean summaries, export notes, and share your reels.
          </p>

          {/* Clerk form */}
          <div className="mt-8 flex justify-center">
            <SignIn
              appearance={{
                variables: {
                  colorPrimary: "#e11d48", // rose-600 vibe
                  borderRadius: "14px",
                  fontSize: "14px",
                },
                elements: {
                  card: "shadow-none border border-black/10 bg-white/70 backdrop-blur-xl",
                  headerTitle: "text-black",
                  headerSubtitle: "text-black/60",
                  socialButtonsBlockButton:
                    "border border-black/10 bg-white hover:bg-white/90 text-black",
                  formButtonPrimary:
                    "bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 text-white hover:opacity-95 transition",
                  formFieldInput:
                    "border border-black/10 bg-white text-black focus:ring-2 focus:ring-rose-200",
                  dividerLine: "bg-black/10",
                  dividerText: "text-black/50",
                  footerActionText: "text-black/60",
                  footerActionLink: "text-rose-600 hover:text-rose-700",
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
