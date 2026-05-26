import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Bad signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Payment succeeded:", session.id, session.customer_details?.email);
    // TODO: send confirmation email, update inventory in V2
  }

  return NextResponse.json({ received: true });
}
