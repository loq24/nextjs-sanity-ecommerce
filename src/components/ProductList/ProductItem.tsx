import styles from "styles/components/ProductList/ProductItem.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ProductSchema } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import classNames from "classnames";

interface ProductItemProps {
  product: ProductSchema;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className={styles.productItem}>
      <Link href={`/product/${product.slug}`}>
        <a className="relative w-full h-full">
          <div className="w-full h-64 md:mb-4 mb-2 overflow-hidden relative">
            <Image
              src={urlFor(product.featured_image).url()}
              quality={100}
              layout="fill"
              className="clickable-img"
              alt={product.name}
            />
          </div>
        </a>
      </Link>
      <Link href={`/product/${product.slug}`}>
        <a className="relative w-full h-full">
          <div className="w-full px-1 flex flex-col items-center">
            <h3 className="text-lg uppercase font-medium text-center mb-3">
              {product.name}
            </h3>
            <div className="flex items-center flex-col">
              <span
                className={classNames("text-base mb-1", {
                  "line-through text-gray-400": product.on_sale,
                  "mr-3 text-gray-900": !product.on_sale
                })}
              >
                ${product.price}
              </span>
              {product.on_sale && (
                <span className="text-base text-red-600">
                  NOW ${product.sale_price}
                </span>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductItem;
