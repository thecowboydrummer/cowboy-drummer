import { stripe } from "../../lib/stripe";

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const cents = Math.round(parseFloat(amount) * 100);

    if (!cents || cents < 100) {
      return Response.json({ error: "Minimum tip is $1." }, { status: 400 });
    }

    const origin = req.headers.get("origin") || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Tip for The Cowboy Drummer" },
            unit_amount: cents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?tip=success`,
      cancel_url: `${origin}/?tip=canceled`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
