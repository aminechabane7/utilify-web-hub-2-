export const onRequest: PagesFunction = async ({ request, params }) => {
  const url = new URL(request.url);

  // Handle GET requests for scraping
  if (request.method === "GET") {
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Missing url parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate URL is a Gumroad URL
    if (!targetUrl.includes("gumroad.com/l/")) {
      return new Response(JSON.stringify({ error: "Must be a Gumroad product URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // Fetch the Gumroad page with a proper User-Agent
      const gumroadResponse = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });

      if (!gumroadResponse.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch Gumroad page" }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        });
      }

      const html = await gumroadResponse.text();

      // Parse the HTML to extract product data
      // Try to find data in __NEXT_DATA__ (Gumroad uses Next.js)
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
            const price = price_number > 0 ? `$${price_number}` : "See Gumroad";
            const currency = product.currency || "USD";

            return new Response(JSON.stringify({
              name,
              description,
              price,
              price_number,
              currency,
              preview: "",
            }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
        } catch (parseError) {
          // Continue to fallback parsing
        }
      }

      // Fallback: parse meta tags
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const name = titleMatch ? titleMatch[1].replace(/\s*[-|]\s*Gumroad\s*$/i, "").replace(/\s*by\s+[\w\s]+$/i, "").trim() : "";

      const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ||
                        html.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i);
      const description = descMatch ? descMatch[1].trim() : "";

      if (name) {
        return new Response(JSON.stringify({
          name,
          description: description || "Digital product on Gumroad.",
          price: "See Gumroad",
          price_number: 0,
          currency: "USD",
          preview: "",
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Could not parse product data" }), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: "Scraping failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};
