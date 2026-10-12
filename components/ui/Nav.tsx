"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu, X, ArrowRight, ShieldCheck} from "lucide-react";
import {cn} from "@/lib/utils";

const navLinks = [
  {title: "Workflow", href: "/workflow"},
  {title: "Channels", href: "/channels"},
  {title: "Live Demo", href: "/demo"},
  {title: "Pricing", href: "/subscriptions"},
  {title: "Dashboard", href: "/dashboard"},
];

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="relative grid h-7 w-7 place-items-center rounded-full bg-[#F2E9E4] border border-[#C9ADA7] shadow-sm transition-transform group-hover:scale-105">
        <div className="h-2 w-2 rounded-full bg-[#4A4E69]" />
      </div>
      <span className="font-semibold text-xs sm:text-sm tracking-tight text-[#22223B] whitespace-nowrap font-heading">
        Block by Block
      </span>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      {/* 3D Liquid Glass Dockbar with Ambient Depth, Conic Refraction & Specular Sheen */}
      <div className={cn("dock-3d-wrap pointer-events-auto", scrolled && "scale-[0.98]")}>
        <div className="dock-3d-shadow" aria-hidden="true" />
        <div className="liquid-dock rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-7 transition-all duration-300 relative">
          <div className="dock-sheen" aria-hidden="true" />

          {/* Logo */}
          <Link href="/" className="outline-none pl-1 relative z-10" onClick={() => setMobileOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Dock Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5 relative z-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "text-white bg-[#22223B] shadow-sm font-semibold"
                      : "text-[#4A4E69] hover:text-[#22223B] hover:bg-[#F2E9E4]"
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 relative z-10">
            <Link
              href="/login"
              className="hidden sm:inline-block text-xs text-[#4A4E69] hover:text-[#22223B] px-2.5 py-1 transition-colors font-semibold"
            >
              Login
            </Link>

            {/* 3D Liquid Glass CTA Button (From Uiverse code adapted to palette) */}
            <div className="uiverse-btn-wrap">
              <div className="uiverse-btn-shadow" aria-hidden="true" />
              <Link href="/subscriptions" className="uiverse-btn">
                <span className="uiverse-btn-content">
                  Free Pilot
                  <ArrowRight size={12} className="ml-0.5 inline-block" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle (Comfortable 38px touch target) */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="md:hidden grid h-9 w-9 place-items-center rounded-full bg-[#F2E9E4] text-[#22223B] hover:bg-[#C9ADA7] active:scale-95 transition-all shadow-sm"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileOpen && (
        <div 
          className="pointer-events-auto fixed inset-0 bg-black/35 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Dropdown */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed top-16 inset-x-3 max-w-sm mx-auto liquid-dock rounded-2xl p-4 md:hidden z-50 animate-in fade-in zoom-in-95 duration-200 border-2 border-[#C9ADA7] shadow-2xl bg-white/95">
          <div className="space-y-1.5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors min-h-[44px]",
                pathname === "/" ? "bg-[#22223B] text-white shadow-sm" : "text-[#4A4E69] hover:bg-[#F2E9E4] hover:text-[#22223B]"
              )}
            >
              <span>Overview</span>
              {pathname === "/" && <span className="text-xs text-[#C9ADA7]">Active</span>}
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors min-h-[44px]",
                    isActive ? "bg-[#22223B] text-white shadow-sm" : "text-[#4A4E69] hover:bg-[#F2E9E4] hover:text-[#22223B]"
                  )}
                >
                  <span>{link.title}</span>
                  {isActive && <span className="text-xs text-[#C9ADA7]">Active</span>}
                  {link.title === "Dashboard" && !isActive && (
                    <span className="font-mono text-[10px] bg-[#F2E9E4] text-[#22223B] px-2 py-0.5 rounded font-bold">
                      LIVE
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-[#C9ADA7]/40 flex items-center justify-between gap-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl border border-[#C9ADA7] text-xs font-bold text-[#22223B] hover:bg-[#F2E9E4] min-h-[44px] flex items-center justify-center"
              >
                Sign In
              </Link>
              <Link
                href="/subscriptions"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl bg-[#22223B] text-white text-xs font-bold hover:bg-[#4A4E69] shadow-md min-h-[44px] flex items-center justify-center"
              >
                Start Free Pilot
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
