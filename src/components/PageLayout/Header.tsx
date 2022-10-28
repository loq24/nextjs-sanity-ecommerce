import styles from "styles/components/PageLayout/Header.module.scss";
import Link from "next/link";
import Cart from "./Cart/Cart";
import { useContext } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { CartProduct } from "lib/interfaces";
import { MdShoppingCart } from "react-icons/md";

const Header = () => {
  const { cart } = useContext(CartItemsContext);
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const cartLength = cart.reduce(
    (count: number, item: CartProduct) =>
      (count += item.quantity ? item.quantity : 1),
    0
  );

  return (
    <>
      <Cart />
      <header className="bg-black sticky top-0 z-20">
        <div className="w-full mx-auto flex justify-between py-4 max-w-7xl px-6">
          <nav>
            <ul className={styles.mainNav}>
              <li>
                <Link href="/">
                  <a>Shop</a>
                </Link>
              </li>
              <li>
                <a href="https://github.com/loq24/nextjs-sanity-ecommerce">
                  Github
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <button className="relative z-50 border-0 bg-transparent outline-0">
              <MdShoppingCart
                color="white"
                onClick={toggleCartVisibility}
                size={30}
              />
              {cartLength > 0 && (
                <span className="absolute w-4 h-4 text-black text-xs border border-solid border-gray-500 rounded-full flex flex-row justify-center items-center p-2 -left-1 -bottom-1 bg-white">
                  {cartLength}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
