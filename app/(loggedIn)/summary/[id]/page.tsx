import SummaryDetail from '@/components/summaryPage/SummaryDetails';
// import { getIndividualSummary } from '@/utils/individualSummary'
// import React from 'react'

// export type Summary = {
//     id: string;
//     title?: string | null;
//     file_name?: string | null;
//     summary_text: string;
//     original_file_url?: string | null;
//     created_at: string; // keep string for easy serialisation
//   };

// const page = async (props:{params:Promise<{id:string}>}) => {

//     const params=await props.params

//     const summary=await getIndividualSummary(params.id)
    

//     if (!summary) {
//         return (
//           <div className="mx-auto max-w-5xl px-4 py-10">
//             <div className="rounded-3xl border border-black/10 bg-white/60 p-8 text-center shadow-[0_20px_80px_-45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
//               <h1 className="text-lg font-semibold text-black/90">Summary not found</h1>
//               <p className="mt-2 text-sm text-black/60">
//                 This summary doesn’t exist, or you don’t have access to it.
//               </p>
//             </div>
//           </div>
//         );
//       }
//     const {title,summary_text,file_name,word_count,created_at}=summary
//     let readingTime= Math.ceil(word_count || 0/200)
//   return (
//      <SummaryDetail summary={summary} />
//   )
  
// }

// export default page


import { getIndividualSummary } from "@/utils/individualSummary";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params; // ✅ unwrap params first

  const summary = await getIndividualSummary(id);

  if (!summary) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-black/10 bg-white/60 p-8 text-center shadow-[0_20px_80px_-45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <h1 className="text-lg font-semibold text-black/90">Summary not found</h1>
          <p className="mt-2 text-sm text-black/60">
            This summary doesn’t exist, or you don’t have access to it.
          </p>
        </div>
      </div>
    );
  }

  const readingTime = Math.max(1, Math.ceil((summary.word_count ?? 0) / 200));

  return <SummaryDetail summary={ summary} />;
};

export default Page;
