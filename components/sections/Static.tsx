"use client";
import {Button} from "../ui/Button";
const m=["Amaravati","Bengaluru","Hyderabad","Pune","MMR","NCR","₹18.4L avg. rework saved per residential tower","100% auditable sign-off trail","Zero WhatsApp drawing confusion"];
export function Marquee(){
  return <div className="overflow-hidden border-y border-line bg-s1 py-4" aria-label="Markets and outcomes"><div className="mq flex w-max gap-12 font-mono text-sm text-slate">
    {[...m,...m].map((x,i)=><span key={i} aria-hidden={i>=m.length} className={x.length>12?"text-ti":""}>{x}</span>)}</div></div>;
}
const cols=["Traditional (WhatsApp + Excel + Site Meetings)","Enterprise (Procore, Autodesk Build)","Generic Task Apps (Powerplay, Onsite, MS Project)","Block by Block"];
const rows:[string,string[]][]=[
 ["Readiness gating",["None — decisions live in chat","Configurable, heavy setup","No gated readiness checks","Phase-Readiness Gates"]],
 ["Onboarding",["Instant, unstructured","~6 months","Days","5 minutes, by phone number"]],
 ["Cost",["Free, then rework","₹8L+/year","Low","Tiered, from single site"]],
 ["Audit trail",["Scattered screenshots","Full","Task history only","Auditable Proceed/Hold records"]],
 ["Built for",["Nobody","Large contractors","Generic teams","Mid-sized developers"]]];
export function Compare(){
  return <div className="overflow-x-auto rounded-lg border border-line"><table className="w-full min-w-[820px] text-left text-sm">
    <caption className="sr-only">Comparison of Block by Block with alternatives</caption>
    <thead><tr className="bg-s1"><th className="p-4"/>{cols.map((c,i)=><th key={c} scope="col" className={"p-4 font-semibold "+(i===3?"bg-cad/10 text-cad":"")}>{c}</th>)}</tr></thead>
    <tbody>{rows.map(([r,v])=><tr key={r} className="border-t border-line"><th scope="row" className="p-4 font-mono text-xs font-normal text-slate">{r}</th>{v.map((x,i)=><td key={i} className={"p-4 "+(i===3?"bg-cad/10 font-semibold":"text-slate")}>{x}</td>)}</tr>)}</tbody></table></div>;
}
export function FinalCTA(){
  return (
    <section className="relative border-t border-line">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 lg:py-28 text-center">
        <span className="font-mono text-xs text-cad uppercase tracking-wider">
          Zero Defect Delivery
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-ti">
          Stop discovering mistakes after the concrete cures.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate text-base sm:text-lg">
          Join small and mid-sized developers across Amaravati, Bengaluru, Hyderabad, and Pune who run predictable, on-time project handovers.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/subscriptions";
          }}
        >
          <label htmlFor="cta" className="sr-only">Work email or phone number</label>
          <input
            id="cta"
            required
            placeholder="Work email or mobile number"
            className="flex-1 rounded-md border border-line bg-s1 px-4 py-3 text-sm text-ti focus-visible:outline focus-visible:outline-2 focus-visible:outline-cad placeholder:text-slate/60"
          />
          <Button type="submit" size="md" className="whitespace-nowrap">
            Start Free Pilot
          </Button>
        </form>
      </div>

      <footer className="relative border-t border-line bg-s1/40 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="font-bold text-sm text-ti">Block by Block</span>
              <p className="text-xs text-slate font-mono mt-0.5">
                The Phase-Readiness Gate for Real Estate Developers
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate font-medium">
              <a href="/workflow" className="hover:text-white transition-colors">Workflow</a>
              <a href="/channels" className="hover:text-white transition-colors">Channels</a>
              <a href="/demo" className="hover:text-white transition-colors">Live Demo</a>
              <a href="/calculator" className="hover:text-white transition-colors">ROI Calculator</a>
              <a href="/subscriptions" className="hover:text-white transition-colors">Subscriptions</a>
              <a href="/login" className="hover:text-white transition-colors">Login</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-line/60 text-center font-mono text-[11px] text-slate/70">
            Aligned with ISO 19650 Information Protocols · RERA Compliance Ready · 16.5062° N, 80.6480° E · © 2026 Block by Block
          </div>
        </div>
      </footer>
    </section>
  );
}
