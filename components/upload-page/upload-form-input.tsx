"use client";

import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Loader2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFormInputProp {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UploadInput = forwardRef<HTMLFormElement, UploadFormInputProp>(
  ({ onSubmit, isLoading }, formRef) => {
    return (
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="mx-auto mt-6 w-full max-w-3xl"
      >
        <div className="rounded-3xl border border-black/5 bg-white/55 px-6 py-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            {/* File input block */}
            <div className="flex flex-col">
              <label htmlFor="file" className="mb-2 text-sm font-medium text-black/70">
                Upload PDF
              </label>

              <Input
                id="file"
                type="file"
                name="file"
                accept="application/pdf"
                required
                disabled={isLoading}
                className={cn(
                  "h-11 cursor-pointer border border-black/10 bg-white",
                  "file:mr-4 file:rounded-lg file:border-0 file:bg-black/5 file:px-4 file:py-2",
                  "file:text-sm file:font-medium file:text-black/70 hover:file:bg-black/10",
                  "focus-visible:ring-2 focus-visible:ring-rose-200",
                  isLoading && "opacity-60 cursor-not-allowed file:cursor-not-allowed"
                )}
              />

              <p className="mt-1 text-xs text-black/50">PDF only, up to 10MB.</p>
            </div>

            {/* CTA */}
            <div className="flex items-end">
              <Button
                disabled={isLoading}
                type="submit"
                className={cn(
                  "h-11 rounded-xl px-6",
                  "min-w-[150px] justify-center", // prevents width jump
                  "transition-all duration-300"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

UploadInput.displayName = "UploadInput";
export default UploadInput;
