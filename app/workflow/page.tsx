"use client";

import Link from "next/link";
import {Nav} from "@/components/ui/Nav";
import {StickyAnatomy} from "@/components/phase-gate/StickyAnatomy";
import {Button} from "@/components/ui/Button";
import {CheckCircle2, AlertTriangle, Layers, ArrowRight, ShieldCheck, FileText} from "lucide-react";

const phases = [
  {
    num: "01",
    name: "Pre-Construction & Land Survey",
    checks: ["Geotechnical Soil Bearing Report", "Total Station Boundary NOC", "RERA Project Filing", "Excavation Depth Profile"],
    signoffs: ["Lead Geotechnical Consultant", "Surveyor", "VP Development"],
    riskPrevented: "Prevents foundation settlement, boundary disputes, and municipal stop-work notices.",
  },
  {
    num: "02",
    name: "Substructure & Foundation Pour",
    checks: ["Column Reinforcement DWG-S-104 rev D", "RMC Mix Design 40 Grade", "Water Table Dewatering Clearance", "Bar Bending Schedule (BBS)"],
    signoffs: ["Lead Structural Consultant", "Site Project Manager"],
    riskPrevented: "Prevents defective column cold joints and premature concrete pours before peer verification.",
  },
  {
    num: "03",
    name: "Superstructure & Structural Framing",
    checks: ["PT Slab Tendon Layout", "Shear Wall Shuttering Verticality", "Concrete Cube 7-Day & 28-Day Strength Tests", "Seismic Connection Nodes"],
    signoffs: ["Structural Peer Reviewer", "Third-Party QA Lab"],
    riskPrevented: "Avoids costly slab retrofits, column jacketing, and structural deflection disputes.",
  },
  {
    num: "04",
    name: "MEP Integration & Fire Clearance",
    checks: ["3D BIM Clash Detection Report", "Plumbing Core Drill Clearances", "Municipal Fire NOC Verification", "Electrical Transformer Substation Clear"],
    signoffs: ["MEP Consultant", "Fire Safety Liaison"],
    riskPrevented: "Prevents breaking newly cast concrete to route overlooked piping and ductwork.",
  },
  {
    num: "05",
    name: "Finishing, Snag List & Handover",
    checks: ["Waterproofing Pressure Ponding Tests", "Facade Wind Load Certification", "Occupancy Certificate (OC) Inspection", "Zero Open High-Priority Snags"],
    signoffs: ["Chief Architect", "Handover Quality Director"],
    riskPrevented: "Eliminates buyer handover disputes, customer warranty claims, and delayed final loan disbursements.",
  },
];

export default function WorkflowPage() {
  return (
    <div className="min-h-screen bg-white text-[#22223B] flex flex-col font-sans">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="relative border-b border-[#F2E9E4] pt-28 sm:pt-36 pb-20 overflow-hidden bg-[#FAF8F5]">
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9ADA7] bg-[#F2E9E4] px-4 py-1.5 font-mono text-xs text-[#22223B] font-bold">
              <Layers size={14} />
              THE 5-PHASE READINESS GATE ENGINE
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#22223B] max-w-3xl font-heading">
              How the Phase Gate Prevents Construction Disasters.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#4A4E69] leading-relaxed">
              Traditional developers rely on fragmented WhatsApp threads and site supervisors catching errors after concrete is poured. Block by Block introduces a strict, auditable Proceed/Hold checkpoint between every phase.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/demo" size="md">
                Test the Interactive Sandbox
              </Button>
              <Button href="/subscriptions" v="ghost" size="md">
                View Pricing & Setup
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Sticky Anatomy Component */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white">
          <div className="mb-8">
            <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
              Interactive Scroll Experience
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
              Anatomy of an Active Gate
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A4E69]">
              Scroll down to watch how drawings, open issues, and mobile sign-offs shift project status from HOLD to PROCEED in real-time.
            </p>
          </div>
          <StickyAnatomy />
        </section>

        {/* Complete Phase Breakdown */}
        <section className="border-t border-[#F2E9E4] bg-[#FAF8F5] py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-[#4A4E69] font-bold uppercase tracking-wider bg-[#F2E9E4] px-3 py-1 rounded-full border border-[#C9ADA7]">
                Full Lifecycle Governance
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#22223B] md:text-4xl font-heading">
                The 5 Gated Construction Stages
              </h2>
              <p className="mt-2 text-[#4A4E69] text-sm sm:text-base">
                No contractor advances to the next stage without every mandatory clearance signed.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {phases.map((phase) => (
                <div
                  key={phase.num}
                  className="rounded-2xl border-2 border-[#C9ADA7]/50 bg-white p-7 flex flex-col justify-between hover:border-[#22223B] shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
                      <span className="font-mono text-2xl font-extrabold text-[#22223B]">
                        STAGE {phase.num}
                      </span>
                      <span className="rounded-full bg-[#F2E9E4] border border-[#C9ADA7] px-3 py-0.5 font-mono text-[11px] font-bold text-[#22223B]">
                        ✓ MANDATORY GATE
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-[#22223B] font-heading">
                      {phase.name}
                    </h3>

                    <div className="mt-4">
                      <p className="font-mono text-[11px] text-[#4A4E69] uppercase font-bold">
                        Critical Clearance Checks:
                      </p>
                      <ul className="mt-2 space-y-2 text-xs text-[#4A4E69]">
                        {phase.checks.map((chk) => (
                          <li key={chk} className="flex items-start gap-2">
                            <span className="font-bold text-[#22223B]">✓</span>
                            <span>{chk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F2E9E4]">
                      <p className="font-mono text-[11px] text-[#4A4E69] uppercase font-bold">
                        Required Sign-offs:
                      </p>
                      <p className="mt-1 text-xs text-[#22223B] font-mono font-semibold">
                        {phase.signoffs.join(" · ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F2E9E4]">
                    <p className="text-xs text-[#4A4E69] leading-relaxed">
                      <b className="text-[#22223B]">⚠ Overrun Risk Prevented:</b> {phase.riskPrevented}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[#F2E9E4] py-16 text-center bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#22223B] font-heading">
              Ready to lock your next phase before pouring?
            </h2>
            <p className="mt-3 text-[#4A4E69] max-w-xl mx-auto text-sm sm:text-base">
              Try the interactive sandbox or set up your first site channel in under 5 minutes.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button href="/demo">Launch Interactive Sandbox</Button>
              <Button href="/subscriptions" v="ghost">View Subscription Tiers</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F2E9E4] py-8 px-4 text-center font-mono text-xs text-[#4A4E69] bg-white">
        Block by Block · Phase-Readiness Workflow · 16.5062° N, 80.6480° E · © 2026 Block by Block
      </footer>
    </div>
  );
}
