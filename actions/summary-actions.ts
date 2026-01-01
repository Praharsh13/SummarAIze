"use server"

import { getDBConnection } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";




export async function deleteSummary({summaryId}:{summaryId:string}){
   try {

    let sql= await getDBConnection()
    const user = await currentUser();
  if (!user?.id) {
    throw new Error('User Not found')
  }

  const userId = user.id;

    let result= await sql`
    DELETE FROM pdf_summaries
WHERE id = ${summaryId}
  AND user_id = ${userId}
  RETURNING id;
`;

if(result.length>0){
    revalidatePath('/dashboard')
    return {success:true}
}
return {success:true}
}
    
    catch (error) {

        console.log('Error in deleting summary',error)

        return {success:false}
    
   }
} 