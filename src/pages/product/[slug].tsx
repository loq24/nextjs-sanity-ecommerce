import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { ProductSchema } from "lib/interfaces";
import CartItemsContext from "contexts/cartItemsContext";
import Types from "reducers/cart/types";
import { PortableText, toPlainText } from "@portabletext/react";
import productsSlugsQuery from "lib/sanity/queries/products_slugs";
import productQuery from "lib/sanity/queries/product";
import urlFor from "lib/sanity/urlFor";
import client from "lib/sanity/client";
import classNames from "classnames";
import MetaHead from "components/MetaHead";
import CartVisibilityContext from "contexts/cartVisibilityContext";

interface ProductProps {
  product: ProductSchema;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const { dispatch } = useContext(CartItemsContext);

  const addToCart = () => {
    dispatch({
      type: Types.addToCart,
      payload: { ...product }
    });

    toggleCartVisibility();
  };

  return (
    <>
      {product?.name && (
        <MetaHead
          title={product.name}
          description={toPlainText(product.description)}
        />
      )}
      {product?.categories && (
        <div className="flex sm:flex-row flex-col justify-between w-full max-w-2xl mx-auto sm:mt-0 mb-9 ">
          <Link href={`/category/${product.categories[0].slug}`}>
            <a>&laquo; {product.categories[0].title}</a>
          </Link>
        </div>
      )}
      <div className="flex sm:flex-row flex-col justify-between w-full max-w-2xl mx-auto sm:mt-8 mt-3">
        <div className="overflow-hidden relative sm:w-2/5 w-full sm:mb-0 mb-5 h-80">
          {product?.featured_image && (
            <Image
              src={urlFor(product.featured_image).url()}
              layout="fill"
              quality={100}
              className="object-cover"
              alt={product.name}
            />
          )}
        </div>
        <div className="sm:w-3/5 w-full sm:pl-6 sm:pr-0 pl-5 pr-5 ">
          <h1 className="text-4xl text-left font-bold text-gray-900 sm:truncate mb-8">
            {product?.name}
          </h1>
          <h2 className="mb-6">
            <span className="text-xl text-gray-900 mr-2">Price: </span>
            <span
              className={classNames("text-2xl mb-1", {
                "line-through text-gray-400 mr-3": product?.on_sale,
                "text-gray-900": !product?.on_sale
              })}
            >
              ${product?.price}
            </span>
            {product?.on_sale && (
              <span className="text-red-600 text-2xl ">
                NOW ${product?.sale_price}
              </span>
            )}
          </h2>
          <h3 className="text-xl text-gray-900 mr-2">Description:</h3>
          {product?.description && (
            <div className="text-gray-600 text-sm mb-5">
              <PortableText value={product?.description} />
            </div>
          )}

          <button
            onClick={addToCart}
            className="bg-black px-6 py-3 text-white text-xs uppercase hover:bg-white hover:text-black border-black border-2 transition-colors duration-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await client.fetch(productQuery, {
    slug: params?.slug
  });

  if (!product) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { product },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(productsSlugsQuery);

  const paths = slugs.map((item: { slug: string }) => ({
    params: { slug: item.slug }
  }));

  return {
    paths,
    fallback: true
  };
};

export default Product;
