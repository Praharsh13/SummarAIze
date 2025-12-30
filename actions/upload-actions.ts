"use server";

import { getDBConnection } from "@/lib/db";
import { generateSummaryFromAI } from "@/utils/geminiai";
import { fetchAndExtractPdfText } from "@/utils/langchain";
import { auth } from "@clerk/nextjs/server";
import { Save } from "lucide-react";

interface PDFSummaryType{

  fileUrl:string,title?:string,fileName?:string,summary:string

}

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

    let summary;
    try{
        summary=await generateSummaryFromAI(pdfText)
        console.log({summary})

    }catch(error){
        console.log(error)
    }

    if(!summary){

        return {
            success: false,
            message: "Failed to generate Summary",
            data: null
        
    }
}

    // ✅ RETURN something to the client
    return {
      success: true,
      message: "PDF parsed",
      data: {
        userId,
        fileName,
        text: pdfText,
        summary
      },
    };
  } catch (error: any) {
    return { success: false, message: error?.message || "Parse failed", data: null };
  }
}



//Saving into database

// async function savePDFSummary({userId,fileUrl,title,fileName,summary}
//   :{userId:string,fileUrl:string,title:string | null,fileName:string | null,summary:string}){
//   try {

//     const sql=await getDBConnection()

//     await sql 
//     `INSERT INTO pdf_summaries (
//       user_id,
//       original_file_url,
//       summary_text,
//       title,
//       file_name
//     )
//     VALUES (
//       ${userId},
//       ${fileUrl},
//       ${summary},
//       ${title}
//       ${fileName},
      
//     )
//   `
    
    
//   } catch (error) {
//     console.log('Error saving PDF Summary',error)
//     throw error
//   }
// }

async function savePDFSummary({
  userId,
  fileUrl,
  title,
  fileName,
  summary,
}: {
  userId: string;
  fileUrl: string;
  title: string | null;
  fileName: string | null;
  summary: string;
}) {
  try {
    const sql = await getDBConnection();

    const rows = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      )
      VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING *;
    `;

    return rows[0];
  } catch (error) {
    console.error("Error saving PDF Summary", error);
    throw error;
  }
}

export async function storedPDFSummaryAction({
  fileUrl,
  
  title,
  fileName,
  summary}:PDFSummaryType){
  //check user is logedIn or not
  //save pdf summary

  console.log("SERVER RECEIVED fileUrl:", fileUrl);
  
  let saveSummary:any
  try {

    const {userId}=await auth()
    if(!userId){
      return {
        success:false,
        message:'User not found'
      }
    }

    saveSummary = await savePDFSummary({
      userId,
      fileUrl,
      
      title: title ?? null,
      fileName:fileName ?? null ,
      summary,
    })

    if(!saveSummary){
      return{
        success:false,
        message:'Failed to save PDF summary, please try again...'
      }
    }
    return {
      success:true,
      message:'PDF SUMMARY SAVED SUCCESSFULLY'
    }

    
  } catch (error) {

    return{
      success:false,
      message:
      error instanceof Error ? error.message :'Error saving PDF summary'
    }
    
  }
}
