"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Logo} from "@/components/ui/Nav";
import {Button} from "@/components/ui/Button";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building,
  KeyRound,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {defaultUsers} from "@/lib/initial-data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          localStorage.setItem("bbb_user", JSON.stringify(data.user));
          router.push("/dashboard");
          return;
        }
      }
    } catch (err) {
      // In static deployment (GitHub Pages), API route is unavailable; proceed to static fallback
    }

    // Static export / GitHub Pages fallback
    const matched = defaultUsers.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (matched) {
      const {password: _, ...safeUser} = matched;
      localStorage.setItem("bbb_user", JSON.stringify(safeUser));
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please verify your email and password or use 1-Click Demo.");
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
    setLoading(true);

    const fallback = () => {
      const matched = defaultUsers.find(
        (u) => u.email.toLowerCase() === demoEmail.toLowerCase()
      );
      if (matched) {
        const {password: _, ...safeUser} = matched;
        localStorage.setItem("bbb_user", JSON.stringify(safeUser));
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    fetch("/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: demoEmail, password: demoPass}),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Static environment");
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          localStorage.setItem("bbb_user", JSON.stringify(data.user));
          router.push("/dashboard");
        } else {
          fallback();
        }
      })
      .catch(() => fallback());
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#22223B] flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-[#C9ADA7] selection:text-[#22223B] font-sans">
      {/* Top Header */}
      <div className="mx-auto w-full max-w-5xl flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Link
          href="/"
          className="text-xs font-mono text-[#4A4E69] hover:text-[#22223B] transition-colors font-semibold"
        >
          ← Return to Overview
        </Link>
      </div>

      {/* Main Glass Login Card */}
      <div className="mx-auto w-full max-w-md my-10">
        <div className="rounded-2xl border-2 border-[#C9ADA7] bg-white p-7 sm:p-9 shadow-xl relative">
          <div className="text-center">
            <span className="font-mono text-xs uppercase text-[#4A4E69] tracking-wider font-bold">
              Phase-Readiness Gate Access
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#22223B] tracking-tight font-heading">
              Sign in to Workspace
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#4A4E69]">
              Access real-time project gating, drawings, and specialist channels.
            </p>
          </div>

          {/* QUICK DEMO CREDENTIAL SELECTOR */}
          <div className="mt-6 rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] p-3.5 space-y-2.5">
            <span className="text-[10px] font-mono uppercase text-[#4A4E69] font-bold block text-center">
              1-Click Instant Demo Credentials
            </span>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() =>
                  handleDemoLogin("rajesh@greenfield.com", "developer123")
                }
                className="w-full rounded-xl border border-[#C9ADA7] bg-white p-3 text-left transition-all hover:bg-[#FAF8F5] flex items-center justify-between group shadow-sm"
              >
                <div>
                  <div className="text-xs font-bold text-[#22223B] group-hover:text-[#4A4E69] flex items-center gap-1.5 font-heading">
                    <UserCheck size={14} className="text-[#22223B]" />
                    Developer Client (Rajesh Varma)
                  </div>
                  <div className="text-[10px] font-mono text-[#4A4E69] mt-0.5">
                    rajesh@greenfield.com · pass: developer123
                  </div>
                </div>
                <ArrowRight size={13} className="text-[#22223B]" />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDemoLogin(
                    "sarah.chen@blockbyblock.internal",
                    "company123"
                  )
                }
                className="w-full rounded-xl border border-[#C9ADA7] bg-white p-3 text-left transition-all hover:bg-[#FAF8F5] flex items-center justify-between group shadow-sm"
              >
                <div>
                  <div className="text-xs font-bold text-[#22223B] group-hover:text-[#4A4E69] flex items-center gap-1.5 font-heading">
                    <ShieldCheck size={14} className="text-[#22223B]" />
                    Company QA Inspector (Sarah Chen)
                  </div>
                  <div className="text-[10px] font-mono text-[#4A4E69] mt-0.5">
                    sarah.chen@blockbyblock.internal · pass: company123
                  </div>
                </div>
                <ArrowRight size={13} className="text-[#22223B]" />
              </button>
            </div>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#C9ADA7]/40" />
            </div>
            <span className="relative bg-white px-3 font-mono text-[10px] uppercase text-[#4A4E69] font-semibold">
              Or Sign In Manually
            </span>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] p-3 text-xs text-[#22223B] font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold">
                Work Email Address
              </label>
              <div className="relative mt-1">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rajesh@greenfield.com"
                  className="w-full rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] pl-9 pr-3 py-2.5 text-sm text-[#22223B] placeholder:text-[#9A8C98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22223B]"
                />
                <Mail
                  size={15}
                  className="absolute left-3 top-3 text-[#4A4E69]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#4A4E69] uppercase font-bold">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-[#C9ADA7] bg-[#F2E9E4] pl-9 pr-3 py-2.5 text-sm text-[#22223B] placeholder:text-[#9A8C98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22223B]"
                />
                <Lock
                  size={15}
                  className="absolute left-3 top-3 text-[#4A4E69]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 justify-center text-sm font-bold mt-2 bg-[#22223B] text-white hover:bg-[#4A4E69]"
            >
              {loading ? "Authenticating..." : "Sign in to Dashboard"}
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#C9ADA7]/40 text-center text-xs text-[#4A4E69]">
            Need a new project workspace?{" "}
            <Link
              href="/subscriptions"
              className="text-[#22223B] underline font-bold hover:text-[#4A4E69]"
            >
              Start 14-day free pilot
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-5xl text-center font-mono text-[11px] text-[#4A4E69]">
        Block by Block · ISO 19650 Protocol · Multi-Stakeholder Clearance Engine · © 2026
      </footer>
    </div>
  );
}
