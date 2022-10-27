import groq from "groq";

const productsBySlugsQuery = groq`
  *[_type == "product" && slug.current in $slugs]{
    _id,
    name,
    "slug": slug.current,
    description,
    featured_image,
    price,
    on_sale,
    sale_price,
    sku
  }
`;

export default productsBySlugsQuery;
