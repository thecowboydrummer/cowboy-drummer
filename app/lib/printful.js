const PRINTFUL_API = "https://api.printful.com";

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function getStoreProducts() {
  const res = await fetch(`${PRINTFUL_API}/store/products`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printful products fetch failed: ${res.status}`);
  const { result } = await res.json();

  const detailed = await Promise.all(
    result.map((p) => getStoreProduct(p.id))
  );
  return detailed;
}

export async function getStoreProduct(id) {
  const res = await fetch(`${PRINTFUL_API}/store/products/${id}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printful product fetch failed: ${res.status}`);
  const { result } = await res.json();

  const variants = result.sync_variants.map((v) => ({
    id: v.id,
    name: v.name,
    retailPrice: v.retail_price,
    currency: v.currency,
    image: v.files?.find((f) => f.type === "preview")?.preview_url || result.sync_product.thumbnail_url,
    inStock: v.availability_status === "active",
  }));

  return {
    id: result.sync_product.id,
    name: result.sync_product.name,
    thumbnail: result.sync_product.thumbnail_url,
    variants,
  };
}

export async function getVariant(variantId) {
  const res = await fetch(`${PRINTFUL_API}/store/variants/${variantId}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printful variant fetch failed: ${res.status}`);
  const { result } = await res.json();
  return result;
}

export async function createOrder({ recipient, items, retail }) {
  const res = await fetch(`${PRINTFUL_API}/orders`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      recipient,
      items,
      retail_costs: retail,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Printful order creation failed: ${res.status} ${body}`);
  }
  return res.json();
}
