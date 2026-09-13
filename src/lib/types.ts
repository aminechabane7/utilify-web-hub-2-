import type { ElementType } from "react";

/** A single tool entry rendered inside a category listing. */
export interface ToolItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: ElementType;
}

/** A tool entry paired with an implementation flag, used on the flat directory page. */
export interface DirectoryToolItem {
  id: string;
  title: string;
  description: string;
  path: string;
  implemented: boolean;
}

/** A tool category grouping used by the flat tool directory page. */
export interface ToolCategoryGroup {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  gradient: string;
  tools: DirectoryToolItem[];
}
