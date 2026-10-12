import type {Viewport} from "next";
import "./globals.css";

export const metadata = {
  title: "Block by Block — Phase-Readiness Gate for Developers",
  description: "Link drawings, permits, and engineering sign-offs before each construction phase begins.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-[#22223B] antialiased selection:bg-[#C9ADA7] selection:text-[#22223B] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
