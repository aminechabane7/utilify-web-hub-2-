import React from "react";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryMeta } from "@/lib/categoryMeta";
import type { ToolItem } from "@/lib/types";

type CategoryShowcaseProps = {
  categoryKey: string;
  title?: string;
  description?: string;
  tools: ToolItem[];
  icon?: LucideIcon;
  accentLabel?: string;
};

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  categoryKey,
  title,
  description,
  tools,
  icon,
  accentLabel,
}) => {
  const meta = getCategoryMeta(categoryKey);
  const resolvedTitle = title ?? meta?.title ?? "Tools";
  const resolvedDescription = description ?? meta?.longDescription ?? "";
  const Icon = icon ?? meta?.icon ?? React.Fragment;
  const total = tools.length;
  const hero = tools[0];
  const rest = tools.slice(1);

  return (
    <div className="font-sans">
      {/* Header */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-8 border-b border-white/8 pb-12 md:gap-x-8 md:pb-16">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            <Link to="/tools" className="text-white/40 transition-colors hover:text-white">
              Tools
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-[#F2B84B]">{meta?.label ?? "Category"}</span>
          </p>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            {resolvedTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
            {resolvedDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              to="/tools"
              className="group inline-flex items-center gap-2 border border-white bg-white px-4 py-2.5 text-sm font-medium text-[#0b0d12] transition-colors duration-150 hover:bg-[#F2B84B] hover:border-[#F2B84B]"
            >
              All categories
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {String(total).padStart(2, "0")} tools · {accentLabel ?? meta?.label ?? "Utilities"}
            </span>
          </div>
        </div>

        <aside className="col-span-12 hidden border-l border-white/8 pl-8 pt-2 lg:col-span-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Snapshot</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-white/45">Tools available</dt>
              <dd className="mt-1 font-mono text-2xl tabular-nums text-white">{total}</dd>
            </div>
            <div>
              <dt className="text-white/45">Runs in your browser</dt>
              <dd className="mt-1 text-white">100%</dd>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-white/65">{meta?.label ?? "Category"}</span>
            </div>
          </dl>
        </aside>
      </section>

      {/* Featured tool + 2-up list */}
      <section className="py-12 md:py-16">
        <header className="flex items-baseline justify-between border-b border-white/10 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">Featured</p>
          <p className="font-mono text-[11px] tabular-nums text-white/30">
            01 / {String(total).padStart(2, "0")}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6 md:gap-x-8">
          {hero && (
            <Link
              to={hero.path}
              className="group col-span-12 flex flex-col border border-white/10 p-6 transition-colors duration-150 hover:border-white/30 md:col-span-7 md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">01 — Headline tool</p>
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white md:text-[28px]">
                {hero.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/55">{hero.description}</p>
              <div className="mt-auto flex items-center gap-2 pt-8 text-sm text-white transition-colors group-hover:text-[#F2B84B]">
                Open tool
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          )}

          <ul className="col-span-12 grid grid-cols-1 divide-y divide-white/8 border-t border-white/8 md:col-span-5 md:border-l md:border-t-0 md:pl-8">
            {rest.slice(0, 4).map((tool, idx) => (
              <li key={tool.id}>
                <Link
                  to={tool.path}
                  className="group flex items-baseline gap-3 py-3 text-sm text-white/70 transition-colors duration-150 hover:text-white"
                >
                  <span className="font-mono text-[11px] tabular-nums text-white/30 group-hover:text-[#F2B84B]">
                    {String(idx + 2).padStart(2, "0")}
                  </span>
                  <span className="flex-1 truncate">{tool.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 text-white/0 transition-all duration-150 group-hover:text-[#F2B84B]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full editorial index */}
      <section className="border-t border-white/10 pt-12 md:pt-16">
        <header className="flex items-baseline justify-between border-b border-white/10 pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            § Complete index
          </p>
          <p className="font-mono text-[11px] tabular-nums text-white/30">
            {String(total).padStart(2, "0")} tools
          </p>
        </header>

        {total <= 4 ? (
          // Compact list when category is small (e.g. dev has 2 tools)
          <ul className="mt-6 divide-y divide-white/8 border-y border-white/8">
            {tools.map((tool, idx) => (
              <li key={tool.id}>
                <Link
                  to={tool.path}
                  className="group grid grid-cols-12 items-baseline gap-3 py-4 transition-colors duration-150 hover:bg-white/[0.015]"
                >
                  <span className="col-span-2 font-mono text-[11px] tabular-nums text-white/30 group-hover:text-[#F2B84B]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-12 text-sm font-medium text-white md:col-span-4">{tool.title}</span>
                  <span className="col-span-12 text-sm text-white/50 md:col-span-6">{tool.description}</span>
                  <ArrowUpRight className="col-span-2 hidden h-4 w-4 justify-self-end text-white/30 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F2B84B] md:inline" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {rest.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="group mb-3 flex items-baseline gap-2 break-inside-avoid text-sm text-white/70 transition-colors duration-150 hover:text-white"
              >
                <span className="font-mono text-[11px] text-white/30 group-hover:text-[#F2B84B]">↳</span>
                <span className="truncate">{tool.title}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer nav */}
      <section className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">
          Looking for a tool we don't have? Browse the full directory.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            All categories
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            About
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CategoryShowcase;
