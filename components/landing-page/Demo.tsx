import React from "react";
//import SummaryReel from "./SummaryReel"; // keep path as per your folder

const DemoSection = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-4 py-14 sm:py-20">
     
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[460px] w-[460px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />

        
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/40" />
      </div>

      
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-12">
          
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Watch your PDF turn into a{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              summary reel
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/65 sm:text-lg">
            This is exactly how your summaries will look, swipeable, clean, and easy
            to share.
          </p>

          {/* Reel centred, same alignment approach */}
          <div className="mt-8 flex justify-center">
           {/*<SummaryReel className="max-w-md" />*/ } 
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
