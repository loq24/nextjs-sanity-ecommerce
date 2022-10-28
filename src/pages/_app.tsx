import "styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect, useReducer, useState } from "react";
import PageLayout from "components/PageLayout/PageLayout";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { cartReducer } from "reducers/cart/reducer";
import Types from "reducers/cart/types";
import productsBySlugsQuery from "lib/sanity/queries/products_by_slugs";
import { CookieCart, CartProduct } from "lib/interfaces";
import Cookies from "js-cookie";
import client from "lib/sanity/client";
import { useRouter } from "next/router";

const cartItems = Cookies.get("_cart");

const parsedCartItems = cartItems && JSON.parse(cartItems);
const slugs =
  parsedCartItems &&
  parsedCartItems.reduce((slugs: string[], item: CookieCart) => {
    return [...slugs, item.slug];
  }, []);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartVisibility, setCartVisibilty] = useState(false);

  const appendTotalItemsField = (products: CartProduct[]) => {
    return products.map((product: CartProduct, i) => {
      return {
        ...product,
        quantity: parsedCartItems[i].quantity ? parsedCartItems[i].quantity : 1
      };
    });
  };

  const toggleCartVisibility = () => {
    setCartVisibilty(!cartVisibility);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (parsedCartItems) {
        const cartProducts = await client.fetch(productsBySlugsQuery, {
          slugs
        });

        if (!cartProducts) {
          throw Error("Sorry, something went wrong.");
        }

        dispatch({
          type: Types.bulkAdd,
          payload: cartProducts && appendTotalItemsField(cartProducts)
        });
      }
    };

    if (router.asPath !== "/success") fetchCartProducts();
  }, []);

  return (
    <CartItemsContext.Provider
      value={{
        cart,
        dispatch
      }}
    >
      <CartVisibilityContext.Provider
        value={{
          cartVisibility,
          toggleCartVisibility
        }}
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </CartVisibilityContext.Provider>
    </CartItemsContext.Provider>
  );
}

export default MyApp;
