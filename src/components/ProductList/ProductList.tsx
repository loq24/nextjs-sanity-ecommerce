import { ProductSchema } from "lib/interfaces";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: ProductSchema[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-x-1 md:gap-y-14 gap-y-10 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
      {products.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductList;
