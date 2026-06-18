"use client";
import { useEffect, useState } from "react";

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
            {products?.map((product) =>
              product.variants.map((variant) => (
                <div
                  key={variant.id}
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid #2a2a2a",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {variant.image && (
                    <img
                      src={variant.image}
                      alt={variant.name}
                      style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                    />
                  )}
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{variant.name}</h3>
                    <p style={{ color: "var(--gold)", fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "20px" }}>
                      ${variant.retailPrice}
                    </p>
                    <button
                      className="btn btn-gold"
                      disabled={!variant.inStock || loadingId === variant.id}
                      onClick={() => buy(variant.id)}
                      style={{ marginTop: "auto", opacity: variant.inStock ? 1 : 0.5 }}
                    >
                      {!variant.inStock ? "Sold Out" : loadingId === variant.id ? "Redirecting…" : "Buy Now"}
                    </button>
                  </div>
                </div>
              ))
            )}
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
