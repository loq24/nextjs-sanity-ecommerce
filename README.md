## 🛍 Next.js Sanity E-commerce Starter Kit

A [Next.js](https://nextjs.org/) E-commerce app with [Sanity.io](https://www.sanity.io/) and [Stripe API](https://stripe.com/). Built with [TailwindCSS](https://tailwindcss.com/) framework & [SASS](https://sass-lang.com/) CSS extension.

Demo live at: [nextjs-sanity-ecommerce-loq24.vercel.app](https://nextjs-sanity-ecommerce-loq24.vercel.app/)

> You may use `4242 4242 4242 4242` as card number when paying and future `MM/YY` value and arbitrary `CVC` value

## Run the app locally

> To run this app locally, you need to have [Sanity.io](https://www.sanity.io/) and [Stripe](https://stripe.com/) accounts.

### Setting up Sanity

- Head over to the [Sanity.io's](https://www.sanity.io/docs/create-a-sanity-project?ref=navbar) getting started page and generate a blank template
- Copy the schema files located in `sanity/schemas` from this project to your sanity project's `schemas` directory
- Make sure to replace the client configuration found under `src/lib/sanity/client.ts` with your own Sanity project

### Setting up Stripe

- Create a [Stripe](https://stripe.com/) account
- Make sure to enable Test mode first
- Submit basic account details to enable test mode payment

### Environment Variables

> It is important to provide the following environment variables in order for this project to run properly locally

`SANITY_PROJECT_TOKEN` - Found under [https://www.sanity.io/manage](https://www.sanity.io/manage) then select your project and then go to API -> Tokens

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - This can be found in your Stripe's dashboard

`STRIPE_SECRET_KEY` - This can be found in your Stripe's dashboard
