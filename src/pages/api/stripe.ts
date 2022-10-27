import type { NextApiRequest, NextApiResponse } from "next";
import { CartProduct } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-08-01"
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log("req.body.items", req.body.items);

      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1LwIjtHs6qS0xDzPhMIPdvAd"
          },
          {
            shipping_rate: "shr_1LwIkrHs6qS0xDzP3qphYXpq"
          }
        ],
        line_items: req.body.items.map((item: CartProduct) => {
          const imgUrl = urlFor(item.featured_image).url();

          return {
            price_data: {
              currency: "USD",
              product_data: {
                name: item.name,
                images: [imgUrl]
              },
              unit_amount: (item.on_sale ? item.sale_price : item.price) * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity ? item.quantity : 1
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : null
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
