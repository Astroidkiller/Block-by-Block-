import fs from "fs";
import path from "path";

export interface User {
  id: string;
  email: string;
  password: string; // Plaintext for demo testability
  name: string;
  role: "customer" | "company_employee";
  title: string;
  company: string;
  avatar: string;
}

export interface ProofDocument {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  documentRef: string;
  notes?: string;
}

export interface AuthoritySeal {
  verifiedBy: string;
  verifiedRole: string;
  signedAt: string;
  sealCode: string;
}

export interface ClearanceItem {
  id: string;
  title: string;
  category: "structural" | "geotechnical" | "municipal" | "site";
  responsibleRole: string;
  responsibleName: string;
  drawingRef: string;
  status: "cleared" | "pending_proof" | "proof_uploaded" | "flagged";
  weight: number;
  updatedAt: string;
  proofDocument?: ProofDocument;
  authoritySeal?: AuthoritySeal;
}

export interface ChannelMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderInitials: string;
  timestamp: string;
  type: "text" | "signoff_request" | "signoff_approved" | "signoff_blocked" | "proof_submitted" | "hold_notice";
  content: string;
  drawingRef?: string;
  proofRef?: string;
}

export interface HoldNotice {
  active: boolean;
  title: string;
  reason: string;
  triggeredBy: string;
  triggeredAt: string;
  deadline: string;
  hoursRemaining: number;
  responsibleStakeholders: string[];
  actionNeeded: string;
}

export interface ProjectData {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  activePhase: string;
  phaseNumber: number;
  totalPhases: number;
  status: "PROCEED" | "HOLD";
  riskScore: number;
  developerCompany: string;
  subscriptionTier: string;
  holdNotice?: HoldNotice;
  clearances: ClearanceItem[];
  team: {
    id: string;
    name: string;
    role: string;
    contact: string;
    type: "phone" | "email";
    initials: string;
    status: "active" | "invited";
  }[];
  messages: ChannelMessage[];
  auditLogs: {
    id: string;
    action: string;
    performedBy: string;
    role: string;
    timestamp: string;
    hash: string;
  }[];
}

import {defaultUsers, defaultProject} from "./initial-data";
export {defaultUsers, defaultProject};

const DB_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "store.json");

interface DBStore {
  users: User[];
  project: ProjectData;
}

function initDB(): DBStore {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, {recursive: true});
  }
  
  // Force update to use new schema with proof documents and hold notice
  const initial: DBStore = {
    users: defaultUsers,
    project: defaultProject,
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
  return initial;
}

export function getDB(): DBStore {
  if (!fs.existsSync(DB_FILE)) {
    return initDB();
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DBStore;
  } catch {
    return initDB();
  }
}

export function saveDB(data: DBStore): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, {recursive: true});
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function findUserByEmail(email: string): User | undefined {
  const db = getDB();
  return db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export function getProject(): ProjectData {
  return getDB().project;
}

export function updateProject(updateFn: (proj: ProjectData) => ProjectData): ProjectData {
  const db = getDB();
  db.project = updateFn(db.project);
  saveDB(db);
  return db.project;
}
