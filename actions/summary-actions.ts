// "use server"

// import { getDBConnection } from "@/lib/db"
// import { currentUser } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";




// export async function deleteSummary({summaryId}:{summaryId:string}){
//    try {

//     console.log(summaryId)

//     let sql= await getDBConnection()
//     const user = await currentUser();
//   if (!user?.id) {
//     throw new Error('User Not found')
//   }

//   const userId = user.id;

//     let result= await sql`
//     DELETE FROM pdf_summaries
// WHERE id = ${summaryId}
//   AND user_id = ${userId}
//   RETURNING id;
// `;

// if(result.length>0){
//     revalidatePath('/dashboard')
//     return {success:true}
// }
// return {success:true}
// }
    
//     catch (error) {

//         console.log('Error in deleting summary',error)

//         return {success:false}
    
//    }
// } 

"use server";

import { getDBConnection } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
  const user = await currentUser();
  console.log("1.summary.id", summaryId);


  if (!user?.id) return { success: false, message: "Not authenticated" };

  let userId=user.id

  const sql = await getDBConnection();

  const result = await sql`
    DELETE FROM pdf_summaries
    WHERE id = ${summaryId}
      AND user_id = ${userId}
    RETURNING id;
  `;

  if (result.length === 0) {
    return { success: false, message: "Nothing deleted (not found or not yours)" };
  }

  // IMPORTANT: revalidate the page that lists summaries
  revalidatePath("/dashboard"); // <-- change to your real list route

  return { success: true };
}
