import React from "react";
import { Context } from "../landing-page/Pricing";
import { Button } from "../ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const PricingCard = ({
  label,
  description,
  price,
  summary,
  link,
}: Context) => {
  const isPro = label === "Pro";

  return (
    <div
  className={`
    relative flex h-full flex-col rounded-2xl p-6 backdrop-blur-xl transition-all duration-300
    ${
      isPro
        ? "border-2 border-rose-500/60 bg-white shadow-[0_20px_60px_-25px_rgba(225,29,72,0.45)]"
        : "border border-black/10 bg-white/70 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
    }
  `}
>

      {/* Recommended badge */}
      {isPro && (
        <span className="absolute -top-3 left-6 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Recommended
        </span>
      )}

<div className="flex-grow">
  <h3 className="text-lg font-semibold text-black">{label}</h3>
  <p className="mt-1 text-sm text-black/60">{description}</p>

  <div className="mt-6 flex items-baseline gap-1">
    <span className="text-3xl font-semibold text-black">${price}</span>
    <span className="text-sm text-black/60">USD / month</span>
  </div>

  <ul className="mt-6 space-y-3">
    {summary.map((point, idx) => (
      <li key={idx} className="flex items-start gap-3 text-sm text-black/70">
        <Check className="mt-0.5 h-4 w-4 text-rose-500" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
</div>

      <div className="mt-8">
        <Button
          className={`w-full h-11 rounded-xl ${
            isPro ? "" : "bg-black text-white hover:bg-black/90"
          }`}
        >
          <Link href={link || "#"} className="w-full text-center">
            Buy now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
