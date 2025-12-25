// WorkDemo.tsx
import { BrainCircuit, FileOutput, FileText } from "lucide-react";
import { ReactNode } from "react";
import ElementCard from "../reusable/Howtousecard";

export type Steps = {
  icon: ReactNode;
  label: string;
  description: string;
};

const WorkDemo = () => {
  const workDisplay: Steps[] = [
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Upload PDF",
      description: "Drop your document in and we’ll organise it into clean sections."
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      label: "AI Analyses",
      description: "We extract key points and structure, quickly and accurately."},
    {
      icon: <FileOutput className="h-5 w-5" />,
      label: "Get Summary",
      description: "Get a swipeable summary reel you can share or export instantly.",
    },
  ];

  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 py-14 sm:py-20">
      {/* Background (same style as previous sections) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[460px] w-[460px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/40" />
      </div>

      {/* Same container as Hero/Demo */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            How it{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              works
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/65 sm:text-lg">
            Transform any PDF into an easy-to-digest summary in three simple steps.
          </p>

          <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
            {workDisplay.map((e: Steps, idx: number) => (
              <ElementCard key={idx} {...e} idx={idx}  />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkDemo;
