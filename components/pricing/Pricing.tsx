"use client";

import {useState} from "react";
import Link from "next/link";
import {Check, Sparkles, ArrowRight, CheckCircle2} from "lucide-react";
import {cn} from "@/lib/utils";

const tiers = [
  {
    id: "starter",
    n: "Starter Site",
    p: 4999,
    annualP: 4166,
    target: "Single-project developers managing 1–2 active sites",
    hot: false,
    specs: "2 Active Sites · Unlimited Invites",
    f: [
      "Up to 2 active construction projects",
      "Unlimited phone & email stakeholder invites",
      "Standard 5-phase readiness checklists",
      "Auditable Proceed / Hold decision logs",
      "Drawing revision links (DWG/PDF)",
      "RERA-ready PDF readiness reports",
    ],
  },
  {
    id: "growth",
    n: "Growth Developer",
    p: 14999,
    annualP: 12499,
    target: "The industry standard for active builders managing multiple towers",
    hot: true,
    specs: "Up to 8 Sites · WhatsApp Magic Links",
    f: [
      "Up to 8 active construction projects",
      "WhatsApp & SMS direct sign-off magic links",
      "Automated SLA escalation for stalled clearances",
      "Multi-consultant peer review sign-off chains",
      "Customizable phase gates for residential & commercial",
      "Defect & open-issue ownership assigning",
    ],
  },
  {
    id: "enterprise",
    n: "Portfolio Enterprise",
    p: 0,
    annualP: 0,
    target: "Tailored for large townships, EPC contractors & municipal bodies",
    hot: false,
    specs: "Unlimited Sites · Dedicated SLA",
    f: [
      "Unlimited active sites & projects",
      "Custom CAD & ERP integrations (AutoCAD, SAP)",
      "Dedicated Readiness Success Manager",
      "On-site crew & supervisor onboarding sessions",
      "Custom compliance templates (ISO 19650 & RERA)",
      "Custom SLA & guaranteed 99.9% uptime",
    ],
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string>("growth");

  return (
    <div>
      {/* 3D Liquid Glass Centered Billing Toggle */}
      <div className="mb-14 flex justify-center items-center gap-3">
        <div className="glass-toggle-track rounded-full p-1 flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300",
              !isAnnual
                ? "glass-toggle-thumb shadow-md"
                : "text-[#4A4E69] hover:text-[#22223B]"
            )}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300",
              isAnnual
                ? "glass-toggle-thumb shadow-md"
                : "text-[#4A4E69] hover:text-[#22223B]"
            )}
          >
            Annual Billing
            <span className={cn(
              "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
              isAnnual ? "bg-[#22223B] text-white" : "bg-[#F2E9E4] text-[#22223B]"
            )}>
              2 Months Free
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-8 md:grid-cols-3 items-stretch">
        {tiers.map((t) => {
          const isSelected = selectedTier === t.id;
          const displayPrice = isAnnual ? t.annualP : t.p;

          return (
            <div
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={cn(
                "rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative cursor-pointer select-none",
                isSelected
                  ? "bg-white border-2 border-[#22223B] shadow-2xl lg:-translate-y-2 ring-1 ring-[#22223B]"
                  : "bg-white border border-[#C9ADA7]/50 shadow-sm hover:border-[#4A4E69]/40 hover:shadow-md"
              )}
            >
              <div>
                {t.hot && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#22223B] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white mb-4 shadow-sm">
                    <Sparkles size={12} className="text-[#C9ADA7]" />
                    Most Popular for Builders
                  </div>
                )}

                {!t.hot && isSelected && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#F2E9E4] border border-[#C9ADA7] px-3 py-0.5 font-mono text-[10px] font-bold text-[#22223B] mb-4">
                    <CheckCircle2 size={11} className="text-[#22223B]" />
                    Selected Tier
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-[#22223B] font-heading">{t.n}</h3>
                  <div className={cn(
                    "grid h-5 w-5 place-items-center rounded-full border text-[11px] transition-colors font-bold",
                    isSelected ? "border-[#22223B] bg-[#22223B] text-white" : "border-[#C9ADA7] text-transparent"
                  )}>
                    ✓
                  </div>
                </div>

                <p className="text-xs text-[#4A4E69] mt-2 leading-relaxed min-h-[36px]">
                  {t.target}
                </p>

                <div className="mt-5 border-b border-[#C9ADA7]/40 pb-5">
                  {displayPrice > 0 ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#22223B]">
                        ₹{displayPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-mono text-[#4A4E69] font-bold">/month</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#22223B]">
                        Custom Quote
                      </span>
                      <span className="block text-[11px] font-mono text-[#4A4E69] mt-1 font-semibold">
                        Enterprise Configurator Available
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 py-2 font-mono text-xs text-[#4A4E69]">
                  <span className="text-[#22223B] font-bold">{t.specs}</span>
                </div>

                <ul className="mt-4 space-y-3 text-xs text-[#4A4E69]">
                  {t.f.map((x) => (
                    <li key={x} className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#22223B] shrink-0 mt-0.5" />
                      <span className="text-[#22223B]/90 font-medium">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C9ADA7]/40">
                <Link
                  href="/subscriptions"
                  className={cn(
                    "w-full rounded-xl py-3 px-4 text-xs font-bold text-center block transition-all shadow-sm",
                    isSelected
                      ? "bg-[#22223B] text-white hover:bg-[#4A4E69]"
                      : "bg-[#F2E9E4] text-[#22223B] hover:bg-[#C9ADA7]/40 border border-[#C9ADA7]"
                  )}
                >
                  {displayPrice > 0 ? "Start 14-Day Free Trial" : "Configure Custom Quote"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
