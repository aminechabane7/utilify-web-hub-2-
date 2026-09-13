import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getToolTheme } from "@/lib/toolThemes";
import { getCategoryMeta } from "@/lib/categoryMeta";

interface CategoryCardProps {
  id: string;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  toolsCount?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  description,
  icon,
  toolsCount,
}) => {
  const theme = getToolTheme(id);
  const meta = getCategoryMeta(id);

  const resolvedTitle = title ?? meta?.label ?? theme.label;
  const resolvedDescription = description ?? meta?.description ?? "";
  const Icon = icon ?? meta?.icon;

  return (
    <Link
      to={`/tools/${id}`}
      className="group block h-full"
      aria-label={resolvedTitle}
    >
      <Card
        className={`h-full overflow-hidden border transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-[0_18px_50px_rgba(0,0,0,0.22)] ${theme.borderClassName}`}
      >
        <CardContent className="relative flex h-full flex-col p-5">
          <div className="mb-3 flex items-start pt-2">
            {Icon && (
              <div
                className={`mr-3 flex h-10 w-10 items-center justify-center rounded-2xl p-2.5 transition-colors ${theme.iconClassName}`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{resolvedTitle}</h3>
              {toolsCount !== undefined && (
                <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {toolsCount} tools
                </span>
              )}
            </div>
          </div>
          <p className="flex-grow text-sm leading-6 text-muted-foreground">
            {resolvedDescription}
          </p>
          <div className="mt-auto pt-5 text-sm font-medium text-primary">
            Explore <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;