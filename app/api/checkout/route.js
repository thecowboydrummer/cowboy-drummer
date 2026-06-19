import { stripe } from "../../lib/stripe";
import { getVariant } from "../../lib/printful";

export async function POST(req) {
  try {
    const { variantId, quantity = 1 } = await req.json();
    if (!variantId) {
      return Response.json({ error: "variantId is required" }, { status: 400 });
    }

    const variant = await getVariant(variantId);
    const qty = Math.max(1, Math.min(10, parseInt(quantity, 10) || 1));
    const origin = req.headers.get("origin") || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      line_items: [
        {
          price_data: {
            currency: variant.currency?.toLowerCase() || "usd",
            product_data: {
              name: variant.name,
              images: variant.files
                ?.filter((f) => f.type === "preview")
                .map((f) => f.preview_url)
                .slice(0, 1),
            },
            unit_amount: Math.round(parseFloat(variant.retail_price) * 100),
          },
          quantity: qty,
        },
      ],
      metadata: {
        printful_variant_id: String(variantId),
        quantity: String(qty),
      },
      success_url: `${origin}/store?success=1`,
      cancel_url: `${origin}/store?canceled=1`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
