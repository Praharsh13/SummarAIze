import React from "react";
import PricingCard from "../reusable/PricingCard";

export type Context = {
  label: string;
  description: string;
  price: number;
  summary: string[];
  link: string;
};

const priceTable: Context[] = [
  {
    label: "Basic",
    description: "Perfect for occasional use",
    price: 2,
    summary: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    link: "",
  },
  {
    label: "Pro",
    description: "For professionals and teams",
    price: 10,
    summary: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown support",
    ],
    link: "",
  },
];

const Pricing = () => {
  return (
    <section className="relative flex justify-center px-4 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="rounded-3xl border border-black/5 bg-white/55 px-5 py-10 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-8 sm:py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Simple{" "}
            <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-black/65 sm:text-lg">
            Start small or go unlimited. Upgrade anytime as your needs grow.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {priceTable.map((table, idx) => (
              <PricingCard key={idx} {...table} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
