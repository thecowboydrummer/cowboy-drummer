import { getStoreProducts } from "../../../lib/printful";

export async function GET() {
  try {
    const products = await getStoreProducts();
    return Response.json({ products });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
