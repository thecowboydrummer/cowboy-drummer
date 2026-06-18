"use client";
import { useEffect, useMemo, useState } from "react";

function parseVariant(name, productName) {
  const rest = name.slice(productName.length).replace(/^\s*\/\s*/, "");
  const parts = rest.split(" / ").map((p) => p.trim());
  return { color: parts[0] || null, size: parts[1] || null };
}

function ProductCard({ product, loadingId, onBuy }) {
  const options = useMemo(
    () => product.variants.map((v) => ({ ...v, ...parseVariant(v.name, product.name) })),
    [product]
  );
  const colors = [...new Set(options.map((o) => o.color).filter(Boolean))];
  const sizes = [...new Set(options.map((o) => o.size).filter(Boolean))];

  const [color, setColor] = useState(colors[0] || null);
  const [size, setSize] = useState(sizes[0] || null);

  const selected =
    options.find((o) => o.color === color && o.size === size) || options[0];

  return (
    <div
      style={{
        background: "var(--bg2)",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {selected.image && (
        <img
          src={selected.image}
          alt={product.name}
          style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
        />
      )}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{product.name}</h3>
        <p style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "20px" }}>
          ${selected.retailPrice}
        </p>

        {colors.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "1px", color: "var(--muted)", marginBottom: "8px" }}>COLOR</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="btn"
                  style={{
                    padding: "6px 14px",
                    fontSize: "13px",
                    background: c === color ? "var(--gold)" : "transparent",
                    color: c === color ? "#000" : "var(--white)",
                    border: "1px solid var(--gold)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "1px", color: "var(--muted)", marginBottom: "8px" }}>SIZE</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="btn"
                  style={{
                    padding: "6px 14px",
                    fontSize: "13px",
                    background: s === size ? "var(--gold)" : "transparent",
                    color: s === size ? "#000" : "var(--white)",
                    border: "1px solid var(--gold)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="btn btn-gold"
          disabled={!selected.inStock || loadingId === selected.id}
          onClick={() => onBuy(selected.id)}
          style={{ marginTop: "auto", opacity: selected.inStock ? 1 : 0.5 }}
        >
          {!selected.inStock ? "Sold Out" : loadingId === selected.id ? "Redirecting…" : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default function Store() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch("/api/printful/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setProducts(data.products);
      })
      .catch(() => setError("Failed to load products."));
  }, []);

  async function buy(variantId) {
    setLoadingId(variantId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Checkout failed.");
    } catch {
      setError("Checkout failed.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      <div style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center", background: "linear-gradient(to bottom, #111 0%, var(--bg) 100%)", borderBottom: "1px solid #1a1a1a" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "6px", color: "var(--gold)", marginBottom: "12px" }}>OFFICIAL MERCH</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,96px)", letterSpacing: "2px" }}>TCBD STORE</h1>
      </div>

      <section>
        <div className="container">
          {error && (
            <p style={{ textAlign: "center", color: "var(--gold)", marginBottom: "32px" }}>{error}</p>
          )}

          {!products && !error && (
            <p style={{ textAlign: "center", color: "var(--muted)" }}>Loading products…</p>
          )}

          {products && products.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--muted)" }}>No products available right now. Check back soon.</p>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "32px",
            }}
          >
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} loadingId={loadingId} onBuy={buy} />
            ))}
          </div>

          <div style={{ marginTop: "48px", padding: "28px", background: "var(--bg3)", borderRadius: "6px", borderLeft: "3px solid var(--gold)", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", letterSpacing: "1px", color: "var(--gold)", marginBottom: "8px" }}>QUESTIONS ABOUT AN ORDER?</p>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              Reach out via the <a href="/contact" style={{ color: "var(--white)", textDecoration: "underline" }}>contact page</a> or DM on Instagram.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
