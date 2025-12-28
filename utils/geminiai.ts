// import { SUMMARY_SYSTEM_PROMPT } from "./prompts"
// import { GoogleGenrativeAI } from "@google/generative-ai";

// export const generateSummaryFromAI=async(pdfText:string)=>{


//     try{
//         const model=genAI.getGenerativeModel({model:"gemini-pro"})

//         const prompt= `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into engaging, easy to read summary with 
//         contextually relevent emojis and proper markdown formating:\n\n${pdfText}`

//         const result=await model.generateContent(prompt)
//         const response=await result.response
//         return response.text()
//     }catch(error:any){
//         if(error?.status===429){


//             throw new Error("RATE_LIMIT_EXCEEDED")


//         }
//         console.error("Gemini API Error:",error)
//     }

// import { SUMMARY_SYSTEM_PROMPT } from "./prompts";
// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY!,
// });

// export const generateSummaryFromAI = async (pdfText: string) => {
//   try {
//     const prompt = `
// ${SUMMARY_SYSTEM_PROMPT}

// ---

// Transform this document into an engaging, easy-to-read summary.
// Use relevant emojis and proper Markdown formatting.

// ### Document Content
// ${pdfText.slice(0, 120_000)}
// `;

//     const response = await genAI.models.generateContent({
//       model: "gemini-1.5-pro-002",
//       config: {
//         temperature: 0.7,
//         maxOutputTokens: 1500,
//       },
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     const output = response.text;
//     if (!output) throw new Error("EMPTY_AI_RESPONSE");

//     return output;
//   } catch (error: any) {
//     if (error?.status === 429) {
//       throw new Error("RATE_LIMIT_EXCEEDED");
//     }
//     console.error("Gemini API Error:", error);
//     throw new Error("AI_SUMMARY_FAILED");
//   }
// };


// }
// import { SUMMARY_SYSTEM_PROMPT } from "./prompts";
// import { GoogleGenAI } from "@google/genai";

// // const genAI = new GoogleGenAI({
// //   apiKey: process.env.GOOGLE_API_KEY,
// // });

// const apiKey = process.env.GOOGLE_API_KEY;
// if (!apiKey) throw new Error("GOOGLE_API_KEY_MISSING");

// const genAI = new GoogleGenAI({ apiKey });

// export const generateSummaryFromAI = async (pdfText: string) => {
//   try {
//     const prompt = `${SUMMARY_SYSTEM_PROMPT}

// ---

// Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper Markdown formatting.

// ### Document Content
// ${pdfText}
// `;

//     const response = await genAI.models.generateContent({
//       model: "models/gemini-1.0-pro",
//       // If your installed @google/genai supports config, keep it.
//       // If TS complains, remove config (your version may not support it).
//       config: {
//         temperature: 0.7,
//         maxOutputTokens: 1500,
//       },
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     const output = response.text;
//     if (!output) throw new Error("EMPTY_AI_RESPONSE");
//     return output;
//   } catch (error: any) {
//     const status =
//       error?.status ??
//       error?.response?.status ??
//       error?.cause?.status;
  
//     const message =
//       error?.message ??
//       error?.error?.message ??
//       error?.response?.data?.error?.message ??
//       error?.cause?.message ??
//       JSON.stringify(error, null, 2);
  
//     console.error("Gemini API Error Status:", status);
//     console.error("Gemini API Error Message:", message);
  
//     if (status === 401 || status === 403) {
//       throw new Error("GEMINI_AUTH_FAILED");
//     }
//     if (status === 429) {
//       throw new Error("RATE_LIMIT_EXCEEDED");
//     }
  
//     throw new Error(`AI_SUMMARY_FAILED: ${message}`);
//   }
// };
// import { SUMMARY_SYSTEM_PROMPT } from "./prompts";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(
//   process.env.GOOGLE_API_KEY!
// );

// export const generateSummaryFromAI = async (pdfText: string) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-pro", // ✅ ONLY model that works for you
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 1500,
//       },
//     });

//     const prompt = {contents:[{role:"user",
//     parts:[{text:SUMMARY_SYSTEM_PROMPT},{text:`Transform this document into an engaging, easy-to-read summary.
//     Use relevant emojis and proper Markdown formatting.
    
    
//     ${pdfText}`}]
// }]}


//     const result = await model.generateContent(prompt);

//     let response=result.response.text();
//     return response
//   } catch (error: any) {
//     console.error("Gemini API Error:", error);
//     throw new Error("AI_SUMMARY_FAILED");
//   }
// };
// import { SUMMARY_SYSTEM_PROMPT } from "./prompts";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// export const generateSummaryFromAI = async (pdfText: string) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-pro",
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 1500,
//       },
//     });

//     const prompt = `
// ${SUMMARY_SYSTEM_PROMPT}

// Transform this document into an engaging, easy-to-read summary.
// Use relevant emojis and proper Markdown formatting.

// ${pdfText.slice(0, 120_000)}
// `;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error: any) {
//     console.error("❌ Gemini API Error:", error);
//     throw new Error("AI_SUMMARY_FAILED");
//   }
// };

import { SUMMARY_SYSTEM_PROMPT } from "./prompts";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function generateSummaryFromAI(pdfText: string) {
  try {
    const prompt = `
${SUMMARY_SYSTEM_PROMPT}

Transform this document into an engaging, easy-to-read summary.
Use relevant emojis and proper Markdown formatting.

${pdfText.slice(0, 120_000)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,          // ✅ STRING (same as official example)
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    console.log("Gemini raw response:", response);
    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}
