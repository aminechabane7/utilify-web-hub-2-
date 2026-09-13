export type DigitalProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  format: string;
  accent: string;
  checkoutUrl: string;
};

const STORAGE_KEY = "utilify-store-products";
const ADMIN_KEY = "utilify-store-admin";

export const getStoredProducts = (): DigitalProduct[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
};

export const saveStoredProduct = (product: DigitalProduct) => {
  const products = getStoredProducts();
  if (!products.find((p) => p.id === product.id)) {
    products.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
};

export const removeStoredProduct = (id: string) => {
  const products = getStoredProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const setAdminMode = (password: string) => {
  localStorage.setItem(ADMIN_KEY, password);
};

export const getAdminMode = (): string | null => {
  return localStorage.getItem(ADMIN_KEY);
};

export const clearAdminMode = () => {
  localStorage.removeItem(ADMIN_KEY);
};

export type GumroadProduct = {
  name: string;
  description: string;
  price: string;
  price_number: number;
  currency: string;
  preview: string;
};

// Get the scraper API URL - can be configured via environment variable
const SCRAPER_API = import.meta.env.VITE_GUMROAD_SCRAPER_URL || "";

export const fetchGumroadProduct = async (url: string): Promise<GumroadProduct | null> => {
  const match = url.trim().match(/gumroad\.com\/l\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;

  const productId = match[1];

  // If a scraper API is configured, use it
  if (SCRAPER_API) {
    try {
      const response = await fetch(`${SCRAPER_API}?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json() as { name?: string; description?: string; price?: string; price_number?: number; error?: string };
        if (data && !data.error && data.name) {
          return {
            name: data.name,
            description: data.description || "Digital product on Gumroad.",
            price: data.price || "See Gumroad",
            price_number: data.price_number || 0,
            currency: "USD",
            preview: "",
          };
        }
      }
    } catch {
      // Continue to fallback
    }
  }

  // Fallback: try allorigins proxy
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Proxy failed");
    const data = await response.json() as { contents?: string };
    if (!data.contents) throw new Error("No content");

    const html = data.contents;

    // Extract from __NEXT_DATA__ (Next.js SSR data)
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    if (nextDataMatch) {
      try {
        const nextData = JSON.parse(nextDataMatch[1]);
        const product = nextData?.props?.pageProps?.product ||
                       nextData?.props?.pageProps?.digitalProduct;
        if (product) {
          const name = (product.title || product.name || "").replace(/\s*by\s+[\w\s]+\s*$/i, "").trim();
          const description = product.description || product.short_description || "";
          const price_number = parseFloat(product.price || "0");
          return {
            name,
            description,
            price: price_number > 0 ? `$${price_number}` : "See Gumroad",
            price_number,
            currency: "USD",
            preview: "",
          };
        }
      } catch {}
    }

    // Fallback to meta tags
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const name = titleMatch ? titleMatch[1].replace(/\s*[-|]\s*Gumroad\s*$/i, "").replace(/\s*by\s+[\w\s]+$/i, "").trim() : "";
    const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ||
                      html.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i);
    const description = descMatch ? descMatch[1].trim() : "";

    if (name) {
      return {
        name,
        description: description || "Digital product on Gumroad.",
        price: "See Gumroad",
        price_number: 0,
        currency: "USD",
        preview: "",
      };
    }
  } catch {}

  return null;
};

export const digitalProducts: DigitalProduct[] = [
  {
    id: "tcsfmu",
    name: "32 Vibrant Stickers Set: Express Yourself with Colorful Art! + Digital ART",
    description: "A collection of 32 colorful digital sticker designs for laptops, journals, water bottles, and creative projects.",
    price: "$1+",
    format: "Digital art",
    accent: "bg-cyan-400/15 text-cyan-200",
    checkoutUrl: "https://larsonized0.gumroad.com/l/tcsfmu",
  },
  {
    id: "oinxr",
    name: "Smart Investments: Strategies for Wealth and Retirement Planning",
    description: "A retirement planning guide covering investment strategies, personal finance, stock market analysis, and wealth management.",
    price: "$1+",
    format: "Digital guide",
    accent: "bg-amber-300/15 text-amber-100",
    checkoutUrl: "https://larsonized0.gumroad.com/l/oinxr",
  },
  {
    id: "sonuzr",
    name: "Discovering Happiness and Fulfillment: Expert Advice and Strategies",
    description: "Self-improvement tips, personal growth strategies, motivational advice, and mindfulness techniques for a more fulfilling life.",
    price: "$2",
    format: "Digital guide",
    accent: "bg-emerald-400/15 text-emerald-200",
    checkoutUrl: "https://larsonized0.gumroad.com/l/sonuzr",
  },
  {
    id: "gjeapi",
    name: "ChatGPT Prompts Manager for Content Creators",
    description: "A categorized prompt library with customizable lists and regular updates for bloggers, YouTubers, influencers, and podcasters.",
    price: "$9.99",
    format: "Digital tool",
    accent: "bg-fuchsia-400/15 text-fuchsia-200",
    checkoutUrl: "https://larsonized0.gumroad.com/l/gjeapi",
  },
  {
    id: "xkszk",
    name: "Revitalize: Unlock the Secrets to Youth and Vitality",
    description: "An 81-page guide to sleep, nutrition, exercise, mental clarity, skincare, longevity, and holistic wellness.",
    price: "$17",
    format: "81-page eBook",
    accent: "bg-rose-400/15 text-rose-200",
    checkoutUrl: "https://larsonized0.gumroad.com/l/xkszk",
  },
  {
    id: "pcsms",
    name: "Your Home Fitness Journey: Achieve Your Fitness Goals Without Leaving Home",
    description: "A home fitness guide with workouts, warm-ups, meal plans, workout logs, and practical advice for adults of all ages.",
    price: "$5.99",
    format: "18-page eBook",
    accent: "bg-lime-400/15 text-lime-200",
    checkoutUrl: "https://larsonized0.gumroad.com/l/pcsms",
  },
];

export const getGenerationCount = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("utilify-blog-generation") ?? "null") as { date?: string; count?: number } | null;
    return stored?.date === new Date().toISOString().slice(0, 10) ? Number(stored.count ?? 0) : 0;
  } catch {
    return 0;
  }
};

export const incrementGenerationCount = () => {
  localStorage.setItem("utilify-blog-generation", JSON.stringify({ date: new Date().toISOString().slice(0, 10), count: getGenerationCount() + 1 }));
};

export const generateBlogDraft = async (settings: { topic: string; audience: string; tone: string; length: string }) => {
  const agentRouterKey = import.meta.env.VITE_AGENTROUTER_API_KEY;
  if (agentRouterKey) {
    const prompt = `Write a ${settings.length} blog post about ${settings.topic} for ${settings.audience}. Tone: ${settings.tone}. Return only the article body with a concise title on the first line.`;
    const response = await fetch("https://agentrouter.org/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${agentRouterKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_AGENTROUTER_MODEL || "gpt-5.6-sol",
        messages: [
          { role: "system", content: "You write useful, accurate blog posts for a digital tools website." },
          { role: "user", content: prompt },
        ],
      }),
    });
    const result = await response.json() as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
    if (!response.ok) throw new Error(result.error?.message ?? "AgentRouter could not generate a draft.");
    return result.choices?.[0]?.message?.content?.trim() ?? "";
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: `Write a ${settings.length} blog post about ${settings.topic} for ${settings.audience}. Tone: ${settings.tone}. Return only the article body with a concise title on the first line.` }] }] }),
    });
    const result = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>; error?: { message?: string } };
    if (!response.ok) throw new Error(result.error?.message ?? "The AI provider could not generate a draft.");
    return result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
  }

  return `${settings.topic}: a practical note\n\nFor ${settings.audience}, the most useful approach is to make the next step obvious. Start with the outcome you want, remove unnecessary complexity, and build a repeatable rhythm around the work. A ${settings.tone.toLowerCase()} perspective helps the idea stay useful long after the first read.`;
};
