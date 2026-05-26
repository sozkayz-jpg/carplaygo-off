import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getVariantById } from "../../lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://carplaygo.fr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: { variantId: string; quantity: number }[] = body.items || [];

    const lineItems = items
      .map((item) => {
        const variant = getVariantById(item.variantId);
        if (!variant) return null;
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: variant.name,
              description: variant.tagline,
              images: [`${DOMAIN}${variant.image}`],
            },
            unit_amount: Math.round(variant.price * 100),
          },
          quantity: item.quantity,
        };
      })
      .filter(Boolean) as Stripe.Checkout.SessionCreateParams.LineItem[];

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "Aucun article valide" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel`,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      locale: "fr",
      metadata: {
        source: "carplaygo-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
