// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

// export async function fetchAndExtractPdfText(fileUrl:string) {

//     const response = await fetch(fileUrl)

//     const blob=await response.blob()

//     const arrayBuffer = await blob.arrayBuffer()

//     const loader = new PDFLoader(new Blob([arrayBuffer]))

//     const docs = await loader.load()

//     return docs.map((docs)=> docs.pageContent).join('\n')
    
// }
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`);

  const blob = await response.blob();

  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  return docs.map((d) => d.pageContent).join("\n");}

// import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

// export async function fetchAndExtractPdfText(fileUrl: string) {
//   const response = await fetch(fileUrl);
//   if (!response.ok) {
//     throw new Error("Failed to fetch PDF");
//   }

//   const blob = await response.blob();

//   // ✅ web/pdf loader expects a Blob
//   const loader = new WebPDFLoader(blob);

//   const docs = await loader.load();
//   return docs.map((doc) => doc.pageContent).join("\n");
// }