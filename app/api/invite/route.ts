import {NextResponse} from "next/server";
import {updateProject} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {name, contact, role, type} = await req.json();

    if (!contact || !role) {
      return NextResponse.json(
        {error: "Contact info and role are required"},
        {status: 400}
      );
    }

    const initials = name
      ? name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : role.slice(0, 2).toUpperCase();

    const updated = updateProject((proj) => {
      proj.team.push({
        id: `tm_${Date.now()}`,
        name: name || role,
        role,
        contact,
        type: type || (contact.includes("@") ? "email" : "phone"),
        initials,
        status: "active",
      });

      proj.messages.push({
        id: `msg_${Date.now()}`,
        senderName: "System Gatekeeper",
        senderRole: "Automated Onboarding",
        senderInitials: "BB",
        timestamp: "Just now",
        type: "text",
        content: `New specialist ${name || role} (${role}) added to phase channel via ${
          type === "phone" ? "WhatsApp One-Tap Link" : "Work Email"
        }.`,
      });

      return proj;
    });

    return NextResponse.json({success: true, project: updated});
  } catch (err) {
    return NextResponse.json({error: "Failed to invite member"}, {status: 500});
  }
}
