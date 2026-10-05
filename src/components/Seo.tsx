import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_META } from "@/lib/pageMeta";
import { getCategoryMeta } from "@/lib/categoryMeta";

const SITE_NAME = "Utilify Web Hub";
const SITE_URL = "https://utilify-web-hub-2.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TITLE = "Utilify Web Hub – Free Online Tools";
const DEFAULT_DESCRIPTION =
  "Free browser-based utilities for text, images, code, calculators, and conversions. No login, no installs, no tracking.";

const humanize = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const setMetaContent = (selector: string, attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const canonicalPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const cleanSegments = segments.map((segment) =>
    segment
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase(),
  );
  return cleanSegments.length ? `/${cleanSegments.join("/")}` : "/";
};

const getMetadata = (pathname: string, title?: string, description?: string) => {
  // Allow explicit overrides passed via props
  if (title && description) return { title, description };

  const explicit = PAGE_META[pathname];
  if (explicit?.title && explicit?.description) {
    return { title: explicit.title, description: explicit.description };
  }

  const segments = pathname.split("/").filter(Boolean);
  const category = segments[1];
  const meta = category ? getCategoryMeta(category) : undefined;

  if (meta && segments.length === 2) {
    return {
      title: title ?? explicit?.title ?? meta.seoTitle,
      description: description ?? explicit?.description ?? meta.seoDescription,
    };
  }

  if (meta && segments.length > 2) {
    const toolName = humanize(segments.at(-1) ?? "Online Tool");
    return {
      title: (title ?? explicit?.title ?? `${toolName} | Free Online ${meta.label} Tool`).slice(0, 60),
      description: (
        description ??
        explicit?.description ??
        `Use the free ${toolName} online tool in your browser. Get fast, practical ${meta.label.toLowerCase()} results without installing software.`
      ).slice(0, 160),
    };
  }

  return {
    title: title ?? explicit?.title ?? DEFAULT_TITLE,
    description: description ?? explicit?.description ?? DEFAULT_DESCRIPTION,
  };
};

interface SeoProps {
  title?: string;
  description?: string;
}

/** Keeps the document head to one title and one description for every client-side route. */
const Seo = ({ title, description }: SeoProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title: resolvedTitle, description: resolvedDescription } = getMetadata(pathname, title, description);
    document.title = resolvedTitle;
    setMetaContent('meta[name="description"]', "name", "description", resolvedDescription);
    setMetaContent('meta[property="og:title"]', "property", "og:title", resolvedTitle);
    setMetaContent('meta[property="og:description"]', "property", "og:description", resolvedDescription);
    setMetaContent('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMetaContent('meta[name="twitter:title"]', "name", "twitter:title", resolvedTitle);
    setMetaContent('meta[name="twitter:description"]', "name", "twitter:description", resolvedDescription);

    // Canonical URL to avoid duplicate content issues
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalUrl = `${SITE_URL}${canonicalPath(pathname)}`;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
    setMetaContent('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaContent('meta[property="og:image"]', "property", "og:image", OG_IMAGE);
    setMetaContent('meta[property="og:image:type"]', "property", "og:image:type", "image/png");
    setMetaContent('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    setMetaContent('meta[property="og:image:height"]', "property", "og:image:height", "630");
    setMetaContent('meta[name="twitter:image"]', "name", "twitter:image", OG_IMAGE);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
          description: DEFAULT_DESCRIPTION,
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: resolvedTitle,
          description: resolvedDescription,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
        ...(canonicalPath(pathname).startsWith("/tools/") &&
        canonicalPath(pathname).split("/").filter(Boolean).length > 2
          ? [
              {
                "@type": "SoftwareApplication",
                name: resolvedTitle.split(/[–|]/)[0].trim(),
                description: resolvedDescription,
                url: canonicalUrl,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
            ]
          : []),
      ],
    };
    let schemaElement = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]#site-schema');
    if (!schemaElement) {
      schemaElement = document.createElement("script");
      schemaElement.type = "application/ld+json";
      schemaElement.id = "site-schema";
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [pathname, title, description]);

  return null;
};

export { getMetadata, DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME };
export default Seo;
