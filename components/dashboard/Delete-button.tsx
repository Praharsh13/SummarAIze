"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

type DeleteButtonProps = {
  summaryId: string;
  onConfirm: (summaryId: string) => Promise<void> | void;
  isLoading?: boolean;
};

const DeleteButton = ({ summaryId, onConfirm, isLoading }: DeleteButtonProps) => {
  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    stop(e);
    await onConfirm(summaryId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={stop}
          className="h-9 w-9 rounded-xl border border-black/10 bg-white/60 text-black/45 shadow-sm backdrop-blur transition hover:border-red-500/20 hover:bg-red-50 hover:text-red-600"
          aria-label="Delete summary"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        onClick={stop}
        className="rounded-2xl border border-black/10 bg-white/80 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-black/90">
            Delete this summary?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm leading-relaxed text-black/60">
            This action can’t be undone. The summary will be removed permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-3">
          <AlertDialogCancel
            onClick={stop}
            className="h-10 rounded-xl border border-black/10 bg-white/60 text-black/70 backdrop-blur transition hover:bg-white"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="h-10 rounded-xl bg-red-600 px-5 text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;

