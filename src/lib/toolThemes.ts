export type ToolTheme = {
  label: string;
  badgeClassName: string;
  iconClassName: string;
  borderClassName: string;
  glowClassName: string;
};

export const toolThemes: Record<string, ToolTheme> = {
  text: {
    label: "Text Tools",
    badgeClassName: "border-sky-400/20 bg-sky-400/10 text-sky-200",
    iconClassName: "bg-sky-400/15 text-sky-200",
    borderClassName: "border-sky-400/16 hover:border-sky-300/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_28%)]",
  },
  image: {
    label: "Image Tools",
    badgeClassName: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    iconClassName: "bg-emerald-400/15 text-emerald-200",
    borderClassName: "border-emerald-400/16 hover:border-emerald-300/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_28%)]",
  },
  calculators: {
    label: "Calculator Tools",
    badgeClassName: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    iconClassName: "bg-amber-300/15 text-amber-100",
    borderClassName: "border-amber-300/16 hover:border-amber-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_28%)]",
  },
  converters: {
    label: "Converters",
    badgeClassName: "border-orange-300/20 bg-orange-300/10 text-orange-100",
    iconClassName: "bg-orange-300/15 text-orange-100",
    borderClassName: "border-orange-300/16 hover:border-orange-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_28%)]",
  },
  binary: {
    label: "Binary Tools",
    badgeClassName: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    iconClassName: "bg-cyan-300/15 text-cyan-100",
    borderClassName: "border-cyan-300/16 hover:border-cyan-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]",
  },
  website: {
    label: "Website Tools",
    badgeClassName: "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-100",
    iconClassName: "bg-fuchsia-300/15 text-fuchsia-100",
    borderClassName: "border-fuchsia-300/16 hover:border-fuchsia-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(232,121,249,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_28%)]",
  },
  dev: {
    label: "Dev Tools",
    badgeClassName: "border-slate-300/20 bg-slate-300/10 text-slate-100",
    iconClassName: "bg-slate-300/15 text-slate-100",
    borderClassName: "border-slate-300/16 hover:border-slate-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(100,116,139,0.12),transparent_28%)]",
  },
  misc: {
    label: "Miscellaneous",
    badgeClassName: "border-rose-300/20 bg-rose-300/10 text-rose-100",
    iconClassName: "bg-rose-300/15 text-rose-100",
    borderClassName: "border-rose-300/16 hover:border-rose-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(251,113,133,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.12),transparent_28%)]",
  },
  code: {
    label: "Code Tools",
    badgeClassName: "border-indigo-300/20 bg-indigo-300/10 text-indigo-100",
    iconClassName: "bg-indigo-300/15 text-indigo-100",
    borderClassName: "border-indigo-300/16 hover:border-indigo-200/30",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.12),transparent_28%)]",
  },
  default: {
    label: "Utilities",
    badgeClassName: "border-white/15 bg-white/8 text-white",
    iconClassName: "bg-white/10 text-white",
    borderClassName: "border-white/10 hover:border-white/20",
    glowClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_28%)]",
  },
};

export const getToolTheme = (key?: string) => {
  if (!key) return toolThemes.default;
  return toolThemes[key] ?? toolThemes[key.replace(/Tool$/, "")] ?? toolThemes.default;
};
