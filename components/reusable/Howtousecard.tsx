import React from "react";
import { Steps } from "../landing-page/Howitwork";

const ElementCard = ({
  icon,
  label,
  description,
  idx = 0,
}: Steps & { idx?: number }) => {
  return (
    <div
      className="
        group relative h-full
        rounded-2xl border border-black/10 bg-white/70
        p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_18px_45px_-22px_rgba(0,0,0,0.32)]
      "
    >
      {/* top row */}
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white shadow-sm">
          <span className="text-rose-600">{icon}</span>
        </div>

        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/60">
          Step {idx + 1}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-black">
        {label}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-black/65">
        {description}
      </p>

      {/* subtle accent line */}
      <div className="mt-5 h-[2px] w-16 rounded-full bg-gradient-to-r from-rose-500/60 via-purple-500/40 to-cyan-500/40 opacity-70" />
    </div>
  );
};

export default ElementCard;
