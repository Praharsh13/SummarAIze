"use server";

import { fetchAndExtractPdfText } from "@/utils/langchain";

type UploadResponse = Array<{
  serverData: {
    userId: string;
    file: {
      ufsUrl: string; // ✅ use ufsUrl (not ufsUrl renamed wrong)
      name: string;
    };
  };
}>;

export async function generatePdfSummary(uploadResponse: UploadResponse) {
  if (!uploadResponse?.length) {
    return { success: false, message: "File not uploaded", data: null };
  }

  const {
    serverData: {
      userId,
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, message: "Missing PDF URL", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    // ✅ RETURN something to the client
    return {
      success: true,
      message: "PDF parsed",
      data: {
        userId,
        fileName,
        text: pdfText,
      },
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Parse failed", data: null };
  }
}
