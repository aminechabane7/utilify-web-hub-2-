import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Tools", to: "/tools" },
  { label: "About", to: "/about" },
] as const;

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#090d14] text-[#e8eaf0] antialiased">
      <Seo title={title} description={description} />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white"
            aria-label="Utilify Web Hub — home"
          >
            <span
              className="flex h-7 w-7 items-center justify-center border border-white/15 bg-white text-[11px] font-bold leading-none text-[#090d14] transition-colors duration-150 group-hover:border-[#F2B84B] group-hover:bg-[#F2B84B]"
              aria-hidden
            >
              U
            </span>
            <span className="hidden sm:inline">Utilify</span>
            <span className="hidden text-xs font-normal text-white/45 sm:inline">/ Web Hub</span>
          </Link>

          {/* Primary nav */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                aria-current={isActive(to) ? "page" : undefined}
                className={[
                  "relative px-3 py-1.5 text-sm transition-colors duration-150",
                  isActive(to)
                    ? "text-white"
                    : "text-white/50 hover:text-white",
                ].join(" ")}
              >
                {label}
                {isActive(to) && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px bg-[#F2B84B]"
                    aria-hidden
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        {/* Hairline separator */}
        <div className="h-px w-full bg-white/[0.07]" />
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {children}
        <Analytics />
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
          {/* Brand column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center border border-white/15 bg-white text-[11px] font-bold leading-none text-[#090d14]"
                aria-hidden
              >
                U
              </span>
              <span className="text-sm font-semibold text-white">Utilify Web Hub</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Small, fast browser utilities. No login. No tracking. No fluff.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                Tools
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Text", to: "/tools/text" },
                  { label: "Image", to: "/tools/image" },
                  { label: "Calculators", to: "/tools/calculators" },
                  { label: "Converters", to: "/tools/converters" },
                ].map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-white/50 transition-colors duration-150 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                More
              </p>
              <ul className="space-y-2">
                {[
                  { label: "All tools", to: "/tools" },
                  { label: "About", to: "/about" },
                ].map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-white/50 transition-colors duration-150 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 text-xs text-white/30 sm:px-6 lg:px-8">
            <p>Built for speed. No accounts required.</p>
            <Link
              to="/tools"
              className="group inline-flex items-center gap-1 text-white/50 transition-colors duration-150 hover:text-[#F2B84B]"
            >
              Browse all tools
              <ArrowUpRight className="h-3 w-3 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
