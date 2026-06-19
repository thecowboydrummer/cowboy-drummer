import { stripe } from "../../../lib/stripe";
import { createOrder } from "../../../lib/printful";

export async function POST(req) {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return Response.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items"],
    });

    const shipping = fullSession.shipping_details || fullSession.customer_details;
    const address = shipping?.address;
    const email = fullSession.customer_details?.email;

    if (email && fullSession.payment_intent) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(fullSession.payment_intent);
        if (paymentIntent.latest_charge) {
          await stripe.charges.update(paymentIntent.latest_charge, {
            receipt_email: email,
            description: `Charge for ${email}`,
          });
        }
      } catch (err) {
        console.error("Failed to trigger receipt email:", err.message);
      }
    }

    try {
      await createOrder({
        recipient: {
          name: shipping?.name,
          email: fullSession.customer_details?.email,
          address1: address?.line1,
          address2: address?.line2 || undefined,
          city: address?.city,
          state_code: address?.state,
          country_code: address?.country,
          zip: address?.postal_code,
        },
        items: [
          {
            sync_variant_id: parseInt(fullSession.metadata.printful_variant_id, 10),
            quantity: parseInt(fullSession.metadata.quantity, 10) || 1,
          },
        ],
        retail: {
          subtotal: (fullSession.amount_subtotal / 100).toFixed(2),
          total: (fullSession.amount_total / 100).toFixed(2),
          currency: fullSession.currency?.toUpperCase(),
        },
      });
    } catch (err) {
      console.error("Printful order creation failed:", err.message);
      return Response.json({ error: err.message }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
