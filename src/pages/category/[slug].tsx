import { GetStaticProps, GetStaticPaths } from "next";
import client from "lib/sanity/client";
import { CategorySchema, ProductSchema } from "lib/interfaces";
import categoryQuery from "lib/sanity/queries/category";
import categoriesSlugsQuery from "lib/sanity/queries/categories_slugs";
import categoryProductsQuery from "lib/sanity/queries/category_products";
import ProductList from "components/ProductList/ProductList";
import MetaHead from "components/MetaHead";

interface CategoryProps {
  products: ProductSchema[];
  category: CategorySchema;
}

const Category: React.FC<CategoryProps> = ({ products, category }) => {
  const { title, description } = category;
  return (
    <>
      {title && (
        <MetaHead
          title={`NextJS Sanity Stripe eCommerce | ${title}`}
          description={description}
        />
      )}
      <div>
        <h1 className="page-heading capitalize">{category.title}</h1>
        {category.description && (
          <p className="paragraph">{category.description}</p>
        )}
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p className="font-semibold">
            Awww! All {title} products are sold out!
          </p>
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await client.fetch(categoryProductsQuery, {
    slug: params?.slug
  });
  const category = await client.fetch(categoryQuery, {
    slug: params?.slug
  });

  if (!products || !category) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { products, category },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(categoriesSlugsQuery);

  const paths = slugs.map((item: { slug: string }) => ({
    params: { slug: item.slug }
  }));

  return {
    paths,
    fallback: "blocking"
  };
};

export default Category;
