
import React from 'react';
import { cn } from '@/lib/utils';
import { getToolTheme } from '@/lib/toolThemes';

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  children: React.ReactNode;
  instructions?: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  category,
  categoryColor,
  children,
  instructions
}) => {
  const theme = getToolTheme(categoryColor);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8">
        <div className={cn("absolute inset-0", theme.glowClassName)} />
        <div className="relative space-y-3">
          <div
            className={cn(
              "inline-flex rounded-full border px-3 py-1 text-sm font-medium uppercase tracking-[0.16em]",
              theme.badgeClassName
            )}
          >
            {category}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="max-w-3xl text-base leading-7 text-slate-300">{description}</p>
        </div>
      </div>

      {instructions && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h2 className="mb-2 font-medium text-white">How to use</h2>
          {instructions}
        </div>
      )}

      <div className="rounded-[1.5rem] border border-white/10 bg-card/80 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
        {children}
      </div>
    </div>
  );
};

export default ToolLayout;
