"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { UploadCloud, FileText } from "lucide-react";

interface UploadFormInputProp {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UploadInput = ({ onSubmit }: UploadFormInputProp) => {
  return (
    <form onSubmit={onSubmit} className="mx-auto mt-6 w-full max-w-3xl">
  <div className="rounded-3xl border border-black/5 bg-white/55 px-6 py-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
      
      {/* File input block */}
      <div className="flex flex-col">
        <label
          htmlFor="file"
          className="mb-2 text-sm font-medium text-black/70"
        >
          Upload PDF
        </label>

        <div className="relative">
          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            required
            className="
              h-11 cursor-pointer border border-black/10 bg-white
              file:mr-4 file:rounded-lg file:border-0
              file:bg-black/5 file:px-4 file:py-2
              file:text-sm file:font-medium file:text-black/70
              hover:file:bg-black/10
            "
          />
        </div>

        <p className="mt-1 text-xs text-black/50">
          PDF only, up to 10MB.
        </p>
      </div>

      {/* CTA aligned perfectly */}
      <div className="flex items-end">
        <Button
          type="submit"
          className="h-11 rounded-xl px-6"
        >
          Upload PDF
        </Button>
      </div>

    </div>
  </div>
</form>

  );
};

export default UploadInput;
