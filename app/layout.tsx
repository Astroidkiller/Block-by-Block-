import "./globals.css";


export const metadata = {
  title: "Block by Block — Phase-Readiness Gate for Developers",
  description: "Link drawings, permits, and engineering sign-offs before each construction phase begins.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#05070B] text-white antialiased selection:bg-[#FF5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}
