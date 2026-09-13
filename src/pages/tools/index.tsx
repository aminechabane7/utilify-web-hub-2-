import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { toolCategories, type ToolCategoryGroup } from "./tools";

const totalTools = toolCategories.reduce((sum, c) => sum + c.tools.length, 0);
const implementedTools = toolCategories.reduce(
  (sum, c) => sum + c.tools.filter((t) => t.implemented).length,
  0,
);

// Categories that have a dedicated index page (preserved from existing app routing)
const categoryIndexPages = new Set([
  "text", "image", "calculators", "converters", "binary", "website", "dev", "misc",
]);

interface SearchableTool {
  id: string;
  title: string;
  description: string;
  path: string;
  category: ToolCategoryGroup;
}

const allTools: SearchableTool[] = toolCategories.flatMap((category) =>
  category.tools
    .filter((tool) => tool.implemented)
    .map((tool) => ({
      id: tool.id,
      title: tool.title,
      description: tool.description,
      path: tool.path,
      category,
    })),
);

const Index: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // "/" focuses the search bar (common editorial shortcut).
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const filteredCategories = useMemo(() => {
    if (activeCategory === "all") return toolCategories;
    return toolCategories.filter((c) => c.id === activeCategory);
  }, [activeCategory]);

  const visibleTools = useMemo(() => {
    if (!trimmed) return null;
    return allTools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(trimmed) ||
        tool.description.toLowerCase().includes(trimmed) ||
        tool.category.title.toLowerCase().includes(trimmed),
    );
  }, [trimmed]);

  return (
    <div className="font-sans">
      {/* Header */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-8 border-b border-white/8 pb-12 md:gap-x-8 md:pb-16">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
            <span className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-[#F2B84B]/60 align-middle" />
            The directory — every tool, one index
          </p>
          <h1 className="mt-5 text-[clamp(2.2rem,5.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            All tools.
            <br />
            <span className="text-white/55">{implementedTools} live, working in your browser.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
            Browse by category, filter by name, or open a tool directly. Nothing leaves your browser.
          </p>
        </div>

        <aside className="col-span-12 hidden border-l border-white/8 pl-8 pt-2 lg:col-span-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Index</p>
          <ol className="mt-5 space-y-2 text-sm">
            {toolCategories.map((category, i) => (
              <li
                key={category.id}
                className="flex items-baseline gap-3 text-white/60"
              >
                <span className="font-mono text-[11px] tabular-nums text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  to={`/tools/${category.id}`}
                  className="transition-colors duration-150 hover:text-white"
                >
                  {category.title}
                </Link>
                <span className="ml-auto font-mono text-[11px] tabular-nums text-white/30">
                  {category.tools.length}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {/* Search + filters */}
      <section className="border-b border-white/8 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 md:gap-x-8">
          <div className="col-span-12 lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">§ 01 — Search</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white">
              Find a tool
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Search every tool in the directory. Type a name, a keyword, or a category.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <form role="search" className="relative" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="directory-search" className="sr-only">
                Search tools
              </label>
              <div className="flex items-center gap-3 border-b border-white/20 pb-3 transition-colors duration-150 focus-within:border-[#F2B84B]">
                <Search className="h-5 w-5 text-white/40" aria-hidden />
                <input
                  id="directory-search"
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tools, e.g. resize, base64, age…"
                  className="flex-1 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="text-white/40 transition-colors hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="hidden border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-white/40 sm:inline-block">
                    /
                  </kbd>
                )}
              </div>

              {visibleTools ? (
                <div className="mt-2">
                  {visibleTools.length > 0 ? (
                    <ul className="divide-y divide-white/5 border-t border-white/5">
                      {visibleTools.slice(0, 10).map((tool) => (
                        <li key={tool.path}>
                          <Link
                            to={tool.path}
                            className="group flex items-baseline gap-4 py-3 transition-colors duration-150 hover:bg-white/[0.02]"
                          >
                            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
                              {tool.category.title.replace(/ Tools$/, "")}
                            </span>
                            <span className="text-sm font-medium text-white">{tool.title}</span>
                            <span className="hidden text-xs text-white/40 sm:inline">
                              — {tool.description}
                            </span>
                            <ArrowUpRight className="ml-auto h-4 w-4 text-white/30 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F2B84B]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-white/45">
                      No tools match “{query}”. Try a different word.
                    </p>
                  )}
                </div>
              ) : null}
            </form>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
            Filter
          </span>
          <FilterChip
            label="All"
            count={implementedTools}
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {toolCategories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.title.replace(/ Tools$/, "")}
              count={category.tools.filter((t) => t.implemented).length}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-white/8 py-12 md:grid-cols-4 md:gap-x-8">
        <Stat label="Categories" value={toolCategories.length} />
        <Stat label="Total tools" value={totalTools} />
        <Stat label="Live in browser" value={implementedTools} />
        <Stat label="In your session" value="Local" mono />
      </section>

      {/* All categories — editorial spread */}
      <section className="py-16 md:py-20">
        <header className="mb-12 grid grid-cols-12 gap-x-6 border-b border-white/10 pb-5 md:gap-x-8">
          <div className="col-span-12 flex items-baseline gap-3 md:col-span-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">§ 02</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              By category
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
              Every category, with the tools inside
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
              Each category is grouped with its tools and a direct link to a deeper page where one
              exists.
            </p>
          </div>
        </header>

        <div className="space-y-20">
          {filteredCategories.map((category) => (
            <CategoryBlock
              key={category.id}
              category={category}
              hasIndex={categoryIndexPages.has(category.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────── helpers ─────────────────────────── */

const FilterChip: React.FC<{
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}> = ({ label, count, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-150",
      active
        ? "border-[#F2B84B] bg-[#F2B84B]/10 text-[#F2B84B]"
        : "border-white/10 text-white/55 hover:border-white/30 hover:text-white",
    ].join(" ")}
  >
    <span>{label}</span>
    <span className="text-white/30">{count}</span>
  </button>
);

const Stat: React.FC<{ label: string; value: number | string; mono?: boolean }> = ({
  label,
  value,
  mono,
}) => (
  <div>
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">{label}</p>
    <p
      className={
        "mt-3 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl " +
        (mono ? "font-mono text-2xl md:text-3xl" : "")
      }
    >
      {value}
    </p>
  </div>
);

const CategoryBlock: React.FC<{ category: ToolCategoryGroup; hasIndex: boolean }> = ({
  category,
  hasIndex,
}) => {
  const implemented = category.tools.filter((t) => t.implemented);
  const Icon = category.icon;

  return (
    <article className="grid grid-cols-12 gap-x-6 gap-y-6 border-b border-white/8 pb-12 md:gap-x-8">
      {/* Left rail */}
      <div className="col-span-12 md:col-span-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/75">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {category.title}
            </p>
            <p className="mt-1 text-xs text-white/45">{implemented.length} tools</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/55">{category.description}</p>
        {hasIndex && (
          <Link
            to={`/tools/${category.id}`}
            className="mt-6 inline-flex items-center gap-1.5 border-b border-[#F2B84B] pb-1 text-sm text-white transition-colors duration-150 hover:text-[#F2B84B]"
          >
            Open category page
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Right list — editorial two-column */}
      <ul className="col-span-12 grid grid-cols-1 divide-y divide-white/8 border-t border-white/8 md:col-span-8 md:grid-cols-2 md:divide-y-0 md:border-l md:border-t-0 md:pl-8">
        {implemented.map((tool, idx) => (
          <li
            key={tool.id}
            className="border-b border-white/8 last:border-b-0 md:border-b md:odd:border-r md:odd:pr-6 md:even:pl-6"
          >
            <Link
              to={tool.path}
              className="group flex items-baseline gap-3 py-3 text-sm text-white/75 transition-colors duration-150 hover:text-white"
            >
              <span className="font-mono text-[11px] tabular-nums text-white/30 group-hover:text-[#F2B84B]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 truncate">{tool.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 text-white/0 transition-all duration-150 group-hover:text-[#F2B84B]" />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Index;
export { toolCategories };
