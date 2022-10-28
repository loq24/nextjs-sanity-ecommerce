export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required()
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
      title: "SKU",
      name: "sku",
      type: "string"
    },
    {
      title: "Description",
      name: "description",
      type: "blockContent"
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" }
        }
      ]
    },
    {
      title: "Featured Image",
      name: "featured_image",
      type: "image"
    },
    {
      title: "Price",
      name: "price",
      type: "number"
    },
    {
      title: "Currency",
      name: "currency",
      type: "string",
      initialValue: "USD",
      hidden: true
    },
    {
      title: "Sale Price",
      name: "sale_price",
      type: "number",
      hidden: ({ document }) => !document.on_sale
    },
    {
      title: "On Sale?",
      name: "on_sale",
      type: "boolean"
    }
  ]
};
