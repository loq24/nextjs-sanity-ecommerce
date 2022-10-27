import groq from "groq";

const productsSlugsQuery = groq`
  *[_type == "product"]{
    "slug": slug.current
  }
`;

export default productsSlugsQuery;
