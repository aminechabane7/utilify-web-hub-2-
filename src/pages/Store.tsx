import React, { useState, useEffect } from "react";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { digitalProducts, getStoredProducts, saveStoredProduct, removeStoredProduct, setAdminMode, getAdminMode, clearAdminMode, fetchGumroadProduct, type DigitalProduct } from "@/lib/content";
import Seo from "@/components/Seo";

const Store: React.FC = () => {
  const [storedProducts, setStoredProducts] = useState<DigitalProduct[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setStoredProducts(getStoredProducts());
    setIsAdmin(getAdminMode() !== null);
  }, []);

  const allProducts = [...digitalProducts, ...storedProducts];

  const handleAdd = (product: DigitalProduct) => {
    saveStoredProduct(product);
    setStoredProducts(getStoredProducts());
    setShowAddModal(false);
  };

  const handleRemove = (id: string) => {
    removeStoredProduct(id);
    setStoredProducts(getStoredProducts());
  };

  const handleAdminLogin = (password: string) => {
    setAdminMode(password);
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    clearAdminMode();
    setIsAdmin(false);
  };

  return (
    <div className="font-sans">
      <Seo
        title="Store | Utilify Web Hub"
        description="Practical digital products for creators, builders, and modern workflows."
      />

      {/* Hero */}
      <section className="grid grid-cols-12 gap-x-6 gap-y-8 border-b border-white/8 pb-14 md:gap-x-8 md:pb-20">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
            <span className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-[#F2B84B]/60 align-middle" />
            The Utilify shop — digital goods
          </p>
          <h1 className="mt-5 text-[clamp(2.2rem,5.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            Systems for making
            <br />
            <span className="text-white/55">good work move.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/55">
            Downloadable templates, guides, and tools for creators, builders, and modern digital
            work. Practical files. Clear next steps. No subscriptions.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-sm font-medium text-[#0b0d12] transition-colors duration-150 hover:bg-[#F2B84B] hover:border-[#F2B84B]"
            >
              Browse products
              <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {isAdmin ? (
              <>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="group inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-sm font-medium text-[#0b0d12] transition-colors duration-150 hover:bg-[#F2B84B] hover:border-[#F2B84B]"
                >
                  Add product
                  <Plus className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="group inline-flex items-center gap-1.5 border-b border-white/30 pb-1 text-sm text-white/70 transition-colors duration-150 hover:border-white hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )}
            <Link
              to="/tools"
              className="group inline-flex items-center gap-1.5 border-b border-white/30 pb-1 text-sm text-white/70 transition-colors duration-150 hover:border-white hover:text-white"
            >
              Back to free tools
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <aside className="col-span-12 hidden border-l border-white/8 pl-8 pt-2 lg:col-span-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">Catalogue</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-white/45">Products</dt>
              <dd className="mt-1 font-mono text-2xl tabular-nums text-white">
                {String(allProducts.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Format</dt>
              <dd className="mt-1 text-white">Digital downloads</dd>
            </div>
            <div>
              <dt className="text-white/45">Checkout</dt>
              <dd className="mt-1 text-white">Gumroad (per product)</dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Products list */}
      <section id="products" className="py-14 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 border-b border-white/10 pb-6 md:gap-x-8">
          <div className="col-span-12 flex items-baseline gap-3 md:col-span-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2B84B]">
              § 01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/35">
              Digital products
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
              Choose your next useful shortcut
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
              Each item is a one-time download. Open, use, keep.
            </p>
          </div>
        </div>

        <ul className="mt-10 divide-y divide-white/8 border-y border-white/8">
          {allProducts.map((product, idx) => (
            <li key={product.id}>
              <article className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-6 md:gap-x-8">
                <span className="col-span-3 font-mono text-[11px] tabular-nums text-white/30 md:col-span-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="col-span-9 md:col-span-6">
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-white md:text-xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{product.description}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                    {product.format}
                  </p>
                </div>
                <div className="col-span-12 flex items-center justify-between md:col-span-5 md:flex-col md:items-end md:justify-center md:gap-3">
                  <span className="font-mono text-2xl tabular-nums text-white md:text-3xl">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={product.checkoutUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 border-b border-white pb-1 text-sm text-white transition-colors duration-150 hover:border-[#F2B84B] hover:text-[#F2B84B]"
                    >
                      Get the product
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    {storedProducts.some((p) => p.id === product.id) && (
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="group inline-flex items-center gap-1 border-b border-white/30 pb-1 text-xs text-white/40 transition-colors duration-150 hover:border-rose-400 hover:text-rose-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-center gap-2 text-sm text-white/45">
          <Check className="h-4 w-4 text-[#F2B84B]" aria-hidden />
          Secure checkout links connect to each product's Gumroad page.
        </p>
      </section>

      {/* Footer nav */}
      <section className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">Looking for free tools instead?</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            Browse free tools
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/about"
            className="group inline-flex items-center gap-1.5 text-white/65 transition-colors duration-150 hover:text-white"
          >
            About Utilify
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {showAddModal && (
        <AddProductModal
          existing={allProducts}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

const AddProductModal: React.FC<{
  existing: DigitalProduct[];
  onClose: () => void;
  onAdd: (product: DigitalProduct) => void;
}> = ({ existing, onClose, onAdd }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("$1+");
  const [format, setFormat] = useState("Digital product");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    const match = url.trim().match(/gumroad\.com\/l\/([a-zA-Z0-9_-]+)/);
    if (!match) {
      setError("Invalid Gumroad URL. Use the format: https://username.gumroad.com/l/xxxx");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const product = await fetchGumroadProduct(url.trim());
      if (product) {
        // Clean up the title - remove "by Username" suffix if present
        const cleanName = product.name
          .replace(/\s*by\s+[\w\s]+\s*$/i, "")
          .replace(/\s*\|\s*Gumroad\s*$/i, "")
          .trim();
        setName(cleanName);
        setDescription(product.description);
        // Use the actual price from the fetched data
        if (product.price_number > 0) {
          setPrice(`$${product.price_number}`);
        } else {
          setPrice(product.price);
        }
        setFetched(true);
      } else {
        setError("Could not fetch product data. Please enter manually.");
        setFetched(true);
      }
    } catch {
      setError("Fetch failed. Please enter details manually.");
      setFetched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const match = url.trim().match(/gumroad\.com\/l\/([a-zA-Z0-9_-]+)/);
    if (!match) {
      setError("Invalid Gumroad URL.");
      return;
    }
    const id = match[1];
    if (existing.some((p) => p.id === id)) {
      setError("This product is already in the store.");
      return;
    }
    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }

    onAdd({
      id,
      name: name.trim(),
      description: description.trim() || "Digital product available on Gumroad.",
      price: price.trim() || "$1+",
      format: format.trim() || "Digital product",
      accent: "bg-cyan-400/15 text-cyan-200",
      checkoutUrl: url.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-white/10 bg-[#0b0d12] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-semibold text-white">Add a Gumroad product</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white" aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-[0.18em] text-white/45">
              Gumroad URL *
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="url"
                required
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setFetched(false);
                }}
                placeholder="https://larsonized0.gumroad.com/l/xxxxx"
                className="flex-1 border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#F2B84B] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleFetch}
                disabled={loading || !url.trim()}
                className="border border-[#F2B84B] px-3 py-2 text-sm text-[#F2B84B] hover:bg-[#F2B84B] hover:text-[#0b0d12] disabled:opacity-40"
              >
                {loading ? "Fetching..." : "Auto-fill"}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-white/30">Paste the Gumroad product URL and click Auto-fill</p>
          </div>

          {fetched && (
            <>
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.18em] text-white/45">
                  Product name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2 text-sm text-white focus:border-[#F2B84B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.18em] text-white/45">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2 text-sm text-white focus:border-[#F2B84B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.18em] text-white/45">
                    Price
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2 text-sm text-white focus:border-[#F2B84B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.18em] text-white/45">
                    Format
                  </label>
                  <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="mt-2 w-full border border-white/15 bg-transparent px-3 py-2 text-sm text-white focus:border-[#F2B84B] focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-white/20 px-4 py-2 text-sm text-white/70 hover:border-white hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={fetched && !name.trim()}
              className="border border-white bg-white px-4 py-2 text-sm font-medium text-[#0b0d12] hover:bg-[#F2B84B] hover:border-[#F2B84B] disabled:opacity-40"
            >
              Add to store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminLogin: React.FC<{ onLogin: (password: string) => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Enter a password");
      return;
    }
    onLogin(password.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
        placeholder="Admin password"
        className="border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#F2B84B] focus:outline-none"
      />
      <button
        type="submit"
        className="border border-white/20 px-3 py-2 text-sm text-white/70 hover:border-white hover:text-white"
      >
        Login
      </button>
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </form>
  );
};

export default Store;
