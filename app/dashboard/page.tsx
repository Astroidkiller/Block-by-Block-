"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import confetti from "canvas-confetti";
import {
  FileCheck2,
  Users,
  MessageSquare,
  FileDown,
  UserPlus,
  Send,
  Clock,
  ArrowRight,
  LogOut,
  RefreshCw,
  Stamp,
  FileText,
  Phone,
  Mail,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  ShieldAlert,
  ShieldCheck,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Paperclip,
  Image as ImageIcon,
  Lock,
  Building,
  UserCheck,
  KeyRound,
} from "lucide-react";
import {Logo} from "@/components/ui/Nav";
import {Button} from "@/components/ui/Button";
import {cn} from "@/lib/utils";
import type {ProjectData, User, ClearanceItem} from "@/lib/db";
import {defaultProject} from "@/lib/initial-data";

export default function DashboardPage() {
  const router = useRouter();

  // Active User session (Defaults to Developer Rajesh, can toggle to Company Sarah Chen)
  const [activeRole, setActiveRole] = useState<"customer" | "company_employee">("customer");
  const [currentUser, setCurrentUser] = useState<User>({
    id: "usr_customer_1",
    email: "rajesh@greenfield.com",
    password: "developer123",
    name: "Rajesh Varma",
    role: "customer",
    title: "VP of Development",
    company: "Greenfield Developers Pvt Ltd",
    avatar: "RV",
  });

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to persist project locally
  const persistFallbackProject = (updated: ProjectData) => {
    setProject(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("bbb_project", JSON.stringify(updated));
    }
  };

  // Modals state
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteContact, setInviteContact] = useState("");
  const [inviteRole, setInviteRole] = useState("Structural Consultant");
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [customRoleInput, setCustomRoleInput] = useState("");
  const [inviteType, setInviteType] = useState<"phone" | "email">("phone");

  // Proof Upload Modal state (Simple file/photo upload + message space)
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [selectedClearance, setSelectedClearance] = useState<ClearanceItem | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{name: string; size: string} | null>(null);
  const [proofMessage, setProofMessage] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [switchRoleModalOpen, setSwitchRoleModalOpen] = useState(false);

  // Fetch project data from API with localStorage fallback for GitHub Pages
  const fetchProjectData = async () => {
    try {
      const res = await fetch("/api/project");
      if (res.ok) {
        const data = await res.json();
        setProject(data);
        if (typeof window !== "undefined") {
          localStorage.setItem("bbb_project", JSON.stringify(data));
        }
        setLoading(false);
        return;
      }
    } catch (err) {
      // In static deployment, fallback to localStorage/defaultProject
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bbb_project");
      if (stored) {
        try {
          setProject(JSON.parse(stored));
          setLoading(false);
          return;
        } catch (e) {}
      }
      localStorage.setItem("bbb_project", JSON.stringify(defaultProject));
    }
    setProject(defaultProject);
    setLoading(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("bbb_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setCurrentUser(u);
        setActiveRole(u.role);
      } catch (e) {}
    }
    fetchProjectData();
  }, []);

  // 3D Liquid Glass Role Switcher
  const handleSwitchRole = (role: "customer" | "company_employee") => {
    if (role === "customer") {
      const u: User = {
        id: "usr_customer_1",
        email: "rajesh@greenfield.com",
        password: "developer123",
        name: "Rajesh Varma",
        role: "customer",
        title: "VP of Development",
        company: "Greenfield Developers Pvt Ltd",
        avatar: "RV",
      };
      setCurrentUser(u);
      setActiveRole("customer");
      localStorage.setItem("bbb_user", JSON.stringify(u));
    } else {
      const u: User = {
        id: "usr_employee_1",
        email: "sarah.chen@blockbyblock.internal",
        password: "company123",
        name: "Sarah Chen, PE",
        role: "company_employee",
        title: "Lead Structural & QA Inspector",
        company: "Block by Block Engineering",
        avatar: "SC",
      };
      setCurrentUser(u);
      setActiveRole("company_employee");
      localStorage.setItem("bbb_user", JSON.stringify(u));
    }
    setActionSuccess(`Switched to ${role === "customer" ? "Developer View (Rajesh)" : "Company Inspector (Sarah Chen)"}`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Open Proof Upload Modal for a clearance
  const handleOpenUploadProof = (item: ClearanceItem) => {
    setSelectedClearance(item);
    setUploadedFile({
      name: `${item.drawingRef}-Site-Photo.jpg`,
      size: "3.4 MB",
    });
    setProofMessage("");
    setProofModalOpen(true);
  };

  // Submit Uploaded Proof
  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClearance) return;

    const fileToSubmit = uploadedFile || {
      name: `${selectedClearance.drawingRef}-Site-Proof.jpg`,
      size: "3.2 MB",
    };

    const notes = proofMessage.trim() || `Site verification photo and clearance proof uploaded for ${selectedClearance.title}`;

    // Apply mutation locally for static environments (GitHub Pages)
    const currentBase = project || defaultProject;
    const updatedClearances = currentBase.clearances.map((c) =>
      c.id === selectedClearance.id
        ? {
            ...c,
            status: "proof_uploaded" as const,
            proofDocument: {
              fileName: fileToSubmit.name,
              fileSize: fileToSubmit.size,
              uploadedAt: "Just now",
              uploadedBy: currentUser.name,
              documentRef: selectedClearance.drawingRef,
              notes,
            },
            updatedAt: "Just now",
          }
        : c
    );
    const updatedAudit = [
      {
        id: `log_${Date.now()}`,
        action: `Proof Uploaded for '${selectedClearance.title}': ${fileToSubmit.name}`,
        performedBy: currentUser.name,
        role: currentUser.title,
        timestamp: "Just now",
        hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...PROOF`,
      },
      ...currentBase.auditLogs,
    ];
    const localUpdated: ProjectData = {
      ...currentBase,
      clearances: updatedClearances,
      auditLogs: updatedAudit,
    };

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "upload_proof",
          clearanceId: selectedClearance.id,
          fileName: fileToSubmit.name,
          fileSize: fileToSubmit.size,
          documentRef: selectedClearance.drawingRef,
          notes,
          authorName: currentUser.name,
          authorRole: currentUser.title,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        persistFallbackProject(updated);
      } else {
        persistFallbackProject(localUpdated);
      }
    } catch (err) {
      persistFallbackProject(localUpdated);
    }

    setProofModalOpen(false);
    setActionSuccess(`✓ Proof '${fileToSubmit.name}' submitted! Notice dispatched to ${selectedClearance.responsibleName}.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Authority Verifies Proof & Seals Clearance (Officer Only)
  const handleVerifyProofSeal = async (item: ClearanceItem) => {
    if (currentUser.role !== "company_employee") {
      setActionSuccess("⛔ Access Denied: Clearance seals can only be applied by verified Officers & QA Inspectors.");
      setTimeout(() => setActionSuccess(null), 4000);
      return;
    }

    const sealCode = `SEAL-AUTH-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const currentBase = project || defaultProject;
    const updatedClearances = currentBase.clearances.map((c) =>
      c.id === item.id
        ? {
            ...c,
            status: "cleared" as const,
            authoritySeal: {
              verifiedBy: currentUser.name,
              verifiedRole: currentUser.title,
              signedAt: "Just now",
              sealCode,
            },
            updatedAt: "Just now",
          }
        : c
    );
    const blockedWeight = updatedClearances
      .filter((c) => c.status !== "cleared")
      .reduce((acc, c) => acc + c.weight, 0);

    const allApproved = blockedWeight === 0;
    const updatedAudit = [
      {
        id: `log_${Date.now()}`,
        action: `Clearance Sealed & Verified [${sealCode}]: ${item.title}`,
        performedBy: currentUser.name,
        role: currentUser.title,
        timestamp: "Just now",
        hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...SEAL`,
      },
      ...currentBase.auditLogs,
    ];
    const localUpdated: ProjectData = {
      ...currentBase,
      riskScore: blockedWeight,
      clearances: updatedClearances,
      auditLogs: updatedAudit,
      status: allApproved ? "PROCEED" : currentBase.status,
      holdNotice: allApproved && currentBase.holdNotice ? {...currentBase.holdNotice, active: false} : currentBase.holdNotice,
    };

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "verify_proof_seal",
          clearanceId: item.id,
          authorityName: currentUser.name,
          authorityRole: currentUser.title,
          userRole: currentUser.role,
          sealCode,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        persistFallbackProject(updated);
      } else {
        persistFallbackProject(localUpdated);
      }
    } catch (e) {
      persistFallbackProject(localUpdated);
    }

    confetti({particleCount: 130, spread: 75, origin: {y: 0.6}, colors: ["#C9ADA7", "#F2E9E4", "#9A8C98"]});
    setActionSuccess(`✓ Official Authority Seal Applied for ${item.title}! Broadcast notification sent to all stakeholders.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Master Approval from Company Inspector Desk (Officer Only)
  const handleMasterApprove = async () => {
    if (currentUser.role !== "company_employee") {
      setActionSuccess("⛔ Access Denied: Only verified QA Officers can issue master clearance.");
      setTimeout(() => setActionSuccess(null), 4000);
      return;
    }

    const currentBase = project || defaultProject;
    const updatedClearances = currentBase.clearances.map((c) => ({
      ...c,
      status: "cleared" as const,
      authoritySeal: c.authoritySeal || {
        verifiedBy: currentUser.name,
        verifiedRole: currentUser.title,
        signedAt: "Just now",
        sealCode: `SEAL-AUTH-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      },
      updatedAt: "Just now",
    }));
    const updatedAudit = [
      {
        id: `log_${Date.now()}`,
        action: "Master Architectural & Structural Pour Clearance Issued",
        performedBy: currentUser.name,
        role: currentUser.title,
        timestamp: "Just now",
        hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...MASTER`,
      },
      ...currentBase.auditLogs,
    ];
    const localUpdated: ProjectData = {
      ...currentBase,
      status: "PROCEED",
      riskScore: 0,
      holdNotice: currentBase.holdNotice ? {
        ...currentBase.holdNotice,
        active: false,
      } : undefined,
      clearances: updatedClearances,
      auditLogs: updatedAudit,
    };

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "sign_and_approve",
          authorName: currentUser.name,
          authorRole: currentUser.title,
          userRole: currentUser.role,
          drawingRef: "DWG-S-104 rev D",
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        persistFallbackProject(updated);
      } else {
        persistFallbackProject(localUpdated);
      }
    } catch (e) {
      persistFallbackProject(localUpdated);
    }

    confetti({particleCount: 160, spread: 80, origin: {y: 0.6}, colors: ["#C9ADA7", "#F2E9E4", "#9A8C98"]});
    setActionSuccess("✓ Digital Clearance Seal Applied! Phase Hold Lifted — Broadcast sent to all stakeholders.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Enforce Hold Notice with Deadline (Officer Action)
  const handleEnforceHold = async () => {
    const currentBase = project || defaultProject;
    const localUpdated: ProjectData = {
      ...currentBase,
      status: "HOLD",
      riskScore: 42,
      holdNotice: {
        active: true,
        title: "MANDATORY PHASE GATE HOLD: Column Rebar Detailing",
        reason: "Column C14-C18 stirrup spacing exceeds 150mm code requirement for seismic ductile confinement",
        triggeredBy: `${currentUser.name} (${currentUser.title})`,
        triggeredAt: "Just now",
        deadline: "Tuesday 06:00 AM IST (Strict 24h Pour SLA)",
        hoursRemaining: 24,
        responsibleStakeholders: [
          "Rajesh Varma (VP Development)",
          "Sarah Chen, PE (Lead Structural Consultant)",
          "Arun Patel (Site Project Manager)",
        ],
        actionNeeded: "Upload revised column reinforcement drawing proof (DWG-S-104 rev D) and obtain structural engineering seal before pour dispatch.",
      },
      auditLogs: [
        {
          id: `log_${Date.now()}`,
          action: "Enforced Emergency Phase Hold Notice (24h SLA Deadline)",
          performedBy: currentUser.name,
          role: currentUser.title,
          timestamp: "Just now",
          hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...HOLD`,
        },
        ...currentBase.auditLogs,
      ],
    };

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "raise_query_hold",
          authorName: currentUser.name,
          authorRole: currentUser.title,
          userRole: currentUser.role,
          reason: "Column C14-C18 stirrup spacing exceeds 150mm code requirement for seismic ductile confinement",
          drawingRef: "DWG-S-104 rev D",
          deadline: "Tuesday 06:00 AM IST (Strict 24h Pour SLA)",
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        persistFallbackProject(updated);
      } else {
        persistFallbackProject(localUpdated);
      }
    } catch (e) {
      persistFallbackProject(localUpdated);
    }

    setActionSuccess("⚠ Mandatory Hold Enforced (24h SLA Deadline). Emergency broadcast dispatched to all.");
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // Send message in channel
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msgText = chatInput.trim();
    setChatInput("");

    const currentBase = project || defaultProject;
    const newMsg: ProjectData["messages"][0] = {
      id: `msg_${Date.now()}`,
      senderName: currentUser.name,
      senderRole: currentUser.title,
      senderInitials: currentUser.avatar,
      content: msgText,
      timestamp: "Just now",
      type: "text",
    };
    const localUpdated: ProjectData = {
      ...currentBase,
      messages: [...currentBase.messages, newMsg],
    };

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          action: "send_message",
          senderName: currentUser.name,
          senderRole: currentUser.title,
          senderInitials: currentUser.avatar,
          content: msgText,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        persistFallbackProject(updated);
      } else {
        persistFallbackProject(localUpdated);
      }
    } catch (e) {
      persistFallbackProject(localUpdated);
    }
  };

  // Invite team member
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteContact) return;

    const finalRole = isCustomRole ? (customRoleInput.trim() || "Specialist Consultant") : inviteRole;

    const currentBase = project || defaultProject;
    const newMember: ProjectData["team"][0] = {
      id: `usr_invite_${Date.now()}`,
      name: inviteName || finalRole,
      role: finalRole,
      initials: (inviteName ? inviteName.split(" ").map((w: string) => w[0]).join("") : finalRole.slice(0, 2)).toUpperCase().slice(0, 2),
      status: "active",
      contact: inviteContact,
      type: inviteType,
    };
    const localUpdated: ProjectData = {
      ...currentBase,
      team: [...currentBase.team, newMember],
      auditLogs: [
        {
          id: `log_${Date.now()}`,
          action: `Invited Stakeholder: ${newMember.name} as ${finalRole} via ${inviteType === "phone" ? "WhatsApp" : "Email"}`,
          performedBy: currentUser.name,
          role: currentUser.title,
          timestamp: "Just now",
          hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...INVITE`,
        },
        ...currentBase.auditLogs,
      ],
    };

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: inviteName || finalRole,
          contact: inviteContact,
          role: finalRole,
          type: inviteType,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        persistFallbackProject(data.project);
      } else {
        persistFallbackProject(localUpdated);
      }
    } catch (e) {
      persistFallbackProject(localUpdated);
    }

    setInviteModalOpen(false);
    setInviteName("");
    setInviteContact("");
    setIsCustomRole(false);
    setCustomRoleInput("");
    setActionSuccess(`✓ ${finalRole} invited via ${inviteType === "phone" ? "WhatsApp Magic Link" : "Email"}!`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleDownloadPDF = () => {
    setReportDownloaded(true);
    setTimeout(() => setReportDownloaded(false), 4000);
  };

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#22223B] flex items-center justify-center font-heading">
        <div className="flex items-center gap-3 font-mono text-sm text-[#4A4E69]">
          <RefreshCw className="animate-spin text-[#C9ADA7]" size={20} />
          Loading Project Workspace...
        </div>
      </div>
    );
  }

  const isHold = project.status === "HOLD";
  const clearedCount = project.clearances.filter((c) => c.status === "cleared").length;
  const totalCount = project.clearances.length;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#22223B] selection:bg-[#C9ADA7] selection:text-[#22223B] flex flex-col font-sans">
      {/* Top Workspace Navigation Bar with 3D Refractive Glass Dock */}
      <header className="sticky top-0 z-40 border-b border-[#C9ADA7]/40 bg-white/95 backdrop-blur-2xl shadow-sm">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/" className="shrink-0">
              <Logo />
            </Link>
            <div className="hidden sm:flex items-center gap-2 border-l border-[#C9ADA7]/50 pl-4 text-xs font-mono truncate">
              <span className="text-[#9A8C98]">PROJECT:</span>
              <span className="text-[#22223B] font-semibold truncate">{project.name}</span>
              <span className="text-[#9A8C98]">·</span>
              <span className="text-[#4A4E69] shrink-0">{project.coordinates}</span>
            </div>
          </div>

          {/* Workspace Identity & Secure Role Switcher (Mobile accessible) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {activeRole === "customer" ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#F2E9E4] border border-[#C9ADA7] px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs font-mono font-bold text-[#22223B]">
                  <Building size={12} className="text-[#4A4E69]" />
                  <span className="hidden xs:inline">DEVELOPER</span>
                  <span className="xs:hidden">DEV</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSwitchRoleModalOpen(true)}
                  aria-label="Switch Persona"
                  className="inline-flex items-center gap-1 rounded-full border border-[#C9ADA7] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#4A4E69] hover:text-[#22223B] hover:bg-[#F2E9E4] transition-colors shadow-sm min-h-[32px]"
                >
                  <KeyRound size={12} className="text-[#4A4E69]" />
                  <span className="hidden sm:inline">Switch Persona</span>
                  <span className="sm:hidden font-mono text-[10px]">Switch</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#22223B] text-white px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs font-mono font-bold shadow-sm">
                  <ShieldCheck size={12} className="text-[#C9ADA7]" />
                  <span className="hidden xs:inline">OFFICER DESK</span>
                  <span className="xs:hidden">OFFICER</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSwitchRoleModalOpen(true)}
                  aria-label="Switch Persona"
                  className="inline-flex items-center gap-1 rounded-full border border-[#C9ADA7] bg-white px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#4A4E69] hover:text-[#22223B] hover:bg-[#F2E9E4] transition-colors shadow-sm min-h-[32px]"
                >
                  <KeyRound size={12} className="text-[#4A4E69]" />
                  <span className="hidden sm:inline">Switch Persona</span>
                  <span className="sm:hidden font-mono text-[10px]">Switch</span>
                </button>
              </div>
            )}

            {/* Profile Avatar */}
            <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-[#C9ADA7]/50">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#F2E9E4] border border-[#C9ADA7] font-mono text-xs font-bold text-[#22223B]">
                {currentUser.avatar}
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold text-[#22223B]">{currentUser.name}</span>
                <span className="text-[10px] text-[#4A4E69]">{currentUser.title}</span>
              </div>
            </div>

            <Link
              href="/login"
              title="Logout / Switch Account"
              className="grid h-8 w-8 place-items-center rounded-full bg-[#F2E9E4] border border-[#C9ADA7]/60 text-[#4A4E69] hover:text-[#22223B] hover:bg-[#C9ADA7]/30 transition-colors shrink-0"
            >
              <LogOut size={14} />
            </Link>
          </div>
        </div>

        {/* Mobile Project Info Strip */}
        <div className="sm:hidden px-3.5 py-1.5 bg-[#FAF8F5] border-t border-[#C9ADA7]/30 flex items-center justify-between text-[11px] font-mono text-[#4A4E69]">
          <span className="truncate pr-2 font-medium">📍 {project.name}</span>
          <span className="shrink-0 font-bold text-[#22223B] bg-[#F2E9E4] px-1.5 py-0.5 rounded border border-[#C9ADA7]/40 text-[10px]">
            {project.activePhase.split(':')[0]}
          </span>
        </div>
      </header>

      {/* Temporary Success Toast */}
      {actionSuccess && (
        <div className="fixed top-16 right-4 left-4 sm:left-auto sm:right-6 z-50 rounded-xl border border-[#C9ADA7] bg-white px-4 py-2.5 text-xs font-mono text-[#22223B] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
          <CheckCircle2 size={15} className="text-[#4A4E69] shrink-0" />
          <span className="truncate">{actionSuccess}</span>
        </div>
      )}

      {/* Main Workspace Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-10">
        {/* ========================================================================= */}
        {/* INSTANT BROADCAST NOTICE & DEADLINE CLOCK (When Project is on Hold)      */}
        {/* ========================================================================= */}
        {project.holdNotice && project.holdNotice.active && (
          <div className="rounded-2xl border-2 border-[#C9ADA7] bg-[#FAF8F5] p-4 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 border-b border-[#C9ADA7]/50 pb-5 sm:pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E9E4] border border-[#C9ADA7] px-3 py-1 text-[11px] sm:text-xs font-mono text-[#22223B] font-bold">
                  <ShieldAlert size={13} className="text-[#4A4E69]" />
                  <span>EMERGENCY PHASE GATE HOLD</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-[#22223B] font-heading leading-tight">
                  {project.holdNotice.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#4A4E69] max-w-3xl leading-relaxed">
                  {project.holdNotice.reason}
                </p>
              </div>

              {/* Strict Deadline Countdown Pill */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#C9ADA7] w-full lg:w-auto min-w-0 sm:min-w-[240px] text-left lg:text-right shrink-0 shadow-sm">
                <div className="flex items-center gap-1.5 lg:justify-end text-xs font-mono text-[#4A4E69] uppercase font-semibold">
                  <Clock size={13} className="text-[#22223B]" />
                  Resolution SLA Deadline
                </div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#22223B] mt-0.5 sm:mt-1">
                  24h 00m Left
                </div>
                <span className="text-[11px] font-mono text-[#4A4E69] block mt-0.5">
                  {project.holdNotice.deadline}
                </span>
              </div>
            </div>

            {/* Stakeholder Notice Strip */}
            <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 sm:grid-cols-2 font-mono text-xs">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C9ADA7]/50">
                <span className="text-[#9A8C98] block text-[10px] uppercase font-bold">Alert Dispatched To:</span>
                <span className="text-[#22223B] mt-1 block font-medium leading-relaxed">
                  {project.holdNotice.responsibleStakeholders.join(" · ")}
                </span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C9ADA7]/50">
                <span className="text-[#9A8C98] block text-[10px] uppercase font-bold">Mandatory Next Action:</span>
                <span className="text-[#22223B] mt-1 block font-bold leading-relaxed">
                  {project.holdNotice.actionNeeded}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW A: FOR THE OFFICER (COMPANY QA & STRUCTURAL INSPECTOR: SARAH CHEN)   */}
        {/* What she must see FIRST: Critical pending proof review desk               */}
        {/* ========================================================================= */}
        {activeRole === "company_employee" && (
          <section className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-9 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 border-b border-[#C9ADA7]/40 pb-5 sm:pb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E9E4] border border-[#C9ADA7] px-3 py-1 text-[11px] sm:text-xs font-mono text-[#22223B] font-bold mb-2">
                    <Stamp size={13} className="text-[#4A4E69]" />
                    AUTHORITY REVIEW DESK // PROOF VERIFICATION
                  </div>
                  <h1 className="text-xl sm:text-3xl font-bold text-[#22223B] font-heading leading-tight">
                    Technical Review: Column Steel Detailing (DWG-S-104 rev D)
                  </h1>
                  <p className="text-xs sm:text-sm text-[#4A4E69] mt-2 max-w-2xl leading-relaxed">
                    Developer Rajesh Varma uploaded proof document <b className="text-[#22223B]">DWG-S-104-revD-Seismic.pdf</b> with reduced 100mm tie spacing in hinge zones.
                    Inspect the proof calculation and stamp your PE verification seal as soon as possible.
                  </p>
                </div>

                {/* Authority Action Buttons (Full width on mobile) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto">
                  <Button
                    onClick={handleMasterApprove}
                    size="lg"
                    className="w-full sm:w-auto bg-[#22223B] text-white hover:bg-[#4A4E69] font-bold shadow-md px-5 py-3.5 text-xs sm:text-sm justify-center min-h-[44px]"
                  >
                    <Stamp size={16} className="mr-2 text-[#C9ADA7] shrink-0" />
                    Verify Proof & Apply Digital Seal
                  </Button>
                  <Button
                    onClick={handleEnforceHold}
                    v="ghost"
                    size="lg"
                    className="w-full sm:w-auto border-[#C9ADA7] text-[#22223B] bg-[#F2E9E4] hover:bg-[#C9ADA7]/30 px-4 py-3.5 text-xs sm:text-sm justify-center min-h-[44px]"
                  >
                    <AlertCircle size={16} className="mr-2 text-[#4A4E69] shrink-0" />
                    Broadcast Hold Notice
                  </Button>
                </div>
              </div>

              {/* Uploaded Proof Attachment Preview */}
              <div className="mt-4 sm:mt-6 p-3.5 sm:p-4 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-white border border-[#C9ADA7] text-[#22223B] shrink-0">
                    <FileCode size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-semibold text-[#22223B] font-heading truncate">
                      DWG-S-104-revD-Seismic-Ductile-Detailing.pdf
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-[#4A4E69] block mt-0.5">
                      Uploaded by Rajesh Varma · 8.6 MB
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] sm:text-xs text-[#22223B] bg-white px-3 py-1.5 rounded-md border border-[#C9ADA7] font-bold flex items-center gap-1.5 w-full sm:w-auto justify-center">
                    <Clock size={12} className="text-[#4A4E69]" />
                    ⏳ Awaiting Authority Seal
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* ========================================================================= */}
        {/* VIEW B: FOR THE USER (DEVELOPER: RAJESH VARMA)                            */}
        {/* What he must see FIRST: Executive Gate status, deadline & blocker         */}
        {/* ========================================================================= */}
        {activeRole === "customer" && (
          <section className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-9 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider",
                      isHold 
                        ? "bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7]"
                        : "bg-[#22223B] text-white"
                    )}>
                      {isHold ? "⛔ GATE STATUS: HOLD" : "✓ GATE STATUS: APPROVED FOR POUR"}
                    </span>
                    <span className="text-xs font-mono text-[#4A4E69]">
                      {project.activePhase}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-[#22223B] font-heading tracking-tight leading-tight">
                    {isHold ? "Phase 02 Gate: Clearance Proof Required" : "All Authority Proofs Verified: Ready to Cast"}
                  </h1>

                  <p className="mt-2 text-xs sm:text-base text-[#4A4E69] max-w-3xl leading-relaxed">
                    {isHold
                      ? "Concrete pour is held until proof documents are uploaded and sealed by the assigned authorities (Structural PE, Geotechnical, Municipal Liaison)."
                      : "Every mandatory checkpoint has verified proof and cryptographic authority seals. Ready-mix concrete dispatch authorized."}
                  </p>
                </div>

                {/* Primary Executive Actions (Touch friendly full-width on mobile) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto">
                  <a
                    href="#checkpoints"
                    className="rounded-xl bg-[#22223B] text-white font-bold text-xs sm:text-sm px-5 py-3.5 hover:bg-[#4A4E69] transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    View Proof Checkpoints
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href="https://wa.me/919848088219?text=Sarah%2C%20please%20review%20DWG-S-104%20rev%20D%20on%20Block%20by%20Block"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-[#F2E9E4] border border-[#C9ADA7] text-[#22223B] font-semibold text-xs sm:text-sm px-4 py-3.5 hover:bg-[#C9ADA7]/30 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <Phone size={14} className="text-[#4A4E69]" />
                    WhatsApp Structural Team
                  </a>
                </div>
              </div>
            </div>

            {/* Top 3 Executive Metrics Strip (Mobile Responsive Grid) */}
            <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-6 shadow-sm">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#9A8C98] font-bold block">
                  Pour Dispatch Window
                </span>
                <div className="mt-2 sm:mt-3">
                  <span className="text-xl sm:text-2xl font-bold text-[#22223B] font-heading">Tuesday 06:00 AM</span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs text-[#4A4E69] font-mono flex items-center gap-1.5 font-semibold">
                  <Clock size={13} className="text-[#22223B] shrink-0" />
                  24h SLA to Clear All Checks
                </p>
              </div>

              <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-6 shadow-sm">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#9A8C98] font-bold block">
                  Rework Protected
                </span>
                <div className="mt-2 sm:mt-3">
                  <span className="text-xl sm:text-2xl font-bold text-[#22223B] font-mono">₹24.8 Lakhs</span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs text-[#4A4E69] font-mono flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#22223B] shrink-0" />
                  MoSPI Structural Safety Index
                </p>
              </div>

              <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-6 shadow-sm">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#9A8C98] font-bold block">
                  Authority Seal Progress
                </span>
                <div className="mt-2 sm:mt-3 flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-[#22223B] font-heading">
                    {clearedCount} of {totalCount} Sealed
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#22223B]">
                    {Math.round((clearedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 h-2.5 w-full rounded-full bg-[#F2E9E4] overflow-hidden border border-[#C9ADA7]/30">
                  <div
                    className="h-full bg-[#22223B] transition-all duration-500 rounded-full"
                    style={{width: `${(clearedCount / totalCount) * 100}%`}}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: CHECKPOINTS WITH MANDATORY PROOF UPLOAD & AUTHORITY SEALS      */}
        {/* ========================================================================= */}
        <section id="checkpoints" className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#C9ADA7]/40 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#22223B] font-heading flex items-center gap-2">
                <FileCheck2 size={22} className="text-[#4A4E69] shrink-0" />
                <span>Mandatory Clearance Checks</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4E69] mt-1">
                To clear any checkpoint, upload the verified proof document. The responsible authority must then inspect and sign off.
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto min-h-[44px] justify-center text-xs font-mono text-[#22223B] hover:bg-[#F2E9E4] px-4 py-2.5 rounded-xl bg-white border border-[#C9ADA7] flex items-center gap-2 transition-colors shrink-0 shadow-sm font-semibold active:scale-[0.98]"
            >
              <FileDown size={16} className="text-[#4A4E69]" />
              <span>{reportDownloaded ? "ISO Certificate Generated ✓" : "Export RERA Audit Certificate"}</span>
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {project.clearances.map((item) => {
              const isCleared = item.status === "cleared";
              const isProofUploaded = item.status === "proof_uploaded";
              const isPendingProof = item.status === "pending_proof" || item.status === "flagged";

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-6 transition-all shadow-sm hover:border-[#4A4E69]/50 space-y-3 sm:space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-2.5">
                        {/* Clear sign indicator icon before title */}
                        <div className="shrink-0 mt-0.5 sm:mt-0">
                          {isCleared ? (
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#22223B] text-white" title="Cleared & Sealed">
                              <CheckCircle2 size={16} className="text-[#C9ADA7]" />
                            </span>
                          ) : isProofUploaded ? (
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7]" title="Proof Uploaded - Awaiting Seal">
                              <Clock size={16} className="text-[#4A4E69]" />
                            </span>
                          ) : (
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#FAF5F2] text-[#4A4E69] border border-[#C9ADA7]" title="Proof Required">
                              <AlertCircle size={16} className="text-[#4A4E69]" />
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-[#22223B] font-heading break-words">
                              {item.title}
                            </h3>
                            <span className="font-mono text-[11px] sm:text-xs px-2 py-0.5 rounded-md bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7]/50 font-semibold shrink-0">
                              Ref: {item.drawingRef}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#4A4E69] pl-0 sm:pl-9">
                        <span>Authority: <b className="text-[#22223B]">{item.responsibleName}</b> ({item.responsibleRole})</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Weight: <b className="text-[#22223B]">{item.weight}%</b></span>
                        <span className="hidden sm:inline">·</span>
                        <span>Updated: {item.updatedAt}</span>
                      </div>
                    </div>

                    {/* Status Pill & Action Buttons with touch-optimized mobile sizing */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#C9ADA7]/30">
                      {/* Status Tag */}
                      <span className={cn(
                        "font-mono text-xs font-bold px-3 py-2 sm:py-1.5 rounded-xl uppercase tracking-wider inline-flex items-center justify-center gap-1.5 text-center min-h-[38px] sm:min-h-0",
                        isCleared
                          ? "bg-[#22223B] text-[#F2E9E4] shadow-sm"
                          : isProofUploaded
                          ? "bg-[#F2E9E4] text-[#22223B] border border-[#C9ADA7]"
                          : "bg-[#FAF5F2] text-[#4A4E69] border border-[#C9ADA7]"
                      )}>
                        {isCleared ? (
                          <>
                            <CheckCircle2 size={14} className="text-[#C9ADA7]" />
                            <span>✓ SEALED & CLEARED</span>
                          </>
                        ) : isProofUploaded ? (
                          <>
                            <Clock size={14} className="text-[#4A4E69]" />
                            <span>⏳ PROOF AWAITING SEAL</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={14} className="text-[#4A4E69]" />
                            <span>⚠ PROOF REQUIRED</span>
                          </>
                        )}
                      </span>

                      {/* Action Button: Upload Proof */}
                      {!isCleared && (
                        <button
                          type="button"
                          onClick={() => handleOpenUploadProof(item)}
                          className="w-full sm:w-auto min-h-[44px] sm:min-h-0 rounded-xl bg-[#F2E9E4] hover:bg-[#C9ADA7]/30 text-[#22223B] border border-[#C9ADA7] px-4 py-2.5 sm:py-2 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
                        >
                          <UploadCloud size={15} className="text-[#4A4E69]" />
                          <span>{isProofUploaded ? "Replace Proof" : "Upload Proof"}</span>
                        </button>
                      )}

                      {/* Action Button: Authority Sign (Exclusively for Officer Only) */}
                      {isProofUploaded && activeRole === "company_employee" && (
                        <button
                          type="button"
                          onClick={() => handleVerifyProofSeal(item)}
                          className="w-full sm:w-auto min-h-[44px] sm:min-h-0 rounded-xl bg-[#22223B] text-white hover:bg-[#4A4E69] px-4 py-2.5 sm:py-2 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
                        >
                          <Stamp size={15} className="text-[#C9ADA7]" />
                          <span>Verify & Sign Authority Seal</span>
                        </button>
                      )}

                      {/* Developer View (When Proof Uploaded): Restricted from clearing */}
                      {isProofUploaded && activeRole === "customer" && (
                        <span className="w-full sm:w-auto min-h-[40px] sm:min-h-0 rounded-xl bg-[#F2E9E4] text-[#4A4E69] border border-[#C9ADA7]/60 px-3.5 py-2 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 text-center">
                          <Lock size={12} className="text-[#4A4E69]" />
                          <span>Pending Officer Seal ({item.responsibleName})</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Attached Proof Document Box (If Available) */}
                  {item.proofDocument && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Paperclip size={15} className="text-[#4A4E69] shrink-0" />
                        <div className="min-w-0 truncate">
                          <span className="text-[#22223B] font-bold">{item.proofDocument.fileName}</span>
                          <span className="text-[#4A4E69] ml-2 text-[11px] block sm:inline">
                            ({item.proofDocument.fileSize} · Uploaded by {item.proofDocument.uploadedBy})
                          </span>
                        </div>
                      </div>

                      {item.authoritySeal ? (
                        <div className="sm:text-right shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#C9ADA7]/30">
                          <span className="text-[#22223B] font-bold flex items-center gap-1 sm:justify-end">
                            <ShieldCheck size={14} className="text-[#22223B]" />
                            ✓ Signed by {item.authoritySeal.verifiedBy}
                          </span>
                          <span className="text-[#4A4E69] text-[11px] block sm:inline sm:ml-2">
                            ({item.authoritySeal.sealCode})
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#4A4E69] font-semibold shrink-0">Pending signature from {item.responsibleName}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: TWO-COLUMN BENTO (Channel Feed + Specialist Directory)         */}
        {/* ========================================================================= */}
        <section className="grid gap-6 lg:gap-8 lg:grid-cols-2 pt-2 sm:pt-4">
          {/* Team Collaboration Channel */}
          <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-3 sm:pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#22223B] font-heading flex items-center gap-2">
                    <MessageSquare size={18} className="text-[#4A4E69] shrink-0" />
                    <span>#foundation-clearance-thread</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4A4E69] mt-0.5">
                    Live channel linked to Phase 02 Foundation Gate drawings.
                  </p>
                </div>
                <span className="font-mono text-[10px] sm:text-xs text-[#22223B] bg-[#F2E9E4] px-2 sm:px-2.5 py-0.5 rounded border border-[#C9ADA7]/60 font-semibold shrink-0">
                  LIVE SYNC
                </span>
              </div>

              {/* Message Feed */}
              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[380px] overflow-y-auto pr-1 sm:pr-2">
                {project.messages.map((msg) => (
                  <div key={msg.id} className="p-3 sm:p-4 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/40 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs min-w-0">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#22223B] font-bold text-[10px] border border-[#C9ADA7] shrink-0">
                          {msg.senderInitials}
                        </span>
                        <span className="font-bold text-[#22223B] truncate">{msg.senderName}</span>
                        <span className="text-[#4A4E69] text-[11px] hidden sm:inline">({msg.senderRole})</span>
                      </div>
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#4A4E69] shrink-0">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs text-[#22223B]/90 leading-relaxed pl-8 font-medium break-words">
                      {msg.content}
                    </p>

                    {msg.proofRef && (
                      <div className="pl-8 pt-1 flex items-center gap-2">
                        <span className="inline-block font-mono text-[10px] sm:text-[11px] bg-white text-[#22223B] px-2 sm:px-2.5 py-0.5 rounded border border-[#C9ADA7] font-semibold">
                          Proof: {msg.proofRef}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#C9ADA7]/40 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Post update or query to thread..."
                className="flex-1 min-h-[44px] rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] px-3.5 sm:px-4 py-2.5 text-xs text-[#22223B] placeholder-[#9A8C98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22223B]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="min-h-[44px] min-w-[44px] rounded-xl bg-[#22223B] text-white px-3.5 sm:px-4 py-2.5 font-bold hover:bg-[#4A4E69] transition-colors shrink-0 shadow-sm flex items-center justify-center active:scale-95"
              >
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Specialist Directory */}
          <div className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C9ADA7]/40 pb-3 sm:pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#22223B] font-heading flex items-center gap-2">
                    <Users size={18} className="text-[#4A4E69] shrink-0" />
                    <span>Phase 02 Specialist Directory</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#4A4E69] mt-0.5">
                    External consultants receive WhatsApp magic sign-off links without paying.
                  </p>
                </div>
                <button
                  onClick={() => setInviteModalOpen(true)}
                  className="w-full sm:w-auto min-h-[40px] rounded-xl bg-[#22223B] text-white font-semibold text-xs px-3.5 py-2 hover:bg-[#4A4E69] transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0 active:scale-[0.98]"
                >
                  <UserPlus size={14} />
                  <span>Add Person</span>
                </button>
              </div>

              {/* Members List */}
              <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 max-h-[300px] sm:max-h-[380px] overflow-y-auto pr-1">
                {project.team.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 sm:p-3.5 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/40 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#22223B] font-mono text-xs font-bold border border-[#C9ADA7] shrink-0">
                        {member.initials}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-[#22223B] font-heading truncate">{member.name}</span>
                        <span className="block text-[11px] text-[#4A4E69] truncate">{member.role}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs shrink-0">
                      {member.type === "phone" ? (
                        <a
                          href={`tel:${member.contact.replace(/[^\d+]/g, "")}`}
                          className="text-[#22223B] font-semibold block hover:underline"
                          title="Tap to call"
                        >
                          {member.contact}
                        </a>
                      ) : (
                        <a
                          href={`mailto:${member.contact}`}
                          className="text-[#22223B] font-semibold block hover:underline"
                          title="Tap to email"
                        >
                          {member.contact}
                        </a>
                      )}
                      <span className="text-[10px] text-[#4A4E69]">Synced via {member.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#C9ADA7]/40 text-xs text-[#4A4E69] flex flex-wrap items-center justify-between gap-2">
              <span>Tier: <b className="text-[#22223B]">{project.subscriptionTier}</b></span>
              <span className="text-[#22223B] font-semibold">Unlimited External Seats Active</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ISO 19650 IMMUTABLE AUDIT TRAIL                                */}
        {/* ========================================================================= */}
        <section className="rounded-2xl border border-[#C9ADA7]/40 bg-white p-4 sm:p-7 shadow-sm space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between border-b border-[#C9ADA7]/40 pb-3 sm:pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#22223B] font-heading flex items-center gap-2">
                <FileText size={18} className="text-[#4A4E69] shrink-0" />
                <span>Immutable Phase Audit Trail (ISO 19650 Protocol)</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-[#4A4E69] mt-0.5">
                Every proof upload and authority sign-off generates a cryptographic SHA-256 seal for bank compliance and municipal inspectors.
              </p>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
            {project.auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/40 break-words"
              >
                <div>
                  <span className="text-[#22223B] font-bold">{log.action}</span>
                  <span className="text-[#4A4E69] ml-2">by {log.performedBy} ({log.role})</span>
                </div>
                <div className="text-[#4A4E69] text-[11px] flex flex-wrap items-center gap-2 sm:gap-3">
                  <span>{log.timestamp}</span>
                  <span className="text-[#22223B] bg-white px-2 py-0.5 rounded border border-[#C9ADA7] font-bold truncate max-w-[220px] sm:max-w-none">
                    {log.hash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* PROOF UPLOAD MODAL (Simple File/Pic Upload + Message Space) */}
      {proofModalOpen && selectedClearance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-[#C9ADA7] bg-white p-5 sm:p-7 shadow-2xl">
            <button
              onClick={() => setProofModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 h-9 w-9 grid place-items-center rounded-lg hover:bg-[#F2E9E4] text-[#4A4E69] hover:text-[#22223B] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 pr-8">
              <span className="font-mono text-xs text-[#22223B] uppercase tracking-wider font-bold bg-[#F2E9E4] px-2.5 py-0.5 rounded border border-[#C9ADA7]">
                Clearance Proof
              </span>
              <span className="font-mono text-xs text-[#4A4E69]">
                {selectedClearance.drawingRef}
              </span>
            </div>

            <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#22223B] font-heading pr-8">
              Upload Proof for: {selectedClearance.title}
            </h3>
            <p className="mt-1 text-xs text-[#4A4E69]">
              Attach site photo or document proof and add your message below.
            </p>

            <form onSubmit={handleSubmitProof} className="mt-5 space-y-4 sm:space-y-5">
              {/* 1. Simple File / Pic Upload Box */}
              <div>
                <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold mb-2">
                  Proof File / Site Photo
                </label>

                {uploadedFile ? (
                  <div className="rounded-xl border-2 border-[#22223B] bg-[#F2E9E4] p-3.5 sm:p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#22223B] text-white shrink-0">
                        <ImageIcon size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#22223B] truncate">
                          {uploadedFile.name}
                        </p>
                        <p className="text-[11px] font-mono text-[#4A4E69] mt-0.5">
                          {uploadedFile.size} · Ready to submit
                        </p>
                      </div>
                    </div>
                    <label className="cursor-pointer text-xs font-bold font-mono text-[#22223B] underline hover:text-[#4A4E69] shrink-0 ml-3 py-1">
                      Change File
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*,.pdf,.dwg,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedFile({
                              name: file.name,
                              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#C9ADA7] bg-[#FAF8F5] p-5 sm:p-6 cursor-pointer hover:border-[#22223B] hover:bg-[#F2E9E4]/60 transition-all">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#F2E9E4] border border-[#C9ADA7] text-[#22223B] group-hover:scale-105 transition-transform mb-2">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#22223B] text-center">
                      Tap or drop site photo / document here
                    </p>
                    <p className="text-[11px] font-mono text-[#4A4E69] mt-0.5 text-center">
                      Supports Camera capture, JPG, PNG, PDF (up to 25MB)
                    </p>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf,.dwg,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFile({
                            name: file.name,
                            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                          });
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              {/* 2. Simple Message Space */}
              <div>
                <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold mb-1.5">
                  Message / Notes for Reviewer
                </label>
                <textarea
                  rows={3}
                  value={proofMessage}
                  onChange={(e) => setProofMessage(e.target.value)}
                  placeholder="Type any message, remarks, or verification notes..."
                  className="w-full rounded-xl border-2 border-[#C9ADA7]/60 bg-[#FAF8F5] p-3 text-xs text-[#22223B] placeholder:text-[#9A8C98] focus:border-[#22223B] focus:outline-none"
                />
              </div>

              {/* Notice target indicator */}
              <div className="p-3 rounded-xl bg-[#F2E9E4] border border-[#C9ADA7]/50 text-xs font-mono text-[#4A4E69]">
                <span>Notice will be dispatched to: <b className="text-[#22223B]">{selectedClearance.responsibleName}</b> ({selectedClearance.responsibleRole})</span>
              </div>

              <Button
                type="submit"
                className="w-full min-h-[48px] py-3.5 justify-center mt-2 bg-[#22223B] text-white hover:bg-[#4A4E69] font-bold shadow-md text-xs sm:text-sm active:scale-[0.98]"
              >
                Submit Proof for Urgent Authority Verification
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Invite Specialist Modal (Add Person) */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-[#C9ADA7] bg-white p-5 sm:p-7 shadow-2xl">
            <button
              onClick={() => {
                setInviteModalOpen(false);
                setIsCustomRole(false);
                setCustomRoleInput("");
              }}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 h-9 w-9 grid place-items-center rounded-lg hover:bg-[#F2E9E4] text-[#4A4E69] hover:text-[#22223B] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <span className="font-mono text-xs text-[#4A4E69] uppercase tracking-wider font-bold bg-[#F2E9E4] px-2.5 py-0.5 rounded border border-[#C9ADA7]">
              Invite Project Specialist
            </span>
            <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#22223B] font-heading pr-8">
              Add Person to Directory
            </h3>
            <p className="mt-1 text-xs text-[#4A4E69]">
              Free external access. They receive a 1-tap WhatsApp or email link to verify and sign off.
            </p>

            <form onSubmit={handleInviteSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold">Full Name</label>
                <input
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Anand K. Rao, PE"
                  className="mt-1 w-full min-h-[44px] rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] px-3.5 py-2.5 text-xs text-[#22223B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22223B]"
                />
              </div>

              {/* Role Section with Custom Input Button */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold">
                    Role / Discipline
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomRole(!isCustomRole);
                      if (!isCustomRole) setCustomRoleInput("");
                    }}
                    className={cn(
                      "text-[11px] font-mono font-bold px-2.5 py-1 min-h-[30px] rounded border transition-colors flex items-center gap-1",
                      isCustomRole
                        ? "bg-[#22223B] text-white border-[#22223B]"
                        : "bg-[#F2E9E4] text-[#22223B] border-[#C9ADA7] hover:bg-[#C9ADA7]/40"
                    )}
                  >
                    {isCustomRole ? "← Choose from Presets" : "+ Custom Role Input"}
                  </button>
                </div>

                {isCustomRole ? (
                  <div className="mt-1">
                    <input
                      required
                      autoFocus
                      value={customRoleInput}
                      onChange={(e) => setCustomRoleInput(e.target.value)}
                      placeholder="Type custom role (e.g. Façade Engineer, Acoustics Lead...)"
                      className="w-full min-h-[44px] rounded-xl border-2 border-[#22223B] bg-[#FAF8F5] px-3.5 py-2.5 text-xs text-[#22223B] font-medium focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] font-mono text-[#4A4E69]">
                      Custom role will be attached to their sign-off records
                    </p>
                  </div>
                ) : (
                  <div className="mt-1">
                    <select
                      value={inviteRole}
                      onChange={(e) => {
                        if (e.target.value === "__custom__") {
                          setIsCustomRole(true);
                          setCustomRoleInput("");
                        } else {
                          setInviteRole(e.target.value);
                        }
                      }}
                      className="w-full min-h-[44px] rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] px-3.5 py-2.5 text-xs text-[#22223B] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22223B]"
                    >
                      <option value="Structural Consultant">Structural Consultant</option>
                      <option value="Architect">Architectural Consultant</option>
                      <option value="Geotechnical Specialist">Geotechnical Specialist</option>
                      <option value="MEP Consultant">MEP Consultant</option>
                      <option value="Municipal Liaison">Municipal Authority Liaison</option>
                      <option value="Site Project Manager">Site PM / Supervisor</option>
                      <option value="__custom__">+ Enter Custom Role...</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold">Invite Via</label>
                  <div className="flex gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setInviteType("phone")}
                      className={cn("px-2.5 py-1 min-h-[32px] rounded text-xs", inviteType === "phone" ? "bg-[#22223B] text-white font-bold" : "text-[#4A4E69] bg-[#F2E9E4] border border-[#C9ADA7]/40")}
                    >
                      WhatsApp / SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => setInviteType("email")}
                      className={cn("px-2.5 py-1 min-h-[32px] rounded text-xs", inviteType === "email" ? "bg-[#22223B] text-white font-bold" : "text-[#4A4E69] bg-[#F2E9E4] border border-[#C9ADA7]/40")}
                    >
                      Email
                    </button>
                  </div>
                </div>
                <input
                  required
                  value={inviteContact}
                  onChange={(e) => setInviteContact(e.target.value)}
                  placeholder={inviteType === "phone" ? "+91 98480 12345" : "consultant@firm.com"}
                  className="w-full min-h-[44px] rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] px-3.5 py-2.5 text-xs text-[#22223B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22223B]"
                />
              </div>

              <Button type="submit" className="w-full min-h-[48px] py-3 justify-center mt-2 bg-[#22223B] text-white hover:bg-[#4A4E69] font-bold active:scale-[0.98]">
                Send 1-Tap Invite Link
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Secure Role Switcher Modal (Explicit Authenticated Persona Transition) */}
      {switchRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-[#C9ADA7] bg-white p-5 sm:p-6 shadow-2xl">
            <button
              onClick={() => setSwitchRoleModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 h-9 w-9 grid place-items-center rounded-lg hover:bg-[#F2E9E4] text-[#4A4E69] hover:text-[#22223B] transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <span className="font-mono text-[11px] uppercase tracking-wider text-[#4A4E69] font-bold">
              Account Authentication & Security
            </span>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-[#22223B] font-heading pr-8">
              Switch Workspace Persona
            </h3>
            <p className="mt-1 text-xs text-[#4A4E69] leading-relaxed">
              Block by Block strictly separates Developer and Authority permissions. Clearance seals and hold broadcasts can only be issued by registered QA Officers.
            </p>

            <div className="mt-4 sm:mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  handleSwitchRole("customer");
                  setSwitchRoleModalOpen(false);
                }}
                className={cn(
                  "w-full rounded-xl p-3.5 text-left border transition-all flex items-center justify-between active:scale-[0.99]",
                  activeRole === "customer"
                    ? "bg-[#22223B] text-white border-[#22223B] shadow-sm"
                    : "bg-[#F2E9E4] text-[#22223B] border-[#C9ADA7]/70 hover:bg-[#FAF8F5]"
                )}
              >
                <div className="min-w-0 pr-2">
                  <span className="block text-xs font-bold font-heading flex items-center gap-1.5">
                    <UserCheck size={14} className="shrink-0" />
                    <span>Developer Client (Rajesh Varma)</span>
                  </span>
                  <span className={cn("text-[10px] font-mono mt-0.5 block truncate", activeRole === "customer" ? "text-[#C9ADA7]" : "text-[#4A4E69]")}>
                    rajesh@greenfield.com · VP Development
                  </span>
                  <span className={cn("text-[10px] mt-1 block", activeRole === "customer" ? "text-white/80" : "text-[#4A4E69]")}>
                    Permissions: Upload site proof, invite consultants, review progress.
                  </span>
                </div>
                {activeRole === "customer" && <CheckCircle2 size={16} className="text-[#C9ADA7] shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSwitchRole("company_employee");
                  setSwitchRoleModalOpen(false);
                }}
                className={cn(
                  "w-full rounded-xl p-3.5 text-left border transition-all flex items-center justify-between active:scale-[0.99]",
                  activeRole === "company_employee"
                    ? "bg-[#22223B] text-white border-[#22223B] shadow-sm"
                    : "bg-[#F2E9E4] text-[#22223B] border-[#C9ADA7]/70 hover:bg-[#FAF8F5]"
                )}
              >
                <div className="min-w-0 pr-2">
                  <span className="block text-xs font-bold font-heading flex items-center gap-1.5">
                    <ShieldCheck size={14} className="shrink-0" />
                    <span>QA Inspector & Structural PE (Sarah Chen)</span>
                  </span>
                  <span className={cn("text-[10px] font-mono mt-0.5 block truncate", activeRole === "company_employee" ? "text-[#C9ADA7]" : "text-[#4A4E69]")}>
                    sarah.chen@blockbyblock.internal · Lead Inspector
                  </span>
                  <span className={cn("text-[10px] mt-1 block", activeRole === "company_employee" ? "text-white/80" : "text-[#4A4E69]")}>
                    Permissions: Verify proofs, apply digital clearance seals, enforce emergency hold.
                  </span>
                </div>
                {activeRole === "company_employee" && <CheckCircle2 size={16} className="text-[#C9ADA7] shrink-0" />}
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-[#C9ADA7]/40 flex justify-between items-center text-xs">
              <Link href="/login" className="text-[#4A4E69] hover:text-[#22223B] font-semibold flex items-center gap-1 min-h-[38px] px-1">
                <LogOut size={12} />
                Full Sign Out
              </Link>
              <button
                type="button"
                onClick={() => setSwitchRoleModalOpen(false)}
                className="text-xs font-bold text-[#22223B] px-3.5 py-2 min-h-[38px] rounded-lg border border-[#C9ADA7] hover:bg-[#F2E9E4]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#C9ADA7]/40 py-8 px-4 text-center font-mono text-xs text-[#4A4E69]">
        Block by Block · Process Standard ISO 19650 · Architectural Gating Engine · © 2026 Block by Block
      </footer>
    </div>
  );
}
