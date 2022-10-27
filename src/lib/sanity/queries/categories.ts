import groq from "groq";

const categoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    "slug": slug.current,
    description,
    featured_image
  }
`;

export default categoriesQuery;
