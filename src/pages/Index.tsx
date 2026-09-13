import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X, Clock, Hash, Layers, ArrowUpRight } from 'lucide-react';
import { toolCategories, type ToolCategoryGroup } from './tools';

const totalTools = toolCategories.reduce((sum, c) => sum + c.tools.length, 0);
const implementedTools = toolCategories.reduce(
  (sum, c) => sum + c.tools.filter((t) => t.implemented).length,
  0,
);

const popularQueries = [
  'word counter',
  'json formatter',
  'image resizer',
  'password',
  'uuid',
  'qr code',
  'base64',
  'lorem ipsum',
];

// Categories that have a dedicated index page (preserved from existing app)
const categoryIndexPages = new Set([
  'text', 'image', 'calculators', 'converters', 'binary', 'website', 'dev', 'misc',
]);

interface SearchableTool {
  id: string;
  title: string;
  description: string;
  path: string;
  category: ToolCategoryGroup;
}

// Flatten tool data once for searching — all data is sourced from existing toolCategories.
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
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard: "/" focuses the search bar (common editorial shortcut).
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return [] as SearchableTool[];
    return allTools
      .filter(
        (tool) =>
          tool.title.toLowerCase().includes(trimmed) ||
          tool.description.toLowerCase().includes(trimmed) ||
          tool.category.title.toLowerCase().includes(trimmed),
      )
      .slice(0, 8);
  }, [trimmed]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const first = results[0];
    if (first) navigate(first.path);
  };

  return (
    <div className="font-sans">
      {/* ────────────────────────────── Hero ────────────────────────────── */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-8 border-b border-white/8 pb-14 pt-2 md:gap-x-8 md:pb-20">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
            <span className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-[#F2B84B]/60 align-middle" />
            Utilify / Web Hub — v1.0
          </p>
          <h1 className="mt-6 text-[clamp(2.4rem,6.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            Small tools.
            <br />
            <span className="text-white/55">Big time savings.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/55">
            A quiet, fast workshop of browser utilities for text, images, calculators, and code. No
            accounts, no uploads to third parties — open a tool, do the job, move on.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              to="/tools"
              className="group inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-sm font-medium text-[#0b0d12] transition-colors duration-150 hover:bg-[#F2B84B] hover:border-[#F2B84B]"
            >
              Explore tools
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {implementedTools} tools · {toolCategories.length} categories
            </span>
          </div>
        </div>

        {/* Right rail: tiny editorial index */}
        <aside className="col-span-12 hidden border-l border-white/8 pl-8 pt-2 lg:col-span-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Index</p>
          <ol className="mt-5 space-y-2 text-sm">
            {toolCategories.slice(0, 8).map((category, i) => (
              <li key={category.id} className="flex items-baseline gap-3 text-white/60">
                <span className="font-mono text-[11px] tabular-nums text-white/30">
                  {String(i + 1).padStart(2, '0')}
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

      {/* ────────────────────────────── Search ────────────────────────────── */}
      <section className="border-b border-white/8 py-14 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-8">
          <div className="col-span-12 lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">§ 01 — Search</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white">
              What are you trying to do?
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Type a tool name, a category, or anything you remember. Results update as you type.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <form onSubmit={submit} role="search" className="relative">
              <label htmlFor="tool-search" className="sr-only">
                Search tools
              </label>
              <div className="flex items-center gap-3 border-b border-white/20 pb-3 transition-colors duration-150 focus-within:border-[#F2B84B]">
                <Search className="h-5 w-5 text-white/40" aria-hidden />
                <input
                  id="tool-search"
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tools, e.g. word counter, base64, image resize…"
                  className="flex-1 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
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

              {/* Result panel */}
              {trimmed ? (
                <div className="mt-2">
                  {results.length > 0 ? (
                    <ul className="divide-y divide-white/5 border-t border-white/5">
                      {results.map((tool) => (
                        <li key={tool.path}>
                          <Link
                            to={tool.path}
                            className="group flex items-baseline gap-4 py-3 transition-colors duration-150 hover:bg-white/[0.02]"
                          >
                            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
                              {tool.category.title.replace(/ Tools$/, '')}
                            </span>
                            <span className="text-sm font-medium text-white">{tool.title}</span>
                            <span className="hidden text-xs text-white/40 sm:inline">— {tool.description}</span>
                            <ArrowUpRight className="ml-auto h-4 w-4 text-white/30 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F2B84B]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-white/45">
                      No tools match “{query}”. Try a different word, or{' '}
                      <Link to="/tools" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                        browse the directory
                      </Link>
                      .
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-5 flex flex-wrap gap-2">
                  {popularQueries.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 transition-colors duration-150 hover:border-white/30 hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── By the numbers ────────────────────────────── */}
      <section className="grid grid-cols-2 gap-x-6 gap-y-6 border-b border-white/8 py-12 md:grid-cols-4 md:gap-x-8">
        <Stat label="Categories" value={toolCategories.length} />
        <Stat label="Total tools" value={totalTools} />
        <Stat label="Live in browser" value={implementedTools} />
        <Stat label="No account needed" value="0 / 0" mono />
      </section>

      {/* ────────────────────────────── Categories (varied layouts) ────────────────────────────── */}
      <CategorySections />
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */

const Stat: React.FC<{ label: string; value: number | string; mono?: boolean }> = ({ label, value, mono }) => (
  <div>
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">{label}</p>
    <p
      className={
        'mt-3 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl ' +
        (mono ? 'font-mono text-2xl md:text-3xl' : '')
      }
    >
      {value}
    </p>
  </div>
);

/* Varied layouts per category so the page doesn't read as repetitive card grid. */
const CategorySections: React.FC = () => {
  // We pick a small, deliberate set of categories to feature prominently.
  // All data is read live from toolCategories — no hardcoded names or counts.
  const featured = ['text', 'calculators', 'converters', 'image'] as const;
  const remaining = toolCategories.filter((c) => !(featured as readonly string[]).includes(c.id));

  return (
    <div className="space-y-20 py-20 md:space-y-28 md:py-28">
      {/* Row 1: Text tools — editorial list, dense */}
      <TextSection category={toolCategories.find((c) => c.id === 'text')!} />

      {/* Row 2: Calculators — two-up mixed cards */}
      <CalculatorSection category={toolCategories.find((c) => c.id === 'calculators')!} />

      {/* Row 3: Image + Converters side by side, asymmetric */}
      <div className="grid grid-cols-12 gap-x-6 gap-y-14 md:gap-x-8">
        <ImageSection category={toolCategories.find((c) => c.id === 'image')!} />
        <ConverterSection category={toolCategories.find((c) => c.id === 'converters')!} />
      </div>

      {/* Row 4: Remaining categories as a compact typographic list */}
      <RemainingSection categories={remaining} />
    </div>
  );
};

/* ── Section helpers ── */

const SectionHeader: React.FC<{
  index: string;
  title: string;
  description: string;
  count: number;
  href?: string;
  categoryId?: string;
}> = ({ index, title, description, count, href, categoryId }) => (
  <header className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-white/10 pb-6 md:gap-x-8">
    <div className="col-span-12 flex items-baseline gap-3 md:col-span-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">§ {index}</span>
      <span className="font-mono text-[11px] tabular-nums text-white/30">{String(count).padStart(2, '0')}</span>
    </div>
    <div className="col-span-12 md:col-span-7">
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">{description}</p>
    </div>
    <div className="col-span-12 flex items-end justify-start md:col-span-3 md:justify-end">
      {href && categoryIndexPages.has(categoryId ?? '') ? (
        <Link
          to={href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors duration-150 hover:text-[#F2B84B]"
        >
          All {title.toLowerCase().replace(/s$/, '')} tools
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  </header>
);

/* ── Text section: editorial two-column with a hero tool on the left ── */
const TextSection: React.FC<{ category: ToolCategoryGroup }> = ({ category }) => {
  const implemented = category.tools.filter((t) => t.implemented);
  const hero = implemented[0];
  const rest = implemented.slice(1);

  return (
    <section>
      <SectionHeader
        index="02"
        title={category.title}
        description={category.description}
        count={category.tools.length}
        href={`/tools/${category.id}`}
        categoryId={category.id}
      />

      <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6 md:gap-x-8">
        {hero && (
          <Link
            to={hero.path}
            className="group col-span-12 flex flex-col border border-white/10 p-6 transition-colors duration-150 hover:border-white/30 md:col-span-5 md:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Featured</p>
            <h4 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white md:text-[28px]">
              {hero.title}
            </h4>
            <p className="mt-3 text-sm leading-6 text-white/55">{hero.description}</p>
            <div className="mt-auto flex items-center gap-2 pt-8 text-sm text-white transition-colors group-hover:text-[#F2B84B]">
              Open tool
              <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        )}

        <ul className="col-span-12 grid grid-cols-1 divide-y divide-white/8 border-t border-white/8 md:col-span-7 md:grid-cols-2 md:divide-y-0">
          {rest.map((tool) => (
            <li key={tool.id} className="border-b border-white/8 last:border-b-0 md:border-b md:odd:border-r md:odd:pr-6 md:even:pl-6">
              <Link
                to={tool.path}
                className="group flex items-baseline gap-3 py-3 text-sm text-white/70 transition-colors duration-150 hover:text-white"
              >
                <span className="font-mono text-[11px] text-white/30 group-hover:text-[#F2B84B]">→</span>
                <span className="flex-1 truncate">{tool.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 text-white/0 transition-all duration-150 group-hover:text-[#F2B84B]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ── Calculators: mixed-feel grid with featured + standard cards ── */
const CalculatorSection: React.FC<{ category: ToolCategoryGroup }> = ({ category }) => {
  const implemented = category.tools.filter((t) => t.implemented);
  const first = implemented[0];
  const second = implemented[1];
  const rest = implemented.slice(2);

  return (
    <section>
      <SectionHeader
        index="03"
        title={category.title}
        description={category.description}
        count={category.tools.length}
        href={`/tools/${category.id}`}
        categoryId={category.id}
      />

      <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-px md:gap-x-8">
        {first && (
          <Link
            to={first.path}
            className="group col-span-12 flex flex-col gap-4 bg-white/[0.02] p-6 transition-colors duration-150 hover:bg-white/[0.04] md:col-span-7 md:p-8"
          >
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              <CalculatorGlyph />
              Calculator
            </div>
            <h4 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">{first.title}</h4>
            <p className="max-w-md text-sm leading-6 text-white/55">{first.description}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors group-hover:text-[#F2B84B]">
              Open <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        )}

        {second && (
          <Link
            to={second.path}
            className="group col-span-12 flex flex-col gap-3 border border-white/10 p-6 transition-colors duration-150 hover:border-white/30 md:col-span-5 md:p-8"
          >
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              <Hash className="h-3.5 w-3.5" />
              Calculator
            </div>
            <h4 className="text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">{second.title}</h4>
            <p className="text-sm leading-6 text-white/55">{second.description}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors group-hover:text-[#F2B84B]">
              Open <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        )}

        {rest.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group col-span-6 flex items-baseline justify-between gap-3 border-t border-white/8 py-4 text-sm text-white/70 transition-colors duration-150 hover:text-white md:col-span-3"
          >
            <span className="truncate">{tool.title}</span>
            <ArrowUpRight className="h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5 text-white/0 transition-all duration-150 group-hover:text-[#F2B84B]" />
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ── Image: dense two-column list inside a panel ── */
const ImageSection: React.FC<{ category: ToolCategoryGroup }> = ({ category }) => {
  const implemented = category.tools.filter((t) => t.implemented);
  return (
    <section className="col-span-12 lg:col-span-7">
      <SectionHeader
        index="04"
        title={category.title}
        description={category.description}
        count={category.tools.length}
        href={`/tools/${category.id}`}
        categoryId={category.id}
      />
      <ul className="mt-6 columns-1 gap-x-8 sm:columns-2">
        {implemented.map((tool) => (
          <li key={tool.id} className="mb-3 break-inside-avoid">
            <Link
              to={tool.path}
              className="group flex items-baseline gap-2 text-sm text-white/70 transition-colors duration-150 hover:text-white"
            >
              <span className="font-mono text-[11px] text-white/30 group-hover:text-[#F2B84B]">↳</span>
              <span className="truncate">{tool.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

/* ── Converters: short, compact two-card layout ── */
const ConverterSection: React.FC<{ category: ToolCategoryGroup }> = ({ category }) => {
  const implemented = category.tools.filter((t) => t.implemented);
  return (
    <section className="col-span-12 lg:col-span-5">
      <SectionHeader
        index="05"
        title={category.title}
        description={category.description}
        count={category.tools.length}
        href={`/tools/${category.id}`}
        categoryId={category.id}
      />
      <div className="mt-6 grid grid-cols-1 gap-px bg-white/8">
        {implemented.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group flex items-center justify-between gap-4 bg-[#0b0d12] px-4 py-4 transition-colors duration-150 hover:bg-[#10131a]"
          >
            <div>
              <p className="text-sm font-medium text-white">{tool.title}</p>
              <p className="mt-0.5 text-xs text-white/45">{tool.description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/35 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F2B84B]" />
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ── Remaining categories: typographic index with counts ── */
const RemainingSection: React.FC<{ categories: ToolCategoryGroup[] }> = ({ categories }) => {
  if (categories.length === 0) return null;
  return (
    <section>
      <SectionHeader
        index="06"
        title="Also in the directory"
        description="More categories, all powered by the same data underneath the home page."
        count={categories.reduce((s, c) => s + c.tools.length, 0)}
      />
      <ul className="mt-6 divide-y divide-white/8 border-y border-white/8">
        {categories.map((category) => {
          const hasIndex = categoryIndexPages.has(category.id);
          return (
            <li key={category.id}>
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 py-5 transition-colors duration-150 hover:bg-white/[0.015]">
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                  {category.title.replace(/ Tools$/, '')}
                </span>
                <p className="col-span-12 text-sm text-white/65 md:col-span-6">{category.description}</p>
                <span className="col-span-6 font-mono text-[11px] tabular-nums text-white/40 md:col-span-2 md:text-right">
                  {category.tools.length} tools
                </span>
                <div className="col-span-6 flex items-center justify-end gap-4 text-sm md:col-span-2">
                  {hasIndex && (
                    <Link
                      to={`/tools/${category.id}`}
                      className="text-white/55 transition-colors duration-150 hover:text-white"
                    >
                      Open
                    </Link>
                  )}
                  <Link
                    to={`/tools/${category.id}`}
                    className="group inline-flex items-center gap-1 text-white/70 transition-colors duration-150 hover:text-[#F2B84B]"
                  >
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

/* Tiny inline glyph used in the calculator section — keeps the page free of icon repetition */
const CalculatorGlyph: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden
    className="text-white/45"
  >
    <rect x="2" y="1.5" width="10" height="11" stroke="currentColor" strokeWidth="1" />
    <rect x="3.5" y="3" width="7" height="2" fill="currentColor" />
    <circle cx="5" cy="8" r="0.7" fill="currentColor" />
    <circle cx="7" cy="8" r="0.7" fill="currentColor" />
    <circle cx="9" cy="8" r="0.7" fill="currentColor" />
    <circle cx="5" cy="10.5" r="0.7" fill="currentColor" />
    <circle cx="7" cy="10.5" r="0.7" fill="currentColor" />
    <circle cx="9" cy="10.5" r="0.7" fill="currentColor" />
  </svg>
);

// Re-export for Layout's potential cross-page use
export { toolCategories };
export default Index;
