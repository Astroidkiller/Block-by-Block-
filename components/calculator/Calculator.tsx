"use client";
import {useState} from "react";
import {inr} from "@/lib/utils";

export function Calculator() {
  const [cost, setCost] = useState(15);
  const [ph, setPh] = useState(5);
  const exposure = cost * 100 * 0.12;
  const save = exposure * (0.25 + 0.02 * ph);
  const wk = Math.round(6 + ((ph - 3) * 8) / 7);

  const Sl = (
    id: string,
    l: string,
    v: number,
    set: (n: number) => void,
    min: number,
    max: number,
    f: string
  ) => (
    <div>
      <label htmlFor={id} className="flex justify-between text-sm font-semibold text-[#22223B]">
        <span>{l}</span>
        <span className="font-mono font-bold text-[#22223B] bg-[#F2E9E4] px-2.5 py-0.5 rounded border border-[#C9ADA7]">
          {f}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={v}
        onChange={(e) => set(+e.target.value)}
        className="mt-3 w-full accent-[#22223B] cursor-pointer"
      />
    </div>
  );

  return (
    <div className="grid gap-10 rounded-2xl border-2 border-[#C9ADA7] bg-white p-8 md:grid-cols-2 shadow-xl">
      <div className="space-y-8">
        {Sl("c", "Total Estimated Project Cost", cost, setCost, 2, 50, `₹${cost} Cr`)}
        {Sl("p", "Number of Construction Phases", ph, setPh, 3, 10, `${ph} Phases`)}
      </div>

      <dl className="space-y-5 bg-[#FAF8F5] p-6 rounded-xl border border-[#C9ADA7]/40" aria-live="polite">
        <div>
          <dt className="text-xs font-mono uppercase tracking-wider text-[#4A4E69]">
            Calculated Risk Exposure (12% avg. rework cost)
          </dt>
          <dd className="font-mono text-2xl font-bold text-[#22223B] mt-1 flex items-center gap-2">
            <span>⚠</span>
            <span>{inr(exposure)}</span>
          </dd>
        </div>

        <div className="pt-4 border-t border-[#F2E9E4]">
          <dt className="text-xs font-mono uppercase tracking-wider text-[#4A4E69]">
            Estimated Savings with Gating Protocol
          </dt>
          <dd className="font-mono text-4xl font-extrabold text-[#22223B] mt-1 flex items-center gap-2">
            <span>✓</span>
            <span>{inr(save)}</span>
          </dd>
        </div>

        <div className="pt-4 border-t border-[#F2E9E4]">
          <dt className="text-xs font-mono uppercase tracking-wider text-[#4A4E69]">
            Project Schedule Slippage Avoided
          </dt>
          <dd className="font-mono text-2xl font-bold text-[#22223B] mt-1 flex items-center gap-2">
            <span>✓</span>
            <span>{wk} weeks</span>
            <span className="text-xs font-normal text-[#9A8C98]">(statutory RERA compliance)</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
