# Block by Block — Construction Phase-Readiness Gate Platform

> **Live Demo on GitHub Pages**: [https://astroidkiller.github.io/Block-by-Block-/](https://astroidkiller.github.io/Block-by-Block-/)

A mission-critical phase-gate management platform for commercial and residential real estate developers. Prevents unauthorized concrete pours, tracks engineering drawings, enforces structural clearance seals, and guarantees auditable governance across all stakeholders.

---

## 🏛️ Core Features

- **Phase-Readiness Gating Engine**: Blocks subsequent construction milestones until all mandatory municipal, structural, and geotechnical clearances are verified.
- **3D Liquid Glass Interface**: Custom refractive glassmorphism UI styled in accordance with the luxury architectural palette (Space Indigo, Dusty Grape, Almond Silk, Parchment, and Pure White).
- **Role-Based Permission Enforcement**:
  - **Developer Workspace (Rajesh Varma)**: Submit drawing revisions, upload site clearance photos & proofs, invite consultants via WhatsApp/Email, inspect hold notices.
  - **QA Inspector / Structural Officer (Sarah Chen, PE)**: Enforce emergency 24-hour SLA holds, verify proofs, and apply digital clearance seals (`SEAL-AUTH-*`).
- **Emergency Phase Hold with SLA Deadlines**: Real-time pause on ready-mix concrete dispatch with countdown timer and instant multi-stakeholder broadcast.
- **Auditable Log & RERA-Ready Export**: SHA-256 style hash-chained decision trail downloadable as certified PDF compliance reports.
- **Static GitHub Pages Ready**: Complete client-side state resilience with `localStorage` fallback—runs seamlessly without requiring external server runtimes.

---

## 🔑 1-Click Demo Credentials

| Role | Name | Email | Password |
|---|---|---|---|
| **Developer Client** | Rajesh Varma (VP Development) | `rajesh@greenfield.com` | `developer123` |
| **QA Inspector / Officer** | Sarah Chen, PE (Lead Structural) | `sarah.chen@blockbyblock.internal` | `company123` |

---

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Astroidkiller/Block-by-Block-.git
   cd Block-by-Block-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production / Static Export:
   ```bash
   npm run build
   ```
   Outputs production-ready static assets directly to `./out/`.

---

## 🌐 GitHub Pages Deployment

This repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Any push to `main` automatically triggers the build and static deployment.
2. Ensure GitHub Pages is set to **GitHub Actions** under:
   `Repository Settings` → `Pages` → `Build and deployment` → `Source: GitHub Actions`.

---

## 🎨 Color System

- **Space Indigo**: `#22223B` (Primary headings, high contrast text)
- **Dusty Grape**: `#4A4E69` (Secondary labels, subheaders, active states)
- **Almond Silk**: `#C9ADA7` (Borders, subtle dividers, accent glows)
- **Parchment**: `#F2E9E4` (Cards, badges, warm neutral panels)
- **Pure White**: `#FFFFFF` (Page canvas, crisp backgrounds)
