// import React from 'react'
// import { Card } from '../ui/card'
// import Deletebutton from './Delete-button'
// import Link from 'next/link'
// import { FileText } from 'lucide-react'
// import {formatDistanceToNow} from 'date-fns'


// const CompletedMark= ({status}:{status:string})=>{

//     return (
//         <>
//         {status=='completed' ? 
//         <p className='px-3 py-1 text-xs rounded-full bg-green-100 text-green-800'>Completed</p> :
//         <p className='px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800'>{status} </p>}
//         </>
//     )

// }

// const SummaryCard = ({summary}:{summary:any}) => {
//   return (
//     <div>

//         <Card>
//             <FileText/>
//             <div>
//                 <Deletebutton/>
//             </div>
//             <Link href={`/summary/${summary.id}`}>
//                 <h3>{summary.title}</h3>
//                 <p>{summary.summary_text}</p>

//                 <p>{formatDistanceToNow(new Date(summary.created_at),{addSuffix:true})}</p>
//                {/*<p>{summary.original_file_url}</p>*/} 
//                 <div>
//                     <CompletedMark status={summary.status}/>
//                 </div>
//                 <Deletebutton/>
//             </Link>
//         </Card>
//     </div>
//   )
// }

// export default SummaryCard

import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import DeleteButton from "./Delete-button";
import { cn, formatFileName } from "@/lib/utils";
import { deleteSummary } from "@/actions/summary-actions";

const StatusPill = ({ status }: { status: string }) => {
  const isCompleted = status === "completed";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        isCompleted
          ? "border-green-500/20 bg-green-500/10 text-green-700"
          : "border-amber-500/25 bg-amber-500/10 text-amber-700"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isCompleted ? "bg-green-600" : "bg-amber-600"
        )}
      />
      {isCompleted ? "Completed" : status}
    </span>
  );
};

const SummaryCard = ({ summary }: { summary: any }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/55 p-5 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:-translate-y-[2px] hover:bg-white/70">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-rose-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute -right-24 -bottom-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>

      {/* top row */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs text-black/70 backdrop-blur">
          <FileText className="h-4 w-4 text-black/60" />
          <span className="font-medium">
            {summary.file_name || "PDF"}
          </span>
        </div>

        {/* delete button (doesn't navigate) */}
        <DeleteButton summaryId={summary.id} onConfirm={async(id)=>{
            deleteSummary({summaryId:id}
                )
        }} />
      </div>

      {/* content */}
      <Link href={`/summary/${summary.id}`} className="relative mt-4 block">
        <h3 className="line-clamp-2 text-base font-semibold tracking-tight text-black/90">
          {summary.title || formatFileName(summary.original_file_url)}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/60">
          {summary.summary_text}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusPill status={summary.status} />
            <span className="text-xs text-black/45">
              {formatDistanceToNow(new Date(summary.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-semibold text-black/60 transition group-hover:text-black/80">
            View <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SummaryCard;
