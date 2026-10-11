"use client";

import {useState} from "react";
import Link from "next/link";
import {
  Check,
  HelpCircle,
  ShieldCheck,
  Zap,
  Building2,
  Building,
  PhoneCall,
  ArrowRight,
  X,
  Sparkles,
  Sliders,
  FileSpreadsheet,
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  Mail,
  Phone,
  User,
  Calendar,
  ChevronRight,
  ChevronLeft,
  BadgeCheck,
  Landmark,
  Receipt,
  QrCode,
  ShieldAlert,
} from "lucide-react";
import {Nav} from "@/components/ui/Nav";
import {Button} from "@/components/ui/Button";
import {cn} from "@/lib/utils";

interface Plan {
  id: "starter" | "growth" | "enterprise";
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  features: string[];
  specs: {
    projects: string;
    stakeholders: string;
    checklists: string;
    support: string;
  };
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Site",
    tagline: "Essential phase gating for single-project developers.",
    monthlyPrice: 4999,
    annualPrice: 4166,
    features: [
      "Up to 2 active construction projects",
      "Unlimited phone & email stakeholder invites",
      "Standard 5-phase readiness checklists",
      "Auditable Proceed / Hold decision logs",
      "Drawing revision links (DWG/PDF)",
      "RERA-ready PDF readiness reports",
      "Email & community support",
    ],
    specs: {
      projects: "2 Active Sites",
      stakeholders: "Unlimited",
      checklists: "Standard Templates",
      support: "Standard Email",
    },
  },
  {
    id: "growth",
    name: "Growth Developer",
    tagline: "The industry standard for active builders managing multiple towers.",
    monthlyPrice: 14999,
    annualPrice: 12499,
    isPopular: true,
    features: [
      "Up to 8 active construction projects",
      "WhatsApp & SMS direct sign-off magic links",
      "Automated SLA escalation for stalled clearances",
      "Multi-consultant peer review sign-off chains",
      "Customizable phase gates for residential & commercial",
      "Defect & open-issue ownership assigning",
      "Exportable auditor trail for banks & investors",
      "Priority WhatsApp & phone onboarding",
    ],
    specs: {
      projects: "Up to 8 Active Sites",
      stakeholders: "Unlimited (Role-Based)",
      checklists: "Custom Multi-Phase Gates",
      support: "Priority Phone & WhatsApp",
    },
  },
  {
    id: "enterprise",
    name: "Portfolio Enterprise",
    tagline: "Tailored for large townships, EPC contractors & municipal bodies.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Unlimited active sites & projects",
      "Custom CAD & ERP integrations (AutoCAD, SAP)",
      "Dedicated Readiness Success Manager",
      "On-site crew & supervisor onboarding sessions",
      "Custom compliance templates (ISO 19650 & RERA)",
      "Custom SLA & guaranteed 99.9% uptime",
      "Dedicated data isolation & enterprise SSO",
    ],
    specs: {
      projects: "Unlimited Portfolio",
      stakeholders: "Enterprise Directory (SSO)",
      checklists: "Custom Enterprise Matrix",
      support: "Dedicated Account Manager",
    },
  },
];

const faqs = [
  {
    q: "Do our structural engineers or consultants need to pay for an account?",
    a: "No! External consultants (architects, MEP consultants, structural engineers, municipal liaisons) are 100% free. You can invite unlimited external team members via their phone number or email, and they can review and sign off without paying a rupee.",
  },
  {
    q: "How does the mobile WhatsApp / phone invite workflow work?",
    a: "When you assign a clearance check or request a sign-off, Block by Block generates a secure, one-tap mobile link sent straight via WhatsApp or SMS. Consultants don't even need to download an app; they review the drawing and tap 'Approve & Sign' directly from their browser.",
  },
  {
    q: "Can I upgrade or downgrade as project phases finish?",
    a: "Yes. All subscriptions are flexible. You can scale from Starter to Growth as you launch more towers, or downgrade between project delivery cycles with zero penalty.",
  },
  {
    q: "Are the Proceed / Hold reports admissible for RERA and lender compliance?",
    a: "Yes. Every phase transition creates an immutable, timestamped PDF report showing who uploaded the drawings, which engineer cleared the calculations, and the exact sign-off log for investor and municipal compliance.",
  },
];

export default function SubscriptionsPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<"starter" | "growth" | "enterprise">("growth");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);

  // Form Fields - Contact & Identity
  const [fullName, setFullName] = useState("Rajesh Varma");
  const [workEmail, setWorkEmail] = useState("vp.development@greenfieldinfra.in");
  const [mobileNumber, setMobileNumber] = useState("98480 88219");
  const [businessName, setBusinessName] = useState("Greenfield Infrastructure & Developers Pvt Ltd");
  const [projectName, setProjectName] = useState("Amaravati Heights (Tower B)");
  const [gstin, setGstin] = useState("37AAACG1234F1Z5");

  // Registered Billing Address
  const [billingAddress, setBillingAddress] = useState("Plot 42, Financial District, Nanakramguda");
  const [city, setCity] = useState("Hyderabad");
  const [stateName, setStateName] = useState("Telangana");
  const [pincode, setPincode] = useState("500032");

  // Payment Verification & Mandate (₹0 Today)
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("rajesh.varma@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4532 9821 7741 8821");
  const [cardExpiry, setCardExpiry] = useState("09/29");
  const [cardCvv, setCardCvv] = useState("721");
  const [cardHolder, setCardHolder] = useState("RAJESH VARMA");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enterprise Interactive Configurator State
  const [towerCount, setTowerCount] = useState<number>(12);
  const [needSAP, setNeedSAP] = useState<boolean>(true);
  const [needOnsiteTraining, setNeedOnsiteTraining] = useState<boolean>(true);
  const [needCustomSLA, setNeedCustomSLA] = useState<boolean>(false);

  const calculateEnterpriseEstimate = () => {
    let base = 28000;
    base += towerCount * 2200;
    if (needSAP) base += 12000;
    if (needOnsiteTraining) base += 8500;
    if (needCustomSLA) base += 9500;
    return isAnnual ? Math.round(base * 0.8) : base;
  };

  const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];

  const handleSelectPlan = (planId: "starter" | "growth" | "enterprise") => {
    setSelectedPlanId(planId);
  };

  const handleOpenModal = (planId?: "starter" | "growth" | "enterprise") => {
    if (planId) setSelectedPlanId(planId);
    setModalStep(1);
    setModalOpen(true);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep(2);
  };

  const handleConfirmSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("bbb_project");
        if (stored) {
          const p = JSON.parse(stored);
          p.subscriptionTier = `${currentPlan.name} (Active)`;
          if (businessName.trim()) p.developerCompany = businessName.trim();
          if (projectName.trim()) p.name = projectName.trim();
          localStorage.setItem("bbb_project", JSON.stringify(p));
        }
      } catch (e) {}
    }

    try {
      await fetch("/api/project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "initialize_workspace",
          planName: currentPlan.name,
          planId: currentPlan.id,
          businessName,
          fullName,
          email: workEmail,
          mobile: `+91 ${mobileNumber}`,
          projectName,
          billingAddress,
          city,
          pincode,
          paymentMethod: paymentMethod.toUpperCase(),
          mandateRef: `MANDATE-${paymentMethod.toUpperCase()}-${mobileNumber.replace(/\s+/g, "").slice(-5)}-OCT26`,
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setModalStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#22223B] flex flex-col selection:bg-[#C9ADA7] selection:text-[#22223B]">
      {/* Liquid Glass Navigation Dockbar */}
      <Nav />

      <main className="flex-1 pb-24">
        {/* Header Hero */}
        <section className="relative border-b border-[#C9ADA7]/40 overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-24">
          <div className="grid-bg absolute inset-0 opacity-25 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9ADA7] bg-[#F2E9E4] px-4 py-1.5 font-mono text-xs text-[#22223B] font-bold backdrop-blur-md">
              <Zap size={14} className="text-[#4A4E69]" />
              TRANSPARENT SUBSCRIPTION TIERS // DIRECT ACCESS
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#22223B] font-heading">
              Simple, Predictable Plans for Real Estate Developers.
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[#4A4E69] leading-relaxed">
              Eliminate costly concrete rework, drawing revision disputes, and handover delays.
              Select any tier below to inspect features and activate your development workspace.
            </p>

            {/* 3D Liquid Glass Billing Toggle */}
            <div className="mt-10 inline-flex items-center gap-1 rounded-full p-1 glass-toggle-track shadow-inner">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                  !isAnnual
                    ? "glass-toggle-thumb shadow-md"
                    : "text-[#4A4E69] hover:text-[#22223B]"
                )}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                  isAnnual
                    ? "glass-toggle-thumb shadow-md"
                    : "text-[#4A4E69] hover:text-[#22223B]"
                )}
              >
                Annual Billing
                <span className={cn(
                  "rounded-full px-2 py-0.5 font-mono text-[11px] font-bold",
                  isAnnual ? "bg-[#22223B] text-white" : "bg-[#F2E9E4] text-[#22223B]"
                )}>
                  2 Months Free
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid (Clean Bento Spacing & Clickable Selectors) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#4A4E69] font-bold">
              Step 1: Choose or Switch Your Subscription Tier
            </p>
            <p className="text-sm text-[#4A4E69] mt-1">
              Click any card below to select it and review its deployment parameters.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={cn(
                    "relative flex flex-col justify-between rounded-2xl border p-8 transition-all duration-300 cursor-pointer text-left select-none",
                    isSelected
                      ? "bg-white border-2 border-[#22223B] shadow-2xl ring-2 ring-[#22223B] lg:-translate-y-2"
                      : "bg-white border-[#C9ADA7]/50 shadow-sm hover:border-[#4A4E69]/40 hover:shadow-md"
                  )}
                >
                  {/* Top Status Pill */}
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#22223B] px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#C9ADA7]" />
                      Most Popular for Builders
                    </div>
                  )}

                  {isSelected && !plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#F2E9E4] border border-[#C9ADA7] px-3.5 py-1 font-mono text-[11px] font-bold text-[#22223B] shadow-md flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#22223B]" />
                      Active Selection
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-2xl font-bold text-[#22223B] font-heading">
                        {plan.name}
                      </h2>
                      <div className={cn(
                        "grid h-6 w-6 place-items-center rounded-full border text-xs transition-colors font-bold",
                        isSelected
                          ? "border-[#22223B] bg-[#22223B] text-white"
                          : "border-[#C9ADA7] text-transparent"
                      )}>
                        ✓
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-[#4A4E69] min-h-[42px] leading-relaxed">
                      {plan.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="mt-6 flex items-baseline gap-2 border-b border-[#C9ADA7]/40 pb-6">
                      {plan.monthlyPrice > 0 ? (
                        <>
                          <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-[#22223B]">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-sm font-mono text-[#4A4E69] font-bold">/month</span>
                        </>
                      ) : (
                        <div>
                          <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#22223B]">
                            Custom Quote
                          </span>
                          <span className="block text-xs font-mono text-[#4A4E69] mt-1 font-semibold">
                            Interactive Calculator Below
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick Specs */}
                    <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs text-[#4A4E69] border-b border-[#C9ADA7]/40 pb-5">
                      <div className="bg-[#F2E9E4] p-2.5 rounded-lg border border-[#C9ADA7]/50">
                        <span className="block text-[10px] uppercase text-[#4A4E69] font-bold">Projects</span>
                        <span className="font-bold text-[#22223B] mt-0.5 block">{plan.specs.projects}</span>
                      </div>
                      <div className="bg-[#F2E9E4] p-2.5 rounded-lg border border-[#C9ADA7]/50">
                        <span className="block text-[10px] uppercase text-[#4A4E69] font-bold">Team Seats</span>
                        <span className="font-bold text-[#22223B] mt-0.5 block">{plan.specs.stakeholders}</span>
                      </div>
                    </div>

                    {/* Feature List with generous spacing */}
                    <ul className="mt-6 space-y-3.5 text-sm text-[#4A4E69]">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-[#22223B]" />
                          <span className="text-[#22223B]/90 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-8 pt-6 border-t border-[#C9ADA7]/40">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(plan.id);
                      }}
                      v={isSelected ? "primary" : "ghost"}
                      className={cn(
                        "w-full py-3.5 justify-center text-sm font-bold shadow-sm",
                        isSelected ? "bg-[#22223B] text-white hover:bg-[#4A4E69]" : "bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7]"
                      )}
                    >
                      {plan.id === "enterprise"
                        ? "Configure Custom Enterprise Quote"
                        : `Select & Start ${plan.name} Trial`}
                    </Button>
                    <p className="mt-2.5 text-center font-mono text-[11px] text-[#4A4E69]">
                      {plan.id === "enterprise"
                        ? "Instant calculation · Tailored SLA agreement"
                        : "No credit card required · 14-day free pilot"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Enterprise Quote Configurator */}
          {selectedPlanId === "enterprise" && (
            <div className="mt-14 rounded-2xl border-2 border-[#C9ADA7] bg-white p-6 sm:p-10 shadow-xl animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#C9ADA7]/40 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#4A4E69] flex items-center gap-1.5 font-bold">
                    <Sliders size={14} className="text-[#22223B]" />
                    Live Enterprise Quote Configurator
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#22223B] mt-1 font-heading">
                    Configure Custom Parameters for Your Development Portfolio
                  </h3>
                  <p className="text-sm text-[#4A4E69] mt-1">
                    Adjust active towers and custom requirements to view an instant tailored quote estimate.
                  </p>
                </div>

                <div className="text-left md:text-right p-4 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7] min-w-[220px]">
                  <span className="block text-xs font-mono text-[#4A4E69] uppercase font-bold">Indicative Quote</span>
                  <span className="font-mono text-3xl font-extrabold text-[#22223B]">
                    ₹{calculateEnterpriseEstimate().toLocaleString("en-IN")}
                  </span>
                  <span className="block text-[11px] font-mono text-[#4A4E69]">
                    /month {isAnnual ? "(Billed annually - 20% off)" : "(Billed monthly)"}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {/* Left: Interactive Controls */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center text-sm font-semibold text-[#22223B] mb-2">
                      <label>Active Towers & Construction Sites</label>
                      <span className="font-mono text-[#22223B] font-bold text-base bg-[#F2E9E4] px-3 py-1 rounded-md border border-[#C9ADA7]">
                        {towerCount} Sites
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      step={1}
                      value={towerCount}
                      onChange={(e) => setTowerCount(Number(e.target.value))}
                      className="w-full accent-[#22223B] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-[#4A4E69] mt-1">
                      <span>5 Sites (Mid Township)</span>
                      <span>20 Sites (Multi-Zone)</span>
                      <span>40+ Sites (EPC Mega-Project)</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#4A4E69] block font-bold">
                      Custom Architecture & Integrations
                    </span>

                    <label className="flex items-center gap-3 p-3 rounded-lg bg-[#F2E9E4] border border-[#C9ADA7]/50 cursor-pointer hover:border-[#22223B] transition-colors">
                      <input
                        type="checkbox"
                        checked={needSAP}
                        onChange={(e) => setNeedSAP(e.target.checked)}
                        className="h-4 w-4 accent-[#22223B] rounded"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#22223B] block">Direct SAP / ERP & AutoCAD Live Bridge</span>
                        <span className="text-[#4A4E69]">Sync revision numbers and BOQ material dispatch directly.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-lg bg-[#F2E9E4] border border-[#C9ADA7]/50 cursor-pointer hover:border-[#22223B] transition-colors">
                      <input
                        type="checkbox"
                        checked={needOnsiteTraining}
                        onChange={(e) => setNeedOnsiteTraining(e.target.checked)}
                        className="h-4 w-4 accent-[#22223B] rounded"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#22223B] block">On-Site Field Supervisor Onboarding</span>
                        <span className="text-[#4A4E69]">Physical training sessions for project managers and quality liaisons.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-lg bg-[#F2E9E4] border border-[#C9ADA7]/50 cursor-pointer hover:border-[#22223B] transition-colors">
                      <input
                        type="checkbox"
                        checked={needCustomSLA}
                        onChange={(e) => setNeedCustomSLA(e.target.checked)}
                        className="h-4 w-4 accent-[#22223B] rounded"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#22223B] block">Custom 15-Minute Critical Sign-Off SLA Guarantee</span>
                        <span className="text-[#4A4E69]">24/7 dedicated engineering desk for pour clearance escalations.</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Right: Summary & Action */}
                <div className="flex flex-col justify-between p-6 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/60">
                  <div className="space-y-4">
                    <h4 className="font-bold text-[#22223B] text-base border-b border-[#C9ADA7]/40 pb-3">
                      Included Enterprise Protections
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#4A4E69]">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#22223B]" />
                        <span className="text-[#22223B]">Dedicated Single-Tenant Data Isolation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#22223B]" />
                        <span className="text-[#22223B]">Unlimited Free External Structural & Geotech Signers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#22223B]" />
                        <span className="text-[#22223B]">RERA & ISO 19650 Statutory Compliance Ledger</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-[#22223B]" />
                        <span className="text-[#22223B]">Enterprise Single Sign-On (Okta, Azure AD, Google)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#C9ADA7]/40 space-y-3">
                    <Button
                      onClick={() => handleOpenModal("enterprise")}
                      className="w-full py-3.5 justify-center text-sm font-bold bg-[#22223B] text-white hover:bg-[#4A4E69]"
                    >
                      Request Formal Custom Proposal (₹{calculateEnterpriseEstimate().toLocaleString("en-IN")}/mo)
                    </Button>
                    <p className="text-center text-[11px] font-mono text-[#4A4E69]">
                      A Block by Block Solutions Architect will respond within 4 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Feature Comparison Table */}
        <section className="border-t border-[#C9ADA7]/40 bg-[#FAF8F5] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#22223B] font-heading">
                Compare Plan Capabilities
              </h2>
              <p className="mt-2 text-sm text-[#4A4E69]">
                See exactly which phase checks and team permissions match your project stage.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#C9ADA7]/50 bg-white shadow-md">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#C9ADA7]/40 bg-[#F2E9E4]">
                    <th className="p-4.5 text-xs font-mono uppercase tracking-wider text-[#4A4E69] font-bold">Feature / Capability</th>
                    <th className="p-4.5 text-xs font-mono uppercase tracking-wider text-[#22223B] font-bold">Starter Site</th>
                    <th className="p-4.5 text-xs font-mono uppercase tracking-wider text-[#22223B] bg-[#C9ADA7]/20 font-bold">
                      Growth Developer (Selected)
                    </th>
                    <th className="p-4.5 text-xs font-mono uppercase tracking-wider text-[#22223B] font-bold">Portfolio Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9ADA7]/30">
                  {[
                    ["Phase-Readiness Gating Engine", "5 Standard Phases", "Custom Gating Stages", "Unlimited Multi-Tower"],
                    ["Free External Consultant Invites", "Unlimited (Phone/Email)", "Unlimited (Phone/Email)", "Unlimited + SSO"],
                    ["WhatsApp & SMS Direct Sign-offs", "Email Only", "Included (Instant Link)", "Included (Custom White-label)"],
                    ["Automated Proceed/Hold Risk Gauge", "Yes", "Yes (Weighted Checks)", "Yes (AI Risk Analytics)"],
                    ["Document Revision Control", "PDF & DWG Links", "Version Comparison", "CAD Integrations"],
                    ["RERA & Audit Trail PDF Generation", "Standard Export", "Detailed Timestamped", "Comprehensive Legal Audit"],
                    ["SLA Escalation Reminders", "Manual", "Automated (24h/48h)", "Custom Protocol"],
                    ["Dedicated Account Manager", "No", "Priority Support", "Dedicated Manager"],
                  ].map(([f, s, g, e], idx) => (
                    <tr key={idx} className="hover:bg-[#F2E9E4]/40 transition-colors">
                      <td className="p-4 font-semibold text-[#22223B]">{f}</td>
                      <td className="p-4 font-mono text-xs text-[#4A4E69]">{s}</td>
                      <td className="p-4 font-mono text-xs text-[#22223B] bg-[#C9ADA7]/10 font-bold">{g}</td>
                      <td className="p-4 font-mono text-xs text-[#4A4E69]">{e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs with Clean Spacing */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#22223B] font-heading">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-[#4A4E69]">
              Everything you need to know about starting with Block by Block.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-[#C9ADA7]/50 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-[#22223B] flex items-center gap-2.5 font-heading">
                  <HelpCircle size={18} className="text-[#4A4E69] shrink-0" />
                  {faq.q}
                </h3>
                <p className="mt-3 text-sm text-[#4A4E69] leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Subscription Modal (Handles Complete Details, Billing Address & Payment Method) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-[#C9ADA7]/80 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header Bar */}
            <div className="relative border-b border-[#C9ADA7]/40 bg-gradient-to-b from-[#F2E9E4]/60 to-white px-6 sm:px-8 pt-6 pb-5">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-full bg-white border border-[#C9ADA7]/60 text-[#4A4E69] hover:text-[#22223B] hover:bg-[#F2E9E4] transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9ADA7] bg-white px-3 py-0.5 font-mono text-[11px] font-bold text-[#22223B] uppercase tracking-wider">
                  <ShieldCheck size={12} className="text-[#4A4E69]" />
                  {currentPlan.id === "enterprise" ? "Enterprise Custom Proposal" : "14-Day Free Pilot Activation"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F2E9E4] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[#4A4E69]">
                  <Lock size={11} className="text-[#4A4E69]" />
                  ₹0 Due Today · RBI Compliant
                </span>
              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#22223B] tracking-tight font-heading">
                {currentPlan.id === "enterprise"
                  ? "Enterprise Development Architecture Setup"
                  : `Initialize ${currentPlan.name} Workspace`}
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-[#4A4E69]">
                {currentPlan.id === "enterprise"
                  ? `Estimated Quote: ₹${calculateEnterpriseEstimate().toLocaleString("en-IN")}/mo for ${towerCount} towers`
                  : `${isAnnual ? `₹${currentPlan.annualPrice.toLocaleString("en-IN")}/mo (Annual)` : `₹${currentPlan.monthlyPrice.toLocaleString("en-IN")}/mo`} · 14 days complimentary trial, cancel anytime.`}
              </p>

              {/* Progress Step Badges (Only shown before success) */}
              {modalStep !== 3 && (
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalStep(1)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold transition-all",
                      modalStep === 1
                        ? "bg-[#22223B] text-white shadow-sm"
                        : "bg-white border border-[#C9ADA7]/60 text-[#4A4E69] hover:text-[#22223B]"
                    )}
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[10px]">1</span>
                    Contact & Business Details
                  </button>

                  <div className="h-px w-4 bg-[#C9ADA7]/60" />

                  <button
                    type="button"
                    onClick={() => setModalStep(2)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold transition-all",
                      modalStep === 2
                        ? "bg-[#22223B] text-white shadow-sm"
                        : "bg-white border border-[#C9ADA7]/60 text-[#4A4E69] hover:text-[#22223B]"
                    )}
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[10px]">2</span>
                    Billing & Payment Method
                  </button>
                </div>
              )}
            </div>

            {/* Modal Body with Custom Scroll */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 flex-1">
              {/* STEP 1: CONTACT & BUSINESS DETAILS */}
              {modalStep === 1 && (
                <form onSubmit={handleProceedToPayment} className="space-y-5">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4A4E69] flex items-center gap-2">
                      <User size={13} className="text-[#22223B]" />
                      1. Authorized Signatory & Contact
                    </h4>

                    <div className="mt-3 space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#22223B] mb-1">
                          Full Name (Authorized Signatory / Executive)
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rajesh Varma"
                            className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] placeholder:text-[#4A4E69]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            Official Work Email
                          </label>
                          <div className="relative">
                            <input
                              required
                              type="email"
                              value={workEmail}
                              onChange={(e) => setWorkEmail(e.target.value)}
                              placeholder="vp@developergroup.com"
                              className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] placeholder:text-[#4A4E69]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            Mobile Phone Number (WhatsApp Enabled)
                          </label>
                          <div className="relative flex">
                            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#C9ADA7]/70 bg-[#F2E9E4] text-xs font-mono font-bold text-[#22223B]">
                              +91
                            </span>
                            <input
                              required
                              type="tel"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              placeholder="98480 88219"
                              className="w-full rounded-r-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] placeholder:text-[#4A4E69]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#C9ADA7]/30">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4A4E69] flex items-center gap-2">
                      <Building size={13} className="text-[#22223B]" />
                      2. Company & Project Details
                    </h4>

                    <div className="mt-3 space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#22223B] mb-1">
                          Registered Developer Company / Business Name
                        </label>
                        <input
                          required
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Greenfield Infrastructure & Developers Pvt Ltd"
                          className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] placeholder:text-[#4A4E69]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            Primary Project / Site Name
                          </label>
                          <input
                            required
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="e.g. Amaravati Heights (Tower B)"
                            className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] placeholder:text-[#4A4E69]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-semibold text-[#22223B]">
                              GSTIN / Tax ID
                            </label>
                            <span className="font-mono text-[10px] text-[#4A4E69]">Optional for ITC</span>
                          </div>
                          <input
                            type="text"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value)}
                            placeholder="e.g. 37AAACG1234F1Z5"
                            className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm font-mono text-[#22223B] placeholder:text-[#4A4E69]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#C9ADA7]/60 bg-[#F2E9E4]/50 p-3.5 text-xs text-[#22223B] flex items-start gap-2.5">
                    <ShieldCheck size={16} className="text-[#22223B] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Instant activation: Phase readiness checklists, WhatsApp specialist magic links, and auditable Proceed/Hold decision logs unlock immediately upon verification.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full py-3.5 justify-center bg-[#22223B] text-white hover:bg-[#4A4E69] font-bold text-sm shadow-md"
                    >
                      Continue to Payment & Billing Details
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </form>
              )}

              {/* STEP 2: BILLING ADDRESS & PAYMENT METHOD (₹0 TODAY) */}
              {modalStep === 2 && (
                <form onSubmit={handleConfirmSubscription} className="space-y-5">
                  {/* Registered Billing Address Section */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4A4E69] flex items-center gap-2">
                      <MapPin size={13} className="text-[#22223B]" />
                      1. Registered Billing Address
                    </h4>

                    <div className="mt-3 space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#22223B] mb-1">
                          Street Address / Premises / Suite
                        </label>
                        <input
                          required
                          type="text"
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          placeholder="Plot 42, Financial District, Nanakramguda"
                          className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            City
                          </label>
                          <input
                            required
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Hyderabad"
                            className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            State
                          </label>
                          <input
                            required
                            type="text"
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            placeholder="Telangana"
                            className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm text-[#22223B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            PIN Code
                          </label>
                          <input
                            required
                            type="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="500032"
                            className="w-full rounded-xl border border-[#C9ADA7]/70 bg-[#F2E9E4]/40 px-3.5 py-2.5 text-sm font-mono text-[#22223B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22223B] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="pt-2 border-t border-[#C9ADA7]/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#4A4E69] flex items-center gap-2">
                        <CreditCard size={13} className="text-[#22223B]" />
                        2. Payment Method (₹0 e-Mandate Verification)
                      </h4>
                      <span className="font-mono text-[11px] font-bold text-[#22223B] bg-[#F2E9E4] px-2 py-0.5 rounded-full">
                        ₹0 Due Today
                      </span>
                    </div>

                    <p className="text-xs text-[#4A4E69] mb-3 leading-relaxed">
                      An RBI-compliant auto-mandate is registered to secure your 14-day free pilot. Zero charges are deducted today. Auto-billing initiates only if not cancelled before Day 14.
                    </p>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-[#F2E9E4]/70 border border-[#C9ADA7]/60">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={cn(
                          "py-2 px-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
                          paymentMethod === "upi"
                            ? "bg-white text-[#22223B] shadow-sm font-bold border border-[#C9ADA7]/50"
                            : "text-[#4A4E69] hover:text-[#22223B]"
                        )}
                      >
                        <QrCode size={13} />
                        UPI AutoPay
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={cn(
                          "py-2 px-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
                          paymentMethod === "card"
                            ? "bg-white text-[#22223B] shadow-sm font-bold border border-[#C9ADA7]/50"
                            : "text-[#4A4E69] hover:text-[#22223B]"
                        )}
                      >
                        <CreditCard size={13} />
                        Corporate Card
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("netbanking")}
                        className={cn(
                          "py-2 px-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
                          paymentMethod === "netbanking"
                            ? "bg-white text-[#22223B] shadow-sm font-bold border border-[#C9ADA7]/50"
                            : "text-[#4A4E69] hover:text-[#22223B]"
                        )}
                      >
                        <Landmark size={13} />
                        Net Banking
                      </button>
                    </div>

                    {/* Method Specific Inputs */}
                    <div className="mt-3.5 p-4 rounded-2xl border border-[#C9ADA7]/60 bg-[#F2E9E4]/30 space-y-3">
                      {paymentMethod === "upi" && (
                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1">
                            UPI Virtual Payment Address (VPA / UPI ID)
                          </label>
                          <div className="relative">
                            <input
                              required
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="e.g. developer@okhdfcbank or 9848088219@upi"
                              className="w-full rounded-xl border border-[#C9ADA7]/70 bg-white px-3.5 py-2.5 text-sm font-mono text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#22223B]"
                            />
                          </div>
                          <p className="mt-1.5 text-[11px] text-[#4A4E69] flex items-center gap-1">
                            <Check size={12} className="text-[#22223B]" />
                            Compatible with Google Pay, PhonePe, Paytm, BHIM & CRED UPI auto-mandates.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-[#22223B] mb-1">
                              Name on Corporate / Business Card
                            </label>
                            <input
                              required
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              placeholder="RAJESH VARMA"
                              className="w-full rounded-xl border border-[#C9ADA7]/70 bg-white px-3.5 py-2 text-sm text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#22223B]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-[#22223B] mb-1">
                              Card Number (Visa, MasterCard, RuPay, Amex)
                            </label>
                            <input
                              required
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4532 9821 7741 8821"
                              className="w-full rounded-xl border border-[#C9ADA7]/70 bg-white px-3.5 py-2 text-sm font-mono text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#22223B]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-[#22223B] mb-1">
                                Expiration Date
                              </label>
                              <input
                                required
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full rounded-xl border border-[#C9ADA7]/70 bg-white px-3.5 py-2 text-sm font-mono text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#22223B]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-[#22223B] mb-1">
                                CVV / Security Code
                              </label>
                              <input
                                required
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="•••"
                                className="w-full rounded-xl border border-[#C9ADA7]/70 bg-white px-3.5 py-2 text-sm font-mono text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#22223B]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === "netbanking" && (
                        <div>
                          <label className="block text-xs font-semibold text-[#22223B] mb-1.5">
                            Select Corporate / Primary Banking Partner
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "Other Bank"].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => setSelectedBank(bank)}
                                className={cn(
                                  "py-2 px-2.5 rounded-xl text-xs font-medium border text-left transition-all",
                                  selectedBank === bank
                                    ? "bg-[#22223B] text-white border-[#22223B] font-bold"
                                    : "bg-white text-[#4A4E69] border-[#C9ADA7]/70 hover:border-[#22223B]"
                                )}
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                          <p className="mt-2 text-[11px] text-[#4A4E69]">
                            You will authenticate ₹0 recurring e-mandate through {selectedBank}&apos;s secure corporate gateway.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Breakdown Card */}
                  <div className="rounded-2xl border border-[#C9ADA7]/80 bg-white p-4 shadow-sm space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#4A4E69]">
                      <span>Selected Workspace Plan</span>
                      <span className="text-[#22223B] font-bold">{currentPlan.name} ({isAnnual ? "Annual" : "Monthly"})</span>
                    </div>
                    <div className="flex items-center justify-between text-[#4A4E69]">
                      <span>14-Day Pilot Period</span>
                      <span className="text-[#22223B] font-semibold">14 Days Unlimited Access</span>
                    </div>
                    <div className="flex items-center justify-between text-[#4A4E69]">
                      <span>First Auto-Renewal Charge</span>
                      <span className="text-[#22223B]">
                        {currentPlan.id === "enterprise" ? "Custom Proposal Terms" : `₹${(isAnnual ? currentPlan.annualPrice : currentPlan.monthlyPrice).toLocaleString("en-IN")}/mo after 14 days`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#C9ADA7]/40 flex items-center justify-between text-sm">
                      <span className="font-bold text-[#22223B]">Total Amount Due Today</span>
                      <span className="font-extrabold text-[#22223B] text-base">₹0.00</span>
                    </div>
                  </div>

                  {/* Trust Micro-Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#4A4E69]">
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-[#22223B]" />
                      <span>1-Click Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={12} className="text-[#22223B]" />
                      <span>Zero cancellation penalty</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock size={12} className="text-[#22223B]" />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setModalStep(1)}
                      className="px-4 py-3 rounded-xl border border-[#C9ADA7] text-xs font-bold text-[#4A4E69] hover:text-[#22223B] hover:bg-[#F2E9E4] transition-colors flex items-center gap-1"
                    >
                      <ChevronLeft size={14} />
                      Back
                    </button>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 justify-center bg-[#22223B] text-white hover:bg-[#4A4E69] font-bold text-sm shadow-md"
                    >
                      {isSubmitting
                        ? "Verifying Mandate & Provisioning..."
                        : currentPlan.id === "enterprise"
                          ? "Submit Custom Proposal Request"
                          : "Activate 14-Day Free Pilot (₹0 Due Today)"}
                      <ArrowRight size={15} className="ml-1.5" />
                    </Button>
                  </div>
                </form>
              )}

              {/* STEP 3: SUCCESS & ACTIVATION COMPLETE */}
              {modalStep === 3 && (
                <div className="text-center py-4 space-y-5">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#F2E9E4] border-2 border-[#C9ADA7] text-[#22223B] shadow-md">
                    <ShieldCheck size={36} />
                  </div>

                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A4E69]">
                      Workspace Initialized & Armed
                    </span>
                    <h3 className="mt-1 text-2xl font-extrabold text-[#22223B] font-heading">
                      {currentPlan.id === "enterprise" ? "Enterprise Proposal Dispatched!" : "14-Day Free Pilot Activated!"}
                    </h3>
                    <p className="mt-1 text-sm text-[#4A4E69] max-w-md mx-auto">
                      Development workspace has been provisioned for <b className="text-[#22223B]">{businessName}</b> under the <b className="text-[#22223B]">{currentPlan.name}</b> tier.
                    </p>
                  </div>

                  {/* Detailed Receipt Card */}
                  <div className="rounded-2xl border border-[#C9ADA7]/80 bg-[#F2E9E4]/40 p-5 text-left font-mono text-xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-2">
                      <span className="text-[#4A4E69]">Authorized Contact:</span>
                      <span className="text-[#22223B] font-bold">{fullName} (+91 {mobileNumber})</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-2">
                      <span className="text-[#4A4E69]">Corporate Email:</span>
                      <span className="text-[#22223B] font-semibold">{workEmail}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-2">
                      <span className="text-[#4A4E69]">Primary Project:</span>
                      <span className="text-[#22223B] font-bold">{projectName}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-2">
                      <span className="text-[#4A4E69]">Billing Address:</span>
                      <span className="text-[#22223B] text-right">{billingAddress}, {city}, {pincode}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-2">
                      <span className="text-[#4A4E69]">Payment Mandate:</span>
                      <span className="text-[#22223B] font-bold">
                        {paymentMethod.toUpperCase()} AutoPay (₹0.00 Authorized · Active e-Mandate)
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#4A4E69]">Readiness Gate Status:</span>
                      <span className="text-[#22223B] font-bold bg-white px-2 py-0.5 rounded border border-[#C9ADA7]/60">
                        Phase 02 Foundation Pour Armed
                      </span>
                    </div>
                  </div>

                  {/* Next Step Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      href="/dashboard"
                      className="flex-1 justify-center py-3.5 bg-[#22223B] text-white hover:bg-[#4A4E69] font-bold shadow-md"
                    >
                      Open Project Dashboard
                      <ArrowRight size={15} className="ml-1.5" />
                    </Button>
                    <Button
                      v="ghost"
                      onClick={() => setModalOpen(false)}
                      className="justify-center border border-[#C9ADA7] text-[#4A4E69] hover:text-[#22223B] py-3.5"
                    >
                      Close Window
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#C9ADA7]/40 py-8 px-4 text-center font-mono text-xs text-[#4A4E69]">
        Block by Block · Process Compliant with ISO 19650 & RERA Guidelines · Architectural Gating Engine · © 2026 Block by Block
      </footer>
    </div>
  );
}
