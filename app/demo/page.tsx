"use client";

import {useState} from "react";
import {Nav} from "@/components/ui/Nav";
import {Sandbox} from "@/components/phase-gate/Sandbox";
import {Button} from "@/components/ui/Button";
import {Sliders, FileDown, CheckCircle, AlertOctagon, Sparkles, Building} from "lucide-react";

export default function DemoPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadReport = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-[#22223B] flex flex-col font-sans">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="relative border-b border-[#F2E9E4] pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#FAF8F5]">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9ADA7] bg-[#F2E9E4] px-4 py-1.5 font-mono text-xs text-[#22223B] font-bold">
              <Sliders size={14} />
              INTERACTIVE DEMO // GATEKEEPER ENGINE
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#22223B] max-w-3xl font-heading">
              Experience the Phase-Readiness Gatekeeper.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#4A4E69] leading-relaxed">
              Toggle the clearance conditions below. Watch the dynamic risk gauge recalculate and observe how the gate blocks or unlocks the concrete pour in real-time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/subscriptions" size="md">
                Get Instant Workspace
              </Button>
              <Button href="/calculator" v="ghost" size="md">
                Calculate Delay Costs
              </Button>
            </div>
          </div>
        </section>

        {/* Sandbox Core Component */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
                Live Interactive Sandbox
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
                Phase 02: Foundation Readiness Gating
              </h2>
              <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
                Check all 4 verification gates to trigger the stamped clearance and celebration.
              </p>
            </div>

            <Button
              v="secondary"
              size="sm"
              onClick={handleDownloadReport}
              className="text-xs shrink-0 font-bold border-2 border-[#C9ADA7]"
            >
              <FileDown size={14} className="mr-1.5" />
              {downloaded ? "✓ Report Downloaded (PDF)" : "Download Sample Audit PDF"}
            </Button>
          </div>

          <Sandbox />
        </section>

        {/* What this Prevents */}
        <section className="border-t border-[#F2E9E4] bg-[#FAF8F5] py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
                Engineering Integrity
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
                Why Binary Proceed / Hold Decisions Work
              </h2>
              <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
                Vague statuses like &ldquo;in progress&rdquo; or &ldquo;almost ready&rdquo; are where 80% of construction overruns occur.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-[#C9ADA7] bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2 text-[#22223B] font-mono text-sm font-bold bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#C9ADA7]/60 w-fit">
                  <AlertOctagon size={18} />
                  ⛔ STATUS: HOLD [ACTION REQUIRED]
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#22223B] font-heading">
                  Stops Site Errors Before They Compound
                </h3>
                <p className="mt-2 text-sm text-[#4A4E69] leading-relaxed">
                  If the structural consultant has flagged an unverified column drawing, the contractor cannot order Ready-Mix Concrete. The developer saves lakhs in demolition and rework costs.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[#22223B] bg-[#F2E9E4] p-7 shadow-sm">
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold bg-[#22223B] px-3 py-1.5 rounded-lg w-fit">
                  <CheckCircle size={18} />
                  ✓ STATUS: PROCEED [100% SEALED & CLEARED]
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#22223B] font-heading">
                  Unambiguous Authorization to Pour
                </h3>
                <p className="mt-2 text-sm text-[#4A4E69] leading-relaxed">
                  When all peer checks, NOC permits, and test results are uploaded and digitally signed, the whole site team advances with confidence and an unshakeable audit trail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#F2E9E4] py-16 text-center bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#22223B] font-heading">
              Protect your next residential tower from rework.
            </h2>
            <p className="mt-3 text-[#4A4E69] max-w-xl mx-auto text-sm sm:text-base">
              Start with our 14-day free pilot. Set up your site in 5 minutes.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/subscriptions">Start Free Pilot</Button>
              <Button href="/workflow" v="ghost">View 5-Phase Workflow</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F2E9E4] py-8 px-4 text-center font-mono text-xs text-[#4A4E69] bg-white">
        Block by Block · Interactive Live Sandbox · 16.5062° N, 80.6480° E · © 2026 Block by Block
      </footer>
    </div>
  );
}
