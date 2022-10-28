export default {
  title: "Category",
  name: "category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96
      }
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image"
    }
  ]
};
