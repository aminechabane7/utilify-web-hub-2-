import type { ElementType } from "react";
import {
  ArrowLeftRight,
  Binary,
  Calculator,
  Code2,
  Globe,
  ImagePlus,
  Package,
  Type,
} from "lucide-react";

/**
 * Centralised category-level metadata shared by UI components (CategoryCard,
 * CategoryShowcase) and SEO generation (Seo, pageMeta). Keeping this in one
 * place avoids duplicating titles/descriptions/icons across each category's
 * index page.
 */
export interface CategoryMeta {
  /** Route segment used under /tools/{id} */
  id: string;
  /** Short label shown in badges/navigation */
  label: string;
  /** Page-level title used for headings and <title> generation */
  title: string;
  /** Short summary shown in cards/listings */
  description: string;
  /** Longer copy used on the category's own page */
  longDescription: string;
  /** Optional badge label override (falls back to `label`) */
  accentLabel?: string;
  /** Icon used across cards and headers */
  icon: ElementType;
  /** SEO title (falls back to `title`-based generation when omitted) */
  seoTitle: string;
  /** SEO meta description (falls back to `description` when omitted) */
  seoDescription: string;
}

export const categoryMeta: Record<string, CategoryMeta> = {
  text: {
    id: "text",
    label: "Text Tools",
    title: "Text tools built for fast edits and cleaner copy",
    description: "Analyze, format and manipulate text with ease",
    longDescription:
      "Count, transform, generate, and clean text in a workspace that stays lightweight while still feeling polished.",
    icon: Type,
    seoTitle: "Free Online Text Tools – Count, Convert & Clean Copy",
    seoDescription:
      "Count characters, words, sentences, and paragraphs; convert case; create URL slugs; generate lorem ipsum; remove line breaks; sort lines; and more.",
  },
  image: {
    id: "image",
    label: "Image Tools",
    title: "Image utilities with a clearer, more visual workflow",
    description: "Resize, convert and optimize your images",
    longDescription:
      "Resize, convert, crop, and reformat assets without bouncing through heavy editors for routine image tasks.",
    icon: ImagePlus,
    seoTitle: "Free Online Image Tools – Resize, Convert & Optimize",
    seoDescription: "Resize, crop, rotate, convert, and optimize images directly in your browser.",
  },
  calculators: {
    id: "calculators",
    label: "Calculator Tools",
    title: "Calculators organized for everyday decisions",
    description: "Handy calculators for various needs",
    longDescription:
      "From fees and finance to dates, health, and probability, these calculators now sit in a more legible and consistent browsing experience.",
    icon: Calculator,
    seoTitle: "Free Online Calculators – Finance, Health & Statistics",
    seoDescription: "Handy calculators for percentages, loans, dates, fees, health metrics, and more.",
  },
  converters: {
    id: "converters",
    label: "Converters",
    title: "Free online unit converters for everyday measurements",
    description: "Convert between different units and formats",
    longDescription:
      "Convert units for length, weight, temperature, time, digital storage, energy, and more with fast browser-based tools.",
    accentLabel: "Unit converters",
    icon: ArrowLeftRight,
    seoTitle: "Free Online Unit Converters – Length, Weight, Temperature & More",
    seoDescription:
      "Convert units for length, weight, temperature, time, digital storage, energy, and more with fast browser-based tools.",
  },
  binary: {
    id: "binary",
    label: "Binary Tools",
    title: "Binary Conversion Tools",
    description: "Work with binary data and encoding",
    longDescription:
      "A collection of tools to help with converting between binary, decimal, hex, octal, and text.",
    icon: Binary,
    seoTitle: "Free Online Binary Tools – Binary, Decimal, Hex & Octal Converters",
    seoDescription:
      "Convert between binary, decimal, hexadecimal, octal, and text with fast, free browser-based tools.",
  },
  website: {
    id: "website",
    label: "Website Tools",
    title: "Website tools for code cleanup, encoding, and link work",
    description: "Tools for web development and management",
    longDescription:
      "Keep web utility tasks in one place with better hierarchy, faster scanning, and a design that matches the rest of the platform.",
    icon: Globe,
    seoTitle: "Free Web Development Tools – Minify, Encode, QR Code",
    seoDescription: "Minify HTML/CSS/JS, encode URLs, beautify code, and generate QR codes—all in your browser.",
  },
  dev: {
    id: "dev",
    label: "Dev Tools",
    title: "Free developer tools for JSON and regular expressions",
    description: "Tools for developers and programmers",
    longDescription:
      "Format JSON and test regular expressions with lightweight browser-based tools for everyday development work.",
    accentLabel: "Developer tools",
    icon: Code2,
    seoTitle: "Developer Tools – JSON Formatter & Regex Tester",
    seoDescription: "Format JSON, validate syntax, and test regular expressions with visual feedback.",
  },
  misc: {
    id: "misc",
    label: "Miscellaneous",
    title: "Free online utilities for passwords, UUIDs, and UTM links",
    description: "Other useful tools and utilities",
    longDescription:
      "Handle common web tasks with practical browser-based utilities for secure passwords, UUIDs, Facebook IDs, and campaign URLs.",
    accentLabel: "Utility tools",
    icon: Package,
    seoTitle: "Miscellaneous Tools – UUID, Password, UTM Builder",
    seoDescription: "Generate UUIDs, strong passwords, and build UTM tracking parameters.",
  },
};

export const getCategoryMeta = (id?: string): CategoryMeta | undefined => (id ? categoryMeta[id] : undefined);

export const categoryMetaList: CategoryMeta[] = Object.values(categoryMeta);
