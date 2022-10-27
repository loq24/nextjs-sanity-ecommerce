import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "rvl9gg39",
  dataset: "production",
  apiVersion: "2022-10-14",
  token: process.env.SANITY_PROJECT_TOKEN,
  useCdn: false // `false` if you want to ensure fresh data
});

export default client;
