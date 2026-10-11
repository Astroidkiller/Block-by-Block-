"use client";
import {useRef, useState} from "react";
import {motion, AnimatePresence, useScroll, useMotionValueEvent} from "framer-motion";
import {cn} from "@/lib/utils";

const S = [
  {
    t: "Pre-Construction & Land Survey",
    d: "Geotechnical soil bearing capacity verified. Municipal boundary NOC cleared.",
    ok: true,
    r: [["Soil Bearing Capacity", "✓ VERIFIED"], ["Boundary NOC", "✓ CLEARED"], ["RERA Registration", "✓ FILED"]]
  },
  {
    t: "Substructure & Foundation Pour",
    d: "Structural consultant flags the revised column reinforcement drawing DWG-S-104. The gate stops the contractor from ordering RMC prematurely.",
    ok: false,
    r: [["DWG-S-104 rev C", "⚠ FLAGGED"], ["RMC Pour Order", "⛔ LOCKED"], ["Structural Peer Review", "⏳ PENDING"]]
  },
  {
    t: "Resolution & Digital Sign-off",
    d: "The structural engineer signs off on mobile. Status shifts instantly to cleared to pour.",
    ok: true,
    r: [["DWG-S-104 rev D", "✓ SIGNED"], ["RMC Pour Order", "✓ UNLOCKED"], ["Structural Peer Review", "✓ SEALED"]]
  },
  {
    t: "Superstructure & MEP Integration",
    d: "Every service clash is resolved before shuttering begins.",
    ok: true,
    r: [["MEP Clash Report", "✓ 0 OPEN CLASHES"], ["Municipal Fire NOC", "✓ CLEARED"], ["Shuttering", "✓ CLEARED"]]
  }
];

export function StickyAnatomy() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const {scrollYProgress} = useScroll({target: ref, offset: ["start start", "end end"]});
  useMotionValueEvent(scrollYProgress, "change", v => setI(Math.min(S.length - 1, Math.floor(v * S.length))));
  const s = S[i];

  return (
    <div ref={ref} style={{height: `${S.length * 80}vh`}} className="relative">
      <div className="sticky top-20 grid min-h-[calc(100vh-5rem)] items-center gap-10 py-8 md:grid-cols-2">
        <ol className="space-y-4">
          {S.map((x, k) => (
            <li
              key={x.t}
              aria-current={k === i}
              className={cn(
                "border-l-4 py-3 pl-5 rounded-r-xl transition-all duration-300",
                k === i
                  ? "border-[#22223B] bg-[#F2E9E4]/50 shadow-sm"
                  : "border-[#C9ADA7]/40 opacity-60 hover:opacity-90"
              )}
            >
              <h3 className="font-bold text-[#22223B] text-base">
                Stage {String(k + 1).padStart(2, "0")}: {x.t}
              </h3>
              {k === i && (
                <p className="mt-1.5 text-sm text-[#4A4E69] leading-relaxed">
                  {x.d}
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border-2 border-[#C9ADA7] bg-white p-7 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-3">
            <p className="font-mono text-xs text-[#4A4E69] font-bold">
              GREENFIELD RESIDENCES // GATE {String(i + 1).padStart(2, "0")}
            </p>
            <span className="font-mono text-[10px] bg-[#F2E9E4] text-[#22223B] px-2 py-0.5 rounded font-bold border border-[#C9ADA7]">
              LIVE GATE VERIFICATION
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.25}}
            >
              <div
                className={cn(
                  "mt-5 rounded-xl border-2 px-4 py-3 font-mono text-sm font-bold text-center",
                  s.ok
                    ? "border-[#22223B] bg-[#F2E9E4] text-[#22223B]"
                    : "border-[#C9ADA7] bg-white text-[#22223B]"
                )}
              >
                {s.ok
                  ? (i === 2 ? "✓ PROCEED — ALL PROOFS SEALED & CLEARED" : "✓ PROCEED — GATE UNLOCKED")
                  : "⛔ HOLD — RMC ORDER BLOCKED (PENDING SIGN-OFF)"}
              </div>

              <ul className="mt-5 divide-y divide-[#F2E9E4] font-mono text-xs">
                {s.r.map(([a, b]) => (
                  <li key={a} className="flex justify-between items-center py-3">
                    <span className="text-[#4A4E69] font-medium">{a}</span>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded text-[11px] font-bold border",
                        b.startsWith("✓")
                          ? "bg-[#22223B] text-white border-[#22223B]"
                          : "bg-[#F2E9E4] text-[#22223B] border-[#C9ADA7]"
                      )}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
