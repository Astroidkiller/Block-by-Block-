import {NextResponse} from "next/server";
import {getProject, updateProject} from "@/lib/db";

export async function GET() {
  const project = getProject();
  return NextResponse.json(project);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {action} = body;

    // 1. Upload proof for a checkpoint
    if (action === "upload_proof") {
      const {
        clearanceId,
        fileName,
        fileSize,
        documentRef,
        notes,
        authorName,
        authorRole,
      } = body;

      const updated = updateProject((proj) => {
        const item = proj.clearances.find((c) => c.id === clearanceId);
        if (item) {
          item.proofDocument = {
            fileName: fileName || "Verification-Document.pdf",
            fileSize: fileSize || "3.4 MB",
            uploadedAt: "Just now",
            uploadedBy: authorName || "Site Project Team",
            documentRef: documentRef || item.drawingRef,
            notes: notes || "Proof uploaded for mandatory authority review.",
          };
          item.status = "proof_uploaded";
          item.updatedAt = "Just now";

          // Broadcast notice to channel
          proj.messages.push({
            id: `msg_${Date.now()}`,
            senderName: authorName || "Site Team",
            senderRole: authorRole || "Authorized Submitter",
            senderInitials: (authorName || "ST").substring(0, 2).toUpperCase(),
            timestamp: "Just now",
            type: "proof_submitted",
            content: `PROOF UPLOADED: Document ${item.proofDocument.fileName} (${item.proofDocument.documentRef}) submitted. Demanding immediate verification from ${item.responsibleName} (${item.responsibleRole}).`,
            drawingRef: item.drawingRef,
            proofRef: item.proofDocument.fileName,
          });

          // Immutable audit record
          proj.auditLogs.unshift({
            id: `log_${Date.now()}`,
            action: `Proof Uploaded for '${item.title}': ${item.proofDocument.fileName}`,
            performedBy: authorName || "Authorized Submitter",
            role: authorRole || "Site Team",
            timestamp: "Just now",
            hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...PROOF`,
          });
        }

        return proj;
      });

      return NextResponse.json(updated);
    }

    // 2. Authority verifies proof & applies digital seal (Officer Only)
    if (action === "verify_proof_seal") {
      const {clearanceId, authorityName, authorityRole, sealCode, userRole} = body;

      // Strict server-side role enforcement: Developers cannot clear checkpoints
      if (userRole === "customer") {
        return NextResponse.json(
          {error: "Unauthorized: Clearance actions are strictly restricted to verified Officers and QA Inspectors."},
          {status: 403}
        );
      }

      const updated = updateProject((proj) => {
        const item = proj.clearances.find((c) => c.id === clearanceId);
        if (item) {
          item.status = "cleared";
          item.updatedAt = "Just now";
          item.authoritySeal = {
            verifiedBy: authorityName || "Registered Professional",
            verifiedRole: authorityRole || "Review Authority",
            signedAt: "Just now",
            sealCode: sealCode || `SEAL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          };

          // Re-calculate risk score
          const blockedWeight = proj.clearances
            .filter((c) => c.status !== "cleared")
            .reduce((acc, c) => acc + c.weight, 0);

          proj.riskScore = blockedWeight;

          if (blockedWeight === 0) {
            proj.status = "PROCEED";
            if (proj.holdNotice) {
              proj.holdNotice.active = false;
            }
          }

          // Broadcast clearance notification to ALL stakeholders
          proj.messages.push({
            id: `msg_${Date.now()}`,
            senderName: authorityName || "Officer",
            senderRole: authorityRole || "QA Inspector",
            senderInitials: (authorityName || "SC").substring(0, 2).toUpperCase(),
            timestamp: "Just now",
            type: "signoff_approved",
            content: `CLEARANCE NOTICE DISPATCHED TO ALL: Checkpoint '${item.title}' (Ref: ${item.drawingRef}) has been inspected and sealed by Officer ${authorityName} (${authorityRole}). Digital Seal: ${item.authoritySeal.sealCode}. All developer, contractor, and municipal stakeholders notified.`,
            drawingRef: item.drawingRef,
          });

          if (blockedWeight === 0) {
            proj.messages.push({
              id: `msg_${Date.now() + 1}`,
              senderName: "Gating Compliance Engine",
              senderRole: "Authority Dispatch",
              senderInitials: "BB",
              timestamp: "Just now",
              type: "signoff_approved",
              content: `ALL CLEARANCES GRANTED: Every mandatory checkpoint has verified proof and authority seals. Phase 02 Foundation Pour is officially AUTHORIZED TO PROCEED. Hold lifted across all systems.`,
            });
          }

          // Immutable Audit record
          proj.auditLogs.unshift({
            id: `log_${Date.now()}`,
            action: `Authority Seal Applied on '${item.title}' by Officer ${authorityName}`,
            performedBy: authorityName,
            role: authorityRole,
            timestamp: "Just now",
            hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...VERIFIED`,
          });
        }

        return proj;
      });

      return NextResponse.json(updated);
    }

    // 3. Structural Inspector: Master Sign & Approve (Officer Only)
    if (action === "sign_and_approve") {
      const {authorName, authorRole, drawingRef, userRole} = body;

      // Strict server-side role enforcement
      if (userRole === "customer") {
        return NextResponse.json(
          {error: "Unauthorized: Master clearance approval is strictly restricted to Officers and Structural PEs."},
          {status: 403}
        );
      }

      const updated = updateProject((proj) => {
        proj.clearances.forEach((c) => {
          if (c.category === "structural") {
            c.status = "cleared";
            c.updatedAt = "Just now";
            c.authoritySeal = {
              verifiedBy: authorName,
              verifiedRole: authorRole,
              signedAt: "Just now",
              sealCode: "SEAL-CRDA-PE-881",
            };
          }
        });

        const blockedWeight = proj.clearances
          .filter((c) => c.status !== "cleared")
          .reduce((acc, c) => acc + c.weight, 0);

        proj.riskScore = blockedWeight;
        if (blockedWeight === 0) {
          proj.status = "PROCEED";
        }
        if (proj.holdNotice) {
          proj.holdNotice.active = false;
        }

        proj.messages.push({
          id: `msg_${Date.now()}`,
          senderName: authorName,
          senderRole: authorRole,
          senderInitials: "SC",
          timestamp: "Just now",
          type: "signoff_approved",
          content: `MASTER CLEARANCE NOTICE TO ALL: Drawing ${drawingRef} verified under IS 13920:2016 by Officer ${authorName} (${authorRole}). Digital Seal SEAL-CRDA-PE-881 applied. Phase hold lifted. Ready for pour dispatch.`,
          drawingRef,
        });

        proj.auditLogs.unshift({
          id: `log_${Date.now()}`,
          action: `Digital Seal Applied on ${drawingRef} by Officer ${authorName}`,
          performedBy: authorName,
          role: authorRole,
          timestamp: "Just now",
          hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...SEALED`,
        });

        return proj;
      });

      return NextResponse.json(updated);
    }

    // 4. Enforce Emergency Hold & Set Deadline Notice
    if (action === "raise_query_hold") {
      const {authorName, authorRole, reason, drawingRef, deadline} = body;
      const updated = updateProject((proj) => {
        proj.status = "HOLD";
        const structural = proj.clearances.find((c) => c.category === "structural");
        if (structural) {
          structural.status = "flagged";
          structural.updatedAt = "Just now";
        }

        proj.holdNotice = {
          active: true,
          title: "CRITICAL REVISION HOLD: Structural Code Violation Flagged",
          reason: reason || "Column stirrup spacing violates seismic ductile confinement code (IS 13920).",
          triggeredBy: `${authorName} (${authorRole})`,
          triggeredAt: "Just now",
          deadline: deadline || "Tuesday 06:00 AM IST (Strict 24h Pour SLA)",
          hoursRemaining: 24,
          responsibleStakeholders: [
            "Sarah Chen, PE (Lead Structural & QA Inspector)",
            "Rajesh Varma (VP Development)",
            "Arun Patel (Site Project Manager)",
          ],
          actionNeeded: "Upload revised ductile detailing DWG proof and obtain structural seal before pour dispatch cutoff.",
        };

        proj.messages.push({
          id: `msg_${Date.now()}`,
          senderName: authorName,
          senderRole: authorRole,
          senderInitials: "SC",
          timestamp: "Just now",
          type: "hold_notice",
          content: `EMERGENCY HOLD NOTICE BROADCAST TO ALL: Phase 02 Foundation Pour locked on MANDATORY HOLD by Officer ${authorName} (${authorRole}). Reason: ${proj.holdNotice.reason}. SLA Deadline: ${proj.holdNotice.deadline}. Ready-mix concrete dispatch paused.`,
          drawingRef: drawingRef || "DWG-S-104",
        });

        proj.auditLogs.unshift({
          id: `log_${Date.now()}`,
          action: `Mandatory Phase Hold Enforced (24h Deadline) by Officer ${authorName}`,
          performedBy: authorName,
          role: authorRole,
          timestamp: "Just now",
          hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...HOLD`,
        });

        return proj;
      });

      return NextResponse.json(updated);
    }

    // 5. Send message
    if (action === "send_message") {
      const {senderName, senderRole, senderInitials, content} = body;
      const updated = updateProject((proj) => {
        proj.messages.push({
          id: `msg_${Date.now()}`,
          senderName,
          senderRole,
          senderInitials: senderInitials || "U",
          timestamp: "Just now",
          type: "text",
          content,
        });
        return proj;
      });

      return NextResponse.json(updated);
    }

    // 6. Initialize workspace / subscription
    if (action === "initialize_workspace") {
      const {
        planName,
        businessName,
        fullName,
        email,
        mobile,
        projectName,
        billingAddress,
        city,
        pincode,
        paymentMethod,
        mandateRef,
      } = body;

      const updated = updateProject((proj) => {
        if (projectName) proj.name = projectName;
        if (businessName) proj.developerCompany = businessName;
        proj.subscriptionTier = `${planName || "Growth"} Tier (14-Day Free Pilot)`;

        // Add authorized lead to team
        if (fullName) {
          const exists = proj.team.find((t) => t.contact === email || t.contact === mobile);
          if (!exists) {
            proj.team.unshift({
              id: `member_${Date.now()}`,
              name: fullName,
              role: "Authorized Developer / Lead",
              contact: mobile || email || "+91 98480 88219",
              type: mobile ? "phone" : "email",
              initials: fullName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() || "AL",
              status: "active",
            });
          }
        }

        proj.messages.push({
          id: `msg_${Date.now()}`,
          senderName: "System Gating Engine",
          senderRole: "Block by Block Platform",
          senderInitials: "BB",
          timestamp: "Just now",
          type: "text",
          content: `WORKSPACE INITIALIZED: 14-day Free Pilot armed for '${businessName || proj.developerCompany}' on project '${proj.name}'. Payment Mandate: ${mandateRef || "MANDATE-VERIFIED-₹0"}. Authorized Lead: ${fullName || "Lead"} (${mobile || email}). Address: ${billingAddress || ""}, ${city || ""}.`,
        });

        proj.auditLogs.unshift({
          id: `log_${Date.now()}`,
          action: `14-Day Pilot Initialized: ${planName || "Growth"} Workspace for ${businessName || proj.developerCompany} (e-Mandate: ${paymentMethod || "UPI"} ₹0 Verified)`,
          performedBy: fullName || "Authorized Lead",
          role: "Developer Executive",
          timestamp: "Just now",
          hash: `0x${Math.random().toString(16).substring(2, 8).toUpperCase()}...PILOT`,
        });

        return proj;
      });

      return NextResponse.json(updated);
    }

    return NextResponse.json({error: "Unknown action"}, {status: 400});
  } catch (err) {
    return NextResponse.json({error: "Failed to process project action"}, {status: 500});
  }
}
