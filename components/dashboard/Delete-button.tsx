"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
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
import { deleteSummary } from "@/actions/summary-actions";

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
  const router = useRouter();
  console.log("2summary.id", summaryId);


  const stopLinkNavigation = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ enough to prevent Link/card click
  };

  const handleDelete = async () => {
    const result = await deleteSummary({ summaryId });
    console.log("delete result:", result);

    if (result?.success) {
      router.refresh();
    } else {
      // at least you’ll see *why* it failed
      alert(result?.message ?? "Delete failed");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={stopLinkNavigation}
          className="h-9 w-9 rounded-xl border border-black/10 bg-white/60 text-black/40 backdrop-blur transition hover:bg-red-50 hover:text-red-600"
          aria-label="Delete summary"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl border border-black/10 bg-white/85 shadow-xl backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            Delete summary?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-black/60">
            This action cannot be undone. The summary will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-xl">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              className="rounded-xl bg-red-600 px-5 text-white hover:bg-red-700"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
