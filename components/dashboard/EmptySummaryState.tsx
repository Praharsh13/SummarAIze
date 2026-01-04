"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const EmptySummaryState = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-black/10 bg-white/60 px-6 text-center shadow-[0_20px_80px_-45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
        <FileText className="h-7 w-7 text-black/50" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-black/90">
        No PDF summaries yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-black/60">
        You haven’t uploaded any PDFs so far. Start by adding a document and let
        the AI do the hard work for you.
      </p>

      <Button asChild className="mt-6 rounded-xl px-6">
        <Link href="/upload" className="flex items-center gap-2">
          Start summarising
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default EmptySummaryState;
