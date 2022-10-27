import groq from "groq";

const categoryProductsQuery = groq`
  *[_type == "product" && $slug in categories[]->slug.current ]{
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

export default categoryProductsQuery;
