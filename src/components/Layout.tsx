import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import Seo from "@/components/Seo";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

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
  const { theme, setTheme } = useTheme();

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const themeIcon =
    theme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : theme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Laptop className="h-4 w-4" />
    );

  const themeLabel =
    theme === "dark" ? "Switch to light mode" : theme === "light" ? "Switch to dark mode" : "Switch to system mode";

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground antialiased">
      <Seo title={title} description={description} />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
            aria-label="Utilify Web Hub — home"
          >
            <span
              className="flex h-7 w-7 items-center justify-center border border-border bg-primary text-[11px] font-bold leading-none text-primary-foreground transition-colors duration-150 group-hover:bg-[#F2B84B]"
              aria-hidden
            >
              U
            </span>
            <span className="hidden sm:inline">Utilify</span>
            <span className="hidden text-xs font-normal text-muted-foreground sm:inline">/ Web Hub</span>
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
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {label}
                {isActive(to) && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px bg-primary"
                    aria-hidden
                  />
                )}
              </Link>
            ))}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={cycleTheme}
              title={themeLabel}
              aria-label={themeLabel}
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
            >
              {themeIcon}
            </button>
          </nav>
        </div>
        {/* Hairline separator */}
        <div className="h-px w-full bg-border" />
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {children}
        <Analytics />
        <SpeedInsights />
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
          {/* Brand column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center border border-border bg-primary text-[11px] font-bold leading-none text-primary-foreground"
                aria-hidden
              >
                U
              </span>
              <span className="text-sm font-semibold text-foreground">Utilify Web Hub</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Small, fast browser utilities. No login. No tracking. No fluff.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
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
                      className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
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
                      className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
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
        <div className="border-t border-border/50">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
            <p>Built for speed. No accounts required.</p>
            <Link
              to="/tools"
              className="group inline-flex items-center gap-1 text-muted-foreground transition-colors duration-150 hover:text-primary"
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
