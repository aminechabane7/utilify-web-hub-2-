import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const principles = [
  {
    n: "01",
    title: "Practical tools, quickly",
    description:
      "Utilify Web Hub brings common text, image, code, calculator, and conversion tasks into one fast workspace — no hunting through tabs.",
  },
  {
    n: "02",
    title: "Browser-first workflow",
    description:
      "Most tools work entirely in your browser. Routine tasks stay private and don't bounce through third-party services.",
  },
  {
    n: "03",
    title: "Clear by design",
    description:
      "Each utility follows familiar controls and focused instructions. You can finish a task without navigating clutter.",
  },
];

const commitments = [
  ["No accounts", "Open and use immediately."],
  ["No uploads", "Most tools run locally."],
  ["No tracking", "No analytics on tool actions."],
  ["Open additions", "New tools are added on a regular cadence."],
];

const About: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-8 border-b border-white/8 pb-14 md:gap-x-8 md:pb-20">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
            <span className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-[#F2B84B]/60 align-middle" />
            About — Utilify Web Hub
          </p>
          <h1 className="mt-5 text-[clamp(2.2rem,5.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            Tools that respect
            <br />
            <span className="text-white/55">your time and your data.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/55">
            Utilify Web Hub is a growing collection of browser-based utilities for working with
            text, images, web code, calculations, unit conversions, and binary data. It's built to
            feel like a quiet workshop — not a marketing surface.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              to="/tools"
              className="group inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-sm font-medium text-[#0b0d12] transition-colors duration-150 hover:bg-[#F2B84B] hover:border-[#F2B84B]"
            >
              Browse the tools
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/store"
              className="group inline-flex items-center gap-1.5 border-b border-white/30 pb-1 text-sm text-white/70 transition-colors duration-150 hover:border-white hover:text-white"
            >
              Visit the store
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <aside className="col-span-12 hidden border-l border-white/8 pl-8 pt-2 lg:col-span-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Colophon</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-white/45">Type</dt>
              <dd className="mt-1 text-white">Browser utility suite</dd>
            </div>
            <div>
              <dt className="text-white/45">Stack</dt>
              <dd className="mt-1 text-white">React · Vite · Tailwind</dd>
            </div>
            <div>
              <dt className="text-white/45">Released</dt>
              <dd className="mt-1 font-mono tabular-nums text-white">v1.0</dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Principles */}
      <section className="border-b border-white/8 py-14 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 border-b border-white/10 pb-6 md:gap-x-8">
          <div className="col-span-12 flex items-baseline gap-3 md:col-span-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
              § 01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              Principles
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
              What we care about
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
              The rules that shape what gets built, what stays, and what doesn't.
            </p>
          </div>
        </div>

        <ol className="mt-10 space-y-10">
          {principles.map((item) => (
            <li
              key={item.n}
              className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-white/8 pb-10 last:border-b-0 md:gap-x-8"
            >
              <span className="col-span-12 font-mono text-[11px] uppercase tracking-[0.22em] text-white/35 md:col-span-2">
                {item.n}
              </span>
              <div className="col-span-12 md:col-span-7">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Commitments + long copy */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-12 py-14 md:gap-x-8 md:py-20">
        <div className="col-span-12 lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
            § 02 — A short note
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
            Built around useful, focused workflows
          </h2>
          <div className="mt-6 max-w-2xl space-y-5 text-[15px] leading-7 text-white/55">
            <p>
              Whether you need to format JSON, resize an image, calculate a value, or convert a
              measurement, the goal is the same: make routine online tasks easier to complete and
              easier to understand.
            </p>
            <p>
              Utilify is intentionally minimal. There are no badges for "most popular," no streak
              counters, no upsells. The tools load quickly, the interface stays out of the way, and
              you can move on to the next thing.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Commitments</p>
          <dl className="mt-5 divide-y divide-white/8 border-y border-white/8">
            {commitments.map(([term, def]) => (
              <div
                key={term}
                className="grid grid-cols-12 items-baseline gap-3 py-4"
              >
                <dt className="col-span-4 text-sm font-medium text-white">{term}</dt>
                <dd className="col-span-8 text-sm text-white/55">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer nav */}
      <section className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">Ready to use the tools?</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            Browse all tools
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/store"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            Visit the store
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
