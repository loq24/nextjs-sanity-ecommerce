import groq from "groq";

const categoriesSlugsQuery = groq`
  *[_type == "category"]{
    "slug": slug.current
  }
`;

export default categoriesSlugsQuery;
