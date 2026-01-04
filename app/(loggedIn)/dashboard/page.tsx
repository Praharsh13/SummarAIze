import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import SummaryCard from "@/components/dashboard/Summary-Card";
import { getSummaries } from "@/utils/summaries";
import EmptySummaryState from "@/components/dashboard/EmptySummaryState";

const SummaryPage = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/sign-in");

  const userId = user.id;
  const uploadLimit = 5;

  const summaries = await getSummaries(userId);

  return (
    <section className="relative">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute right-[-120px] top-[120px] h-[340px] w-[340px] rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-sm text-black/70 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Your Library
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Your Summaries
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/60 sm:text-base">
              View, revisit, and share your previously generated summaries. Everything stays organised here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="h-11 rounded-xl px-5 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.35)] transition hover:-translate-y-[1px]"
            >
              <Link href="/upload">New Summary</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-black/10 bg-white/60 px-5 text-black/80 backdrop-blur transition hover:bg-white"
            >
              <Link href="/#pricing">Upgrade</Link>
            </Button>
          </div>
        </div>

        {/* upgrade banner */}
        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-50/70 p-4 text-sm text-amber-900 shadow-sm backdrop-blur sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-relaxed">
              You’ve reached the limit of <span className="font-semibold">{uploadLimit}</span> uploads on the Basic plan.
              <span className="ml-1">
                Upgrade to Pro for unlimited uploads.
              </span>
            </p>

            <Link
              href="/#pricing"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700"
            >
              View plans
            </Link>
          </div>
        </div>

        {/* list */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black/80">
              History ({summaries?.length ?? 0})
            </h2>
            <p className="text-xs text-black/50">Newest first</p>
          </div>

          {summaries?.length===0 ? 
          <EmptySummaryState/>
           
           : (

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summaries.map((summary: any) => (
              <div
                key={summary.id}
                
              >
                <SummaryCard summary={summary} />
              </div>
             
            ))}
             </div>
          
            // <div className="mt-10 rounded-2xl border border-dashed border-black/15 bg-white/40 p-8 text-center backdrop-blur">
            //   <p className="text-base font-semibold text-black/80">No summaries yet</p>
            //   <p className="mt-1 text-sm text-black/55">
            //     Upload your first PDF and your summaries will show up here.
            //   </p>

            //   <Button asChild className="mt-5 h-11 rounded-xl px-6">
            //     <Link href="/upload">Create your first summary</Link>
            //   </Button>
            // </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SummaryPage;
