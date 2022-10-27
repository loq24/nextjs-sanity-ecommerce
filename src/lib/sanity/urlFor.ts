import client from "./client";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "lib/interfaces";

const builder = imageUrlBuilder(client);

export default function urlFor(source: Image) {
  return builder.image(source);
}
