import groq from "groq";

const onSaleProductsQuery = groq`
  *[_type == "product" && on_sale == true][0..3]{
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

export default onSaleProductsQuery;
