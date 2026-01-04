//Get individual summary from summaries from database

// import { getDBConnection } from "@/lib/db";

// export async function getIndividualSummary(id:string){

//     try {
//         const sql= await getDBConnection()
//         const [summary]=await sql`SELECT 
//         id,
//         user_id,
//         title,
//         original_file_url,
//         summary_text,
//         status,
//         created_at,
//         updated_at,
//         file_name,
//         LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ',''))+1 as word_count 
//         FROM pdf_summaries where id=${id}`;

//         return summary
//     } catch (error) {

//         console.log('Error in fetching summary by id',error)
//         return null
        
//     }


// }

import { getDBConnection } from "@/lib/db";

export type Summary = {
  id: string;
  title?: string | null;
  file_name?: string | null;
  summary_text: string;
  original_file_url?: string | null;
  created_at: string;
  word_count?: number | null; // optional if you use it
};

export async function getIndividualSummary(id: string): Promise<Summary | null> {
  const sql = await getDBConnection();

  const result = await sql`
    SELECT 
      id,
      title,
      file_name,
      summary_text,
      original_file_url,
      created_at,
      LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ',''))+1 as word_count 
    FROM pdf_summaries
    WHERE id = ${id}
    LIMIT 1;
  `;

  const row = result?.[0];
  if (!row) return null;

  // ✅ normalise to your type (stringify important fields)
  return {
    id: String(row.id),
    title: row.title ?? null,
    file_name: row.file_name ?? null,
    summary_text: String(row.summary_text),
    original_file_url: row.original_file_url ?? null,
    created_at: new Date(row.created_at).toISOString(),
    word_count: row.word_count ?? null,
  };
}
