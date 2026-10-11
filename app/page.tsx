"use client";

import Link from "next/link";
import {Nav} from "@/components/ui/Nav";
import {Hero} from "@/components/hero/Hero";
import {Sandbox} from "@/components/phase-gate/Sandbox";
import {Pricing} from "@/components/pricing/Pricing";
import {
  Layers,
  MessageSquare,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-[#22223B] selection:bg-[#F2E9E4] selection:text-[#22223B] font-sans">
      {/* Floating Liquid Glass Dockbar */}
      <Nav />

      {/* Hero Section */}
      <Hero />

      {/* Bento Highlights: 3 Core Principles */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-[#4A4E69] font-bold bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
            Architectural Gating Engine
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#22223B] font-heading">
            Three principles. Zero rework.
          </h2>
          <p className="mt-3 text-[#4A4E69] text-sm sm:text-base leading-relaxed">
            Everything small and mid-sized developers need to run predictable, on-time project handovers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Bento Card 1: Phase Gate */}
          <Link
            href="/workflow"
            className="group rounded-2xl border-2 border-[#C9ADA7]/40 bg-white p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#22223B] hover:shadow-lg shadow-sm"
          >
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#F2E9E4] border border-[#C9ADA7] text-[#22223B] mb-6 shadow-sm">
                <Layers size={22} />
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded mb-3">
                <span>✓</span> ENFORCED SEQUENCE
              </div>
              <h3 className="text-xl font-bold text-[#22223B] group-hover:text-[#4A4E69] transition-colors font-heading">
                Phase-Readiness Gates
              </h3>
              <p className="mt-3 text-sm text-[#4A4E69] leading-relaxed">
                Binary Proceed or Hold enforcement. No contractor pours foundation or frames slabs until every engineering peer review is cleared.
              </p>
            </div>
            <div className="mt-8 flex items-center text-xs font-bold text-[#22223B] group-hover:translate-x-1 transition-transform">
              Explore 5-Phase Workflow
              <ArrowRight size={13} className="ml-1.5" />
            </div>
          </Link>

          {/* Bento Card 2: Channels */}
          <Link
            href="/channels"
            className="group rounded-2xl border-2 border-[#C9ADA7]/40 bg-white p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#22223B] hover:shadow-lg shadow-sm"
          >
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#F2E9E4] border border-[#C9ADA7] text-[#22223B] mb-6 shadow-sm">
                <MessageSquare size={22} />
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded mb-3">
                <span>✓</span> ONE-TAP MOBILE
              </div>
              <h3 className="text-xl font-bold text-[#22223B] group-hover:text-[#4A4E69] transition-colors font-heading">
                Dedicated Channels
              </h3>
              <p className="mt-3 text-sm text-[#4A4E69] leading-relaxed">
                Replace chaotic WhatsApp groups. Invite architects and structural consultants by mobile number with 1-tap digital approval links.
              </p>
            </div>
            <div className="mt-8 flex items-center text-xs font-bold text-[#22223B] group-hover:translate-x-1 transition-transform">
              See Channel Collaboration
              <ArrowRight size={13} className="ml-1.5" />
            </div>
          </Link>

          {/* Bento Card 3: Financial Armor */}
          <Link
            href="/calculator"
            className="group rounded-2xl border-2 border-[#C9ADA7]/40 bg-white p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#22223B] hover:shadow-lg shadow-sm"
          >
            <div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#F2E9E4] border border-[#C9ADA7] text-[#22223B] mb-6 shadow-sm">
                <TrendingDown size={22} />
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded mb-3">
                <span>✓</span> CAPITAL PROTECTION
              </div>
              <h3 className="text-xl font-bold text-[#22223B] group-hover:text-[#4A4E69] transition-colors font-heading">
                Overrun Protection
              </h3>
              <p className="mt-3 text-sm text-[#4A4E69] leading-relaxed">
                45% of Indian construction projects face budget overruns (MoSPI). Save an average of ₹18.4L in rework and avoid statutory RERA penalties.
              </p>
            </div>
            <div className="mt-8 flex items-center text-xs font-bold text-[#22223B] group-hover:translate-x-1 transition-transform">
              Calculate Project Exposure
              <ArrowRight size={13} className="ml-1.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Gatekeeper Spotlight */}
      <section className="border-t border-[#F2E9E4] bg-[#FAF8F5] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#4A4E69] font-bold bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
                Interactive Playground
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#22223B] font-heading">
                Experience the Gatekeeper
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4A4E69] max-w-lg">
                Toggle the clearances below. The gate makes the binary Proceed vs Hold decision.
              </p>
            </div>
            <Link
              href="/demo"
              className="text-xs font-bold text-[#22223B] flex items-center gap-1.5 shrink-0 bg-white border-2 border-[#C9ADA7] px-4 py-2.5 rounded-xl hover:bg-[#F2E9E4] transition-colors shadow-sm"
            >
              Open Fullscreen Sandbox
              <ArrowRight size={13} />
            </Link>
          </div>

          <Sandbox />
        </div>
      </section>

      {/* Subscription Pricing Section */}
      <section className="border-t border-[#F2E9E4] py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-wider text-[#4A4E69] font-bold bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
              Transparent Subscriptions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#22223B] font-heading">
              Plans built for site developers.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A4E69]">
              Free invites for external structural engineers, architects, and municipal consultants. Click any tier below to select.
            </p>
          </div>

          <Pricing />

          <div className="mt-12 text-center">
            <Link
              href="/subscriptions"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#22223B] bg-[#F2E9E4] border-2 border-[#C9ADA7] px-6 py-3 rounded-full hover:bg-white transition-all shadow-sm"
            >
              View Full Feature Comparison Matrix & Interactive Quote Configurator
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Action Hero */}
      <section className="border-t border-[#F2E9E4] relative py-20 sm:py-28 overflow-hidden bg-[#FAF8F5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#22223B] font-heading leading-tight">
            Stop discovering mistakes after the concrete cures.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4E69] max-w-xl mx-auto">
            Set up your development workspace in 5 minutes. No credit card required.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/subscriptions"
              className="rounded-full bg-[#22223B] text-white font-bold text-sm px-8 py-4 hover:bg-[#4A4E69] active:scale-95 transition-all shadow-lg flex items-center gap-2"
            >
              Start 14-Day Free Pilot
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-[#F2E9E4] py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#4A4E69] font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#22223B] font-heading text-sm">Block by Block</span>
            <span>·</span>
            <span>Phase-Readiness Gate</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/workflow" className="hover:text-[#22223B] transition-colors">
              Workflow
            </Link>
            <Link href="/channels" className="hover:text-[#22223B] transition-colors">
              Channels
            </Link>
            <Link href="/demo" className="hover:text-[#22223B] transition-colors">
              Demo
            </Link>
            <Link href="/subscriptions" className="hover:text-[#22223B] transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="hover:text-[#22223B] transition-colors">
              Login
            </Link>
          </div>

          <div className="text-[#9A8C98]">
            Aligned with ISO 19650 Protocols · © 2026
          </div>
        </div>
      </footer>
    </main>
  );
}
