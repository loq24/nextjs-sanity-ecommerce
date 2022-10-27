import groq from "groq";

const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    featured_image
  }
`;

export default categoryQuery;
