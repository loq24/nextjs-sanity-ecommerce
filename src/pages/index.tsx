import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import onSaleProductsQuery from "lib/sanity/queries/on_sale_products";
import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import CategoryList from "components/CategoryList/CategoryList";
import ProductList from "components/ProductList/ProductList";

interface HomeProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, products }) => {
  return (
    <>
      <MetaHead description="An eCommerce app that is built by NextJS, Sanity and Stripe." />
      <h1 className="main-heading text-center">Shop all you want!</h1>
      {categories && <CategoryList categories={categories} />}

      <h2 className="main-heading text-center">On Sale!</h2>
      {products && <ProductList products={products} />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await client.fetch(categoriesQuery);
  const onSaleProducts = await client.fetch(onSaleProductsQuery);

  if (!categories || !onSaleProducts) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { categories, products: onSaleProducts },
    revalidate: 60
  };
};

export default Home;
