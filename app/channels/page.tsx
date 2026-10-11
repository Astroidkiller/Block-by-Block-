"use client";

import {Nav} from "@/components/ui/Nav";
import {ChannelHub} from "@/components/channels/ChannelHub";
import {Button} from "@/components/ui/Button";
import {MessageSquare, Users, ShieldAlert, CheckCircle, ArrowRight, Phone, Mail, FileCheck} from "lucide-react";

const comparisons = [
  {
    feature: "Drawing Version Accountability",
    whatsapp: "Lost in media galleries; site teams build on outdated PDF screenshots.",
    procore: "Heavy 20-field submittals requiring 40 hours of staff training.",
    blockbyblock: "Auto-pins the active CAD/PDF revision directly in the phase channel.",
  },
  {
    feature: "Consultant Onboarding",
    whatsapp: "Instant, but zero legal or auditable sign-off trail.",
    procore: "Requires paid enterprise seat and manual password provisioning.",
    blockbyblock: "1-tap phone invite via WhatsApp/SMS magic link. No app download needed.",
  },
  {
    feature: "Decision Auditing",
    whatsapp: "Scattered '👍' emojis with zero legal enforceability.",
    procore: "Complex workflow rules that take weeks to configure.",
    blockbyblock: "Binary PROCEED vs HOLD timestamped cryptographic digital stamp.",
  },
];

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-white text-[#22223B] flex flex-col font-sans">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="relative border-b border-[#F2E9E4] pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#FAF8F5]">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9ADA7] bg-[#F2E9E4] px-4 py-1.5 font-mono text-xs text-[#22223B] font-bold">
              <MessageSquare size={14} />
              COLLABORATION & CHANNEL DIRECTORY
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#22223B] max-w-3xl font-heading">
              WhatsApp is dangerous. Procore is overkill. Channels are exact.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#4A4E69] leading-relaxed">
              Every phase gets a dedicated channel. Invite structural consultants, architects, and municipal officers by mobile number or email. All requests, revision links, and sign-offs live in one audited thread.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/subscriptions" size="md">
                Get Channel Access
              </Button>
              <Button href="/demo" v="ghost" size="md">
                Try the Demo Sandbox
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Channel Hub */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
              Interactive Channel Simulator
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
              Experience the Mobile Invite & Sign-off Flow
            </h2>
            <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
              Try typing a mobile number or email below to test how easily consultants receive their one-tap clearance link, then sign off on the sample foundation thread.
            </p>
          </div>

          <ChannelHub />
        </section>

        {/* Comparison: Why WhatsApp Fails on Construction Sites */}
        <section className="border-t border-[#F2E9E4] bg-[#FAF8F5] py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
                Accountability Comparison
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
                Why Construction Needs Specialized Channels
              </h2>
              <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
                How Block by Block eliminates the chaos of unverified group chats without enterprise bloat.
              </p>
            </div>

            <div className="mt-12 overflow-x-auto rounded-2xl border-2 border-[#C9ADA7] bg-white shadow-md">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-[#C9ADA7]/40 bg-[#F2E9E4]">
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#22223B] font-bold">Aspect</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#4A4E69] font-bold">Unregulated WhatsApp</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#4A4E69] font-bold">Enterprise Software</th>
                    <th className="p-4 text-xs font-mono uppercase tracking-wider text-[#22223B] bg-[#C9ADA7]/20 font-extrabold">Block by Block Channels</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2E9E4]">
                  {comparisons.map((c, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="p-4 font-bold text-[#22223B]">{c.feature}</td>
                      <td className="p-4 text-xs text-[#4A4E69]">{c.whatsapp}</td>
                      <td className="p-4 text-xs text-[#4A4E69]">{c.procore}</td>
                      <td className="p-4 text-xs text-[#22223B] bg-[#FAF8F5] font-semibold">{c.blockbyblock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#F2E9E4] py-16 text-center bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#22223B] font-heading">
              Bring your entire project team into clear alignment today.
            </h2>
            <p className="mt-3 text-[#4A4E69] max-w-xl mx-auto text-sm sm:text-base">
              Unlimited external invites are included with all subscription tiers.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/subscriptions">Start Free 14-Day Pilot</Button>
              <Button href="/workflow" v="ghost">Explore Workflow Gates</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F2E9E4] py-8 px-4 text-center font-mono text-xs text-[#4A4E69] bg-white">
        Block by Block · Channel Hub · 16.5062° N, 80.6480° E · © 2026 Block by Block
      </footer>
    </div>
  );
}
