"use client";

import {Nav} from "@/components/ui/Nav";
import {Calculator} from "@/components/calculator/Calculator";
import {Button} from "@/components/ui/Button";
import {Calculator as CalcIcon, TrendingDown, Clock, ShieldAlert, ArrowRight, BarChart3} from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-white text-[#22223B] flex flex-col font-sans">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="relative border-b border-[#F2E9E4] pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#FAF8F5]">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9ADA7] bg-[#F2E9E4] px-4 py-1.5 font-mono text-xs text-[#22223B] font-bold">
              <CalcIcon size={14} />
              OVERRUN METRICS & FINANCIAL MODEL
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#22223B] max-w-3xl font-heading">
              Calculate Your Real Risk Exposure.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#4A4E69] leading-relaxed">
              According to the Ministry of Statistics and Programme Implementation (MoSPI, Jan 2025), 771 of 1,719 monitored Indian infrastructure projects suffered time and cost overruns. See how much pre-construction phase gating saves your bottom line.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/subscriptions" size="md">
                Lock In Savings With A Plan
              </Button>
              <Button href="/demo" v="ghost" size="md">
                Test the Phase Gate
              </Button>
            </div>
          </div>
        </section>

        {/* Core Calculator */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
              Interactive Financial Estimator
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
              Adjust Project Scope & Costs
            </h2>
            <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
              Slide to match your current project budget and delivery phases to forecast delay mitigation and direct rework avoidance.
            </p>
          </div>

          <Calculator />
        </section>

        {/* Breakdown of Overrun Causes */}
        <section className="border-t border-[#F2E9E4] bg-[#FAF8F5] py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
                Industry Data
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
                Where Do The Losses Come From?
              </h2>
              <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
                Construction rework isn&apos;t just extra concrete. It causes severe compounding financial damage.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border-2 border-[#C9ADA7]/50 bg-white p-7 shadow-sm hover:border-[#22223B] transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7] mb-5">
                  <TrendingDown size={22} />
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded mb-3 border border-[#C9ADA7]/60">
                  <span>⚠</span> HIGH VULNERABILITY
                </div>
                <h3 className="text-lg font-bold text-[#22223B] font-heading">Structural Demolition & Rework</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4A4E69] leading-relaxed">
                  Pouring footings or columns before structural peer review often forces chipping, jacketing, or redesigns costing ₹10L–₹50L per tower.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[#C9ADA7]/50 bg-white p-7 shadow-sm hover:border-[#22223B] transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7] mb-5">
                  <Clock size={22} />
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded mb-3 border border-[#C9ADA7]/60">
                  <span>⏳</span> IDLE BURN
                </div>
                <h3 className="text-lg font-bold text-[#22223B] font-heading">Idle Equipment & Labor Burn</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4A4E69] leading-relaxed">
                  Tower cranes, shuttering rentals, and batching plants sit idle when municipal stop-work notices arrive due to missing clearances.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[#C9ADA7]/50 bg-white p-7 shadow-sm hover:border-[#22223B] transition-all">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7] mb-5">
                  <ShieldAlert size={22} />
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded mb-3 border border-[#C9ADA7]/60">
                  <span>✓</span> RERA COMPLIANCE
                </div>
                <h3 className="text-lg font-bold text-[#22223B] font-heading">Buyer Handover Penalties</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4A4E69] leading-relaxed">
                  Under RERA, developers pay statutory interest on delayed possessions. Gating phases eliminates unpredictable project creep upfront.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#F2E9E4] py-16 text-center bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#22223B] font-heading">
              Protect your margins before breaking ground.
            </h2>
            <p className="mt-3 text-[#4A4E69] max-w-xl mx-auto text-sm sm:text-base">
              A ₹4,999/mo subscription prevents lakhs of rework on your very first phase pour.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/subscriptions">Choose A Subscription</Button>
              <Button href="/channels" v="ghost">See Channel System</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F2E9E4] py-8 px-4 text-center font-mono text-xs text-[#4A4E69] bg-white">
        Block by Block · ROI Financial Calculator · 16.5062° N, 80.6480° E · © 2026 Block by Block
      </footer>
    </div>
  );
}
