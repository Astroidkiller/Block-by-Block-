"use client";
import {useState} from "react";
import {Phone, Mail, Check, Ban} from "lucide-react";
import {Button} from "../ui/Button";
import {cn} from "@/lib/utils";

const roles = [
  "Owner",
  "Consulting Architect",
  "Structural Engineer",
  "Municipal Liaison",
  "Site Supervisor",
];

export function ChannelHub() {
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [val, setVal] = useState("");
  const [role, setRole] = useState(roles[2]);
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [dec, setDec] = useState<"approved" | "blocked" | null>(null);
  const valid =
    mode === "phone"
      ? /^\+?[0-9 ]{10,14}$/.test(val.trim())
      : /^\S+@\S+\.\S+$/.test(val.trim());

  const activeRoleName = isCustomRole ? (customRole.trim() || "Specialist Consultant") : role;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border-2 border-[#C9ADA7] bg-white p-7 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-3">
          <p className="font-mono text-xs text-[#4A4E69] font-bold">
            # Amaravati Heights // Phase 01 Site Prep
          </p>
          <span className="font-mono text-[10px] bg-[#F2E9E4] text-[#22223B] px-2 py-0.5 rounded font-bold border border-[#C9ADA7]">
            INVITE SPECIALIST
          </span>
        </div>

        <div role="tablist" aria-label="Invite method" className="mt-5 flex gap-2">
          {([
            ["phone", "Mobile Number", Phone],
            ["email", "Google / Work Email", Mail],
          ] as const).map(([k, l, I]) => (
            <button
              key={k}
              role="tab"
              aria-selected={mode === k}
              onClick={() => {
                setMode(k);
                setVal("");
                setSent(null);
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 px-3.5 py-2 text-xs font-semibold transition-colors",
                mode === k
                  ? "border-[#22223B] bg-[#22223B] text-white"
                  : "border-[#C9ADA7]/40 bg-[#F2E9E4] text-[#4A4E69] hover:border-[#22223B]"
              )}
            >
              <I size={14} />
              {l}
            </button>
          ))}
        </div>

        <label className="mt-4 block text-xs text-[#4A4E69] font-medium" htmlFor="inv">
          {mode === "phone"
            ? "Sends an instant 1-tap verification link via WhatsApp / SMS. No app installation needed."
            : "Automatic authority workspace clearance on first Google sign-in."}
        </label>
        <input
          id="inv"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setSent(null);
          }}
          inputMode={mode === "phone" ? "tel" : "email"}
          placeholder={
            mode === "phone" ? "+91 98480 12345" : "structural@consultant.in"
          }
          className="mt-2 w-full rounded-xl border-2 border-[#C9ADA7]/60 bg-[#FAF8F5] px-4 py-3 text-sm text-[#22223B] placeholder:text-[#9A8C98] focus:border-[#22223B] focus:outline-none"
        />

        {/* Role Section with Custom Role Input Button */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-[#4A4E69] uppercase font-bold">
              Role / Discipline
            </span>
            <button
              type="button"
              onClick={() => {
                setIsCustomRole(!isCustomRole);
                if (!isCustomRole) setCustomRole("");
              }}
              className={cn(
                "text-[11px] font-mono font-bold px-2.5 py-1 rounded border transition-colors flex items-center gap-1",
                isCustomRole
                  ? "bg-[#22223B] text-white border-[#22223B]"
                  : "bg-[#F2E9E4] text-[#22223B] border-[#C9ADA7] hover:bg-[#C9ADA7]/40"
              )}
            >
              {isCustomRole ? "← Choose from Presets" : "+ Custom Role Input"}
            </button>
          </div>

          {isCustomRole ? (
            <input
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder="Type custom role (e.g. Façade Engineer, Acoustics Lead...)"
              className="w-full rounded-xl border-2 border-[#22223B] bg-[#FAF8F5] px-4 py-3 text-sm text-[#22223B] font-medium focus:outline-none"
            />
          ) : (
            <select
              aria-label="Role"
              value={role}
              onChange={(e) => {
                if (e.target.value === "__custom__") {
                  setIsCustomRole(true);
                  setCustomRole("");
                } else {
                  setRole(e.target.value);
                }
              }}
              className="w-full rounded-xl border-2 border-[#C9ADA7]/60 bg-[#FAF8F5] px-4 py-3 text-sm text-[#22223B] font-medium focus:border-[#22223B] focus:outline-none"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
              <option value="__custom__">+ Enter Custom Role...</option>
            </select>
          )}
        </div>

        <Button
          className="mt-5 w-full py-3"
          disabled={!valid}
          onClick={() =>
            setSent(
              `✓ ${activeRoleName} successfully invited via ${
                mode === "phone" ? "WhatsApp" : "email"
              }: ${val.trim()}`
            )
          }
        >
          Send Clearance Channel Invite
        </Button>

        {sent && (
          <p
            role="status"
            className="mt-3 font-mono text-xs text-[#22223B] bg-[#F2E9E4] p-2.5 rounded-lg border border-[#C9ADA7] font-semibold"
          >
            {sent}
          </p>
        )}
      </div>

      <div className="rounded-2xl border-2 border-[#C9ADA7] bg-white p-7 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#F2E9E4] pb-3">
          <p className="font-mono text-xs text-[#4A4E69] font-bold">
            THREAD · Foundation Reinforcement · DWG-S-104 rev D
          </p>
          <span className="font-mono text-[10px] bg-[#F2E9E4] text-[#22223B] px-2 py-0.5 rounded font-bold border border-[#C9ADA7]">
            PEER REVIEW
          </span>
        </div>

        <div className="mt-5 rounded-xl border-2 border-[#C9ADA7]/40 bg-[#FAF8F5] p-5">
          <p className="text-sm font-semibold text-[#22223B]">
            <b>Rajesh (Site Eng.)</b> requested Sign-off for Foundation Reinforcement
          </p>
          <p className="mt-1 font-mono text-[11px] text-[#9A8C98]">
            Assigned: Lead Structural Consultant · 11 Oct 2026 09:42 IST
          </p>

          {dec ? (
            <div
              className={cn(
                "mt-4 rounded-xl border-2 p-3.5 font-mono text-xs font-bold",
                dec === "approved"
                  ? "border-[#22223B] bg-[#F2E9E4] text-[#22223B]"
                  : "border-[#C9ADA7] bg-white text-[#22223B]"
              )}
            >
              {dec === "approved" ? (
                <div className="flex items-center gap-2">
                  <Check size={16} />
                  ✓ SIGNED & SEALED · Cryptographic audit trail locked
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Ban size={16} />
                  ⛔ BLOCKED · Query raised, phase kept on HOLD
                </div>
              )}
            </div>
          ) : (
            <div className="mt-5 flex gap-3">
              <Button
                className="flex-1 py-2.5 text-xs font-bold"
                onClick={() => setDec("approved")}
              >
                ✓ Approve & Sign
              </Button>
              <Button
                v="ghost"
                className="flex-1 py-2.5 text-xs font-bold border-2 border-[#C9ADA7]"
                onClick={() => setDec("blocked")}
              >
                ⛔ Raise Query / Block
              </Button>
            </div>
          )}

          {dec && (
            <button
              onClick={() => setDec(null)}
              className="mt-4 text-xs text-[#4A4E69] underline font-medium hover:text-[#22223B]"
            >
              Reset interactive demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
