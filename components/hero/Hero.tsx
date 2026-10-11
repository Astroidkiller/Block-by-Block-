"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {ArrowRight, ShieldCheck, AlertCircle, CheckCircle2} from "lucide-react";
import {cn} from "@/lib/utils";

const teamSignoffs = [
  {initials: "AR", role: "Architect", status: "ok"},
  {initials: "SC", role: "Structural", status: "hold"},
  {initials: "RV", role: "VP Rajesh", status: "hold"},
];

export function Hero() {
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setIsCleared((prev) => !prev), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20 lg:pb-28">
      {/* Background Architectural Glow */}
      <div className="grid-bg absolute inset-0 opacity-25 pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-[#C9ADA7]/15 via-[#F2E9E4]/30 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left Column: High Impact Typography */}
          <div className="flex flex-col items-start">
            {/* Minimalist Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9ADA7] bg-[#F2E9E4] px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#4A4E69] animate-pulse" />
              <span className="text-xs font-mono text-[#22223B] tracking-tight font-bold">
                MoSPI 2025: 45% Projects Delayed · Zero-Rework Gate
              </span>
            </div>

            {/* Headline with subtle gradient falloff */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.08] text-[#22223B] font-heading">
              Never pour concrete on{" "}
              <span className="bg-gradient-to-r from-[#22223B] via-[#4A4E69] to-[#C9ADA7] bg-clip-text text-transparent">
                unverified drawings.
              </span>
            </h1>

            {/* Tight, punchy subheadline */}
            <p className="mt-5 max-w-lg text-base sm:text-lg text-[#4A4E69] leading-relaxed font-normal">
              Block by Block gates every phase of residential construction.
              No contractor pours until the structural engineer, architect, and site PM digitally sign off.
            </p>

            {/* Pill Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/dashboard"
                className="rounded-full bg-[#22223B] text-white font-bold text-sm px-6 py-3.5 hover:bg-[#4A4E69] active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                Launch Live Dashboard
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/subscriptions"
                className="rounded-full bg-[#F2E9E4] border border-[#C9ADA7] hover:bg-[#C9ADA7]/40 text-[#22223B] font-bold text-sm px-5 py-3.5 transition-colors"
              >
                Explore Pricing Plans
              </Link>
            </div>
          </div>

          {/* Right Column: Liquid Glass Phase Card */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
            className="rounded-2xl border-2 border-[#C9ADA7] bg-white p-6 sm:p-8 relative overflow-hidden shadow-xl"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#4A4E69] font-bold">
                  Amaravati Heights · Site 04
                </p>
                <h3 className="text-base font-bold text-[#22223B] mt-0.5 font-heading">
                  Phase 02: Foundation Pour Readiness
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#22223B] bg-[#F2E9E4] px-2.5 py-1 rounded-md border border-[#C9ADA7] font-bold">
                DWG-STR-v4.2
              </span>
            </div>

            {/* Dynamic Proceed / Hold Indicator with Clear Signs */}
            <div
              className={cn(
                "mt-5 rounded-xl border p-4 transition-all duration-500",
                isCleared
                  ? "border-[#22223B] bg-[#22223B] text-white"
                  : "border-[#C9ADA7] bg-[#F2E9E4] text-[#22223B]"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide">
                  {isCleared ? (
                    <>
                      <CheckCircle2 size={16} className="text-[#C9ADA7]" />
                      <span>✓ STATUS: PROCEED // CLEARED TO POUR</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} className="text-[#4A4E69]" />
                      <span>⛔ STATUS: HOLD // 2 BLOCKED CHECKS</span>
                    </>
                  )}
                </div>
                <span className={cn("text-[10px] font-mono font-bold", isCleared ? "text-[#C9ADA7]" : "text-[#4A4E69]")}>
                  {isCleared ? "100% Sealed" : "RMC Order Locked"}
                </span>
              </div>
            </div>

            {/* Checklist Micro-Preview */}
            <div className="mt-5 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/40">
                <span className="text-[#22223B] font-semibold">Soil Bearing Report</span>
                <span className="text-[#22223B] font-bold">✓ VERIFIED</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/40">
                <span className="text-[#22223B] font-semibold">Column Steel DWG-S-104</span>
                <span className={isCleared ? "text-[#22223B] font-bold" : "text-[#4A4E69] font-bold"}>
                  {isCleared ? "✓ SEALED rev D" : "⚠ FLAGGED rev C"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/40">
                <span className="text-[#22223B] font-semibold">Structural Peer Review</span>
                <span className={isCleared ? "text-[#22223B] font-bold" : "text-[#4A4E69] font-bold"}>
                  {isCleared ? "✓ APPROVED" : "⏳ PENDING"}
                </span>
              </div>
            </div>

            {/* Team Sign-off Avatars */}
            <div className="mt-6 pt-5 border-t border-[#C9ADA7]/40">
              <p className="text-[11px] font-mono text-[#4A4E69] uppercase tracking-wider mb-3 font-bold">
                Clearance Sign-off Chain
              </p>
              <div className="flex items-center justify-between">
                {teamSignoffs.map((member, i) => {
                  const approved = isCleared || member.status === "ok";
                  return (
                    <div key={member.initials} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-full border font-mono text-xs font-bold transition-all duration-300",
                            approved
                              ? "border-[#22223B] bg-[#22223B] text-white shadow-sm"
                              : "border-[#C9ADA7] bg-[#F2E9E4] text-[#4A4E69]"
                          )}
                        >
                          {approved ? "✓ " : ""}{member.initials}
                        </div>
                        <span className="text-[10px] text-[#4A4E69] mt-1.5 font-semibold">
                          {member.role}
                        </span>
                      </div>
                      {i < 2 && (
                        <div className="h-0.5 w-8 sm:w-12 bg-[#C9ADA7]/50 mx-2 -mt-4 relative overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-[#22223B]"
                            animate={{width: ["0%", "100%"]}}
                            transition={{duration: 1.5, repeat: Infinity}}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
