/**
 * Centralised page-level SEO metadata.
 *
 * `PAGE_META` provides explicit overrides per route, so we never have to
 * scatter title/description strings across individual page components.
 * When a route is not listed here, `Seo` falls back to dynamic generation
 * via `getMetadata`.
 */

export interface PageMeta {
  title?: string;
  description?: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "Utilify Web Hub – Free Online Tools for Text, Images & Code",
    description:
      "Free browser-based utilities for text, images, code, calculators, and conversions. No login, no installs, no tracking.",
  },
  "/about": {
    title: "About Utilify Web Hub – Free Online Tools",
    description:
      "Learn about Utilify Web Hub — a fast, privacy-friendly collection of free browser tools for everyday digital tasks.",
  },
  "/store": {
    title: "Store – Digital Products for Better Workflows",
    description: "Practical templates and systems for creators, builders, and modern digital work.",
  },
  "/tools": {
    title: "Free Online Tools for Text, Images, Code & More",
    description:
      "Explore free online text, image, website, calculator, converter, binary, and developer tools designed for quick browser-based work.",
  },

  // Text Tools
  "/tools/text": {
    title: "Free Online Text Tools – Count, Convert & Clean Copy",
    description:
      "Count characters, words, sentences, and paragraphs; convert case; create URL slugs; generate lorem ipsum; remove line breaks; sort lines; and more.",
  },
  "/tools/text/word-counter": {
    title: "Word Counter – Count Characters, Words, Sentences, Paragraphs",
    description: "Count characters, words, sentences, and paragraphs in real‑time.",
  },
  "/tools/text/text-case-converter": {
    title: "Text Case Converter – Upper, Lower, Title Case",
    description: "Convert text between uppercase, lowercase, title case, and more instantly.",
  },
  "/tools/text/text-to-slug": {
    title: "Text to Slug – URL‑Friendly Slug Generator",
    description: "Convert any text to a URL‑friendly slug for SEO‑friendly URLs.",
  },
  "/tools/text/lorem-ipsum-generator": {
    title: "Lorem Ipsum Generator – Placeholder Text Generator",
    description: "Generate placeholder text for designs and projects.",
  },
  "/tools/text/remove-line-breaks": {
    title: "Remove Line Breaks – Clean Up Text",
    description: "Remove or replace line breaks in text, add new lines where needed.",
  },
  "/tools/text/random-word-generator": {
    title: "Random Word Generator – Creative Words for Writing",
    description: "Generate random words for creative writing, brainstorming, naming, etc.",
  },
  "/tools/text/text-repeater": {
    title: "Text Repeater – Repeat Text Multiple Times",
    description: "Repeat a string a specified number of times instantly.",
  },
  "/tools/text/sorter": {
    title: "Text Sorter – Alphabetical or Numeric Sort",
    description: "Sort lines of text alphabetically or numerically.",
  },
  "/tools/misc/comma-separator": {
    title: "Comma Separator – Add Commas to List Items",
    description: "Separate text items into a comma‑separated list.",
  },

  // Image Tools
  "/tools/image": {
    title: "Free Online Image Tools – Resize, Convert & Optimize",
    description:
      "Resize, crop, rotate, convert, and optimize images directly in your browser.",
  },
  "/tools/image/image-resizer": {
    title: "Image Resizer – Resize & Compress Images",
    description: "Resize and compress images with a live preview, no software required.",
  },
  "/tools/image/image-to-base64": {
    title: "Image to Base64 – Convert Image to Base64 String",
    description: "Convert images to Base64 strings without quality loss.",
  },
  "/tools/image/base64-to-image": {
    title: "Base64 to Image – Convert Base64 to Image",
    description: "Decode Base64 strings back into images.",
  },
  "/tools/image/ImageConverter": {
    title: "Image Converter – Convert Between Image Formats",
    description: "Convert images between PNG, JPG, WebP, BMP, GIF, and ICO formats.",
  },
  "/tools/image/ImageCropper": {
    title: "Image Cropper – Crop Images with Precise Dimensions",
    description: "Crop images to custom dimensions with an interactive preview.",
  },
  "/tools/image/ImageEnlarger": {
    title: "Image Enlarger – Upscale Images Without Quality Loss",
    description: "Enlarge images while preserving quality using AI‑enhanced upscaling.",
  },
  "/tools/image/FlipImage": {
    title: "Flip Image – Horizontal or Vertical Flip",
    description: "Flip images horizontally or vertically with one click.",
  },
  "/tools/image/RotateImage": {
    title: "Rotate Image – Rotate by Custom Angles",
    description: "Rotate images by any angle online.",
  },

  // Calculators
  "/tools/calculators": {
    title: "Free Online Calculators – Finance, Health & Statistics",
    description:
      "Handy calculators for percentages, loans, dates, fees, health metrics, and more.",
  },
  "/tools/calculators/age-calculator": {
    title: "Age Calculator – Determine Your Exact Age",
    description: "Calculate your precise age based on your birth date.",
  },
  "/tools/calculators/percentage-calculator": {
    title: "Percentage Calculator – % of a Number & More",
    description: "Calculate percentages, percentage increase/decrease, and ratios instantly.",
  },

  // Website / Web Development Tools
  "/tools/website": {
    title: "Free Web Development Tools – Minify, Encode, QR Code",
    description:
      "Minify HTML/CSS/JS, encode URLs, beautify code, and generate QR codes—all in your browser.",
  },
  "/tools/website/html-minifier": {
    title: "HTML Minifier – Compress HTML Code",
    description: "Compress HTML markup to reduce page weight.",
  },
  "/tools/website/css-minifier": {
    title: "CSS Minifier – Compress CSS Code",
    description: "Compress CSS stylesheets for faster loading.",
  },
  "/tools/website/css-beautifier": {
    title: "CSS Beautifier – Format CSS Code",
    description: "Format CSS with proper indentation and spacing.",
  },
  "/tools/website/js-minifier": {
    title: "JavaScript Minifier – Compress JS Code",
    description: "Compress JavaScript files for faster loading.",
  },
  "/tools/website/js-beautifier": {
    title: "JavaScript Beautifier – Format JS Code",
    description: "Format JavaScript code for readability.",
  },
  "/tools/website/URLEncode": {
    title: "URL Encoder – Secure URL Encoding",
    description: "Encode strings for safe transmission in URLs.",
  },
  "/tools/website/URLDecode": {
    title: "URL Decoder – Decode Encoded URLs",
    description: "Decode URL‑encoded strings back to plain text.",
  },
  "/tools/website/QRCodeGenerator": {
    title: "QR Code Generator – Create QR Codes Online",
    description: "Generate QR codes from text or URLs instantly.",
  },
  "/tools/website/QRCodeDecoder": {
    title: "QR Code Decoder – Read QR Codes from Images",
    description: "Decode QR codes from uploaded images.",
  },

  // Dev Tools
  "/tools/dev": {
    title: "Developer Tools – JSON Formatter & Regex Tester",
    description:
      "Format JSON, validate syntax, and test regular expressions with visual feedback.",
  },
  "/tools/dev/json-formatter": {
    title: "JSON Formatter – Format & Validate JSON Online",
    description: "Format, validate, and download JSON data with a friendly UI.",
  },
  "/tools/dev/regex-tester": {
    title: "Regex Tester – Test Regular Expressions Visually",
    description: "Test regex patterns with live match highlighting.",
  },

  // Miscellaneous Tools
  "/tools/misc": {
    title: "Miscellaneous Tools – UUID, Password, UTM Builder",
    description:
      "Generate UUIDs, strong passwords, and build UTM tracking parameters.",
  },
  "/tools/misc/password-generator": {
    title: "Password Generator – Secure Random Passwords",
    description: "Create strong, random passwords with custom settings.",
  },
  "/tools/misc/uuid-generator": {
    title: "UUID Generator – Generate Random UUIDs (v4)",
    description: "Generate RFC‑4122 compliant UUIDs instantly.",
  },
  "/tools/misc/UTMBuilder": {
    title: "UTM Builder – Create Tracking Parameters for Campaigns",
    description: "Create fully‑qualified UTM parameters for analytics.",
  },

  // Legal generators
  "/tools/text/terms-and-condition-generator": {
    title: "Terms & Conditions Generator – Free Template Generator",
    description: "Generate customizable terms and conditions for your website or app.",
  },
  "/tools/text/disclaimer-generator": {
    title: "Disclaimer Generator – Legal Disclaimer Creator",
    description: "Generate personalized disclaimer text for websites, apps, or products.",
  },
};