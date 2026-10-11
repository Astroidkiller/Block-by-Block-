"use client";

import {useEffect, useRef, useState} from "react";
import confetti from "canvas-confetti";
import {motion, AnimatePresence} from "framer-motion";
import {cn} from "@/lib/utils";

const items = [
  {t: "Soil Bearing Capacity Report verified", w: 15, on: true},
  {t: "Municipal Building Permission (BP) NOC verified", w: 20, on: true},
  {t: "Column Reinforcement Schedule (DWG-S-104 rev D)", w: 40, on: false},
  {t: "Site Electrical & Dewatering clearance", w: 25, on: false},
];

export function Sandbox() {
  const [c, setC] = useState(items.map((i) => i.on));
  const [ping, setPing] = useState(false);
  const was = useRef(false);
  const miss = c.filter((x) => !x).length;
  const risk = items.reduce((s, i, k) => s + (c[k] ? 0 : i.w), 0);
  const clear = miss === 0;

  useEffect(() => {
    if (clear && !was.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: {y: 0.7},
        colors: ["#22223B", "#4A4E69", "#C9ADA7", "#9A8C98"],
      });
    }
    was.current = clear;
    if (clear) setPing(false);
  }, [clear]);

  const col = risk === 0 ? "#22223B" : "#4A4E69";
  const L = 157;

  return (
    <div className="grid gap-8 rounded-2xl border-2 border-[#C9ADA7] bg-white p-7 sm:p-9 md:grid-cols-[1.3fr_1fr] relative overflow-hidden shadow-xl">
      <div>
        <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-4">
          <p className="font-mono text-xs text-[#4A4E69]">
            PROJECT · Greenfield Residences (Tower B) · Phase 02: Foundation
          </p>
          <span className="font-mono text-[10px] text-[#22223B] bg-[#F2E9E4] px-2.5 py-1 rounded-md border border-[#C9ADA7] font-bold">
            ACTIVE GATE
          </span>
        </div>

        <ul className="mt-6 space-y-3">
          {items.map((it, k) => (
            <li key={it.t}>
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3.5 rounded-xl border-2 p-4 transition-all duration-200",
                  c[k]
                    ? "border-[#22223B] bg-[#F2E9E4]/60 text-[#22223B]"
                    : "border-[#C9ADA7]/40 bg-white text-[#4A4E69] hover:border-[#22223B]"
                )}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={c[k]}
                  onChange={() =>
                    setC((p) => p.map((v, j) => (j === k ? !v : v)))
                  }
                />
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-xs transition-colors",
                    c[k]
                      ? "border-[#22223B] bg-[#22223B] text-white font-bold"
                      : "border-[#C9ADA7] bg-[#F2E9E4] text-[#4A4E69] font-bold"
                  )}
                >
                  {c[k] ? "✓" : "⚠"}
                </span>
                <div className="flex-1 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <span>{it.t}</span>
                    <span
                      className={cn(
                        "font-mono text-[10px] px-2 py-0.5 rounded border uppercase",
                        c[k]
                          ? "bg-[#22223B] text-white border-[#22223B]"
                          : "bg-white text-[#4A4E69] border-[#C9ADA7]"
                      )}
                    >
                      {c[k] ? "✓ Complete" : "⚠ Required"}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#9A8C98] font-normal block mt-1">
                    Gating Weight: {it.w}% of phase risk
                  </span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 bg-[#FAF8F5] rounded-2xl border-2 border-[#C9ADA7] p-7 shadow-sm">
        <figure
          className="text-center"
          aria-label={`Risk score ${risk} out of 100`}
        >
          <svg viewBox="0 0 120 70" className="w-52 mx-auto">
            <path
              d="M10 62A50 50 0 0 1 110 62"
              fill="none"
              stroke="#F2E9E4"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <motion.path
              d="M10 62A50 50 0 0 1 110 62"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={L}
              animate={{strokeDashoffset: L * (1 - risk / 100), stroke: col}}
              initial={false}
              transition={{type: "spring", stiffness: 90, damping: 18}}
            />
            <text
              x="60"
              y="58"
              textAnchor="middle"
              className="fill-[#22223B] font-mono text-[24px] font-bold"
            >
              {risk}
            </text>
          </svg>
          <figcaption className="font-mono text-[11px] text-[#4A4E69] mt-2 uppercase tracking-wider font-semibold">
            Gate Risk Score / 100
          </figcaption>
        </figure>

        <div role="status" aria-live="polite" className="w-full">
          <AnimatePresence mode="wait">
            {clear ? (
              <motion.div
                key="ok"
                initial={{scale: 0.95, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{opacity: 0}}
                className="rounded-xl border-2 border-[#22223B] bg-[#F2E9E4] p-4 text-center shadow-md"
              >
                <div className="mx-auto mb-1.5 w-fit rounded-full border border-[#22223B] bg-[#22223B] px-3.5 py-0.5 font-mono text-[11px] font-semibold text-white">
                  ✓ ALL PROOFS SEALED & VERIFIED
                </div>
                <p className="font-mono text-sm text-[#22223B] font-bold">
                  ✓ PROCEED — Authorized for Concrete Pour
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="hold"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="rounded-xl border-2 border-[#C9ADA7] bg-white p-4 text-center shadow-sm"
              >
                <p className="font-mono text-sm font-bold text-[#22223B]">
                  ⛔ HOLD — {miss} Critical Clearance Proof{miss > 1 ? "s" : ""} Missing
                </p>
                <button
                  onClick={() => setPing(true)}
                  disabled={ping}
                  className="mt-3 rounded-full border border-[#22223B] bg-[#22223B] px-4 py-2 text-xs text-white hover:bg-[#4A4E69] disabled:opacity-60 transition-colors font-semibold"
                >
                  {ping ? "✓ Lead Authority Notified via WhatsApp" : "Ping Lead Structural Authority"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
