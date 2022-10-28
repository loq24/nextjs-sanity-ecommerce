import Cookies from "js-cookie";
import Types from "./types";
import { CartProduct, CookieCart } from "lib/interfaces";
import {
  AddToCartAction,
  RemoveSingleItemAction,
  BulkAddAction,
  RemoveWholeProduct,
  RemoveAllItems
} from "./actions";

const cartItemsStr = Cookies.get("_cart");
const parsedCartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];

export const initialState = parsedCartItems;

export type ACTIONTYPES =
  | AddToCartAction
  | RemoveSingleItemAction
  | RemoveWholeProduct
  | BulkAddAction
  | RemoveAllItems;

export const cartReducer = (state: CartProduct[], action: ACTIONTYPES) => {
  switch (action.type) {
    case Types.bulkAdd:
      return action.payload;
    case Types.addToCart:
      let cart;
      if (
        state.some(
          (product: CartProduct) => product.slug === action.payload.slug
        )
      ) {
        cart = state.map((product: CartProduct) => {
          if (action.payload.slug === product.slug) {
            const quantity = product.quantity ? product.quantity : 1;
            return {
              ...product,
              price: parseFloat(
                (product.price + product.price / quantity).toFixed(2)
              ),
              quantity: quantity + 1
            };
          }
          return product;
        });
      } else {
        cart = [...state, { ...action.payload, quantity: 1 }];
      }

      updateCookie(cart);
      return cart;

    case Types.removeSingleItem:
      const slug = action.payload;

      const newCart = state.reduce(
        (items: CartProduct[], item: CartProduct) => {
          if (item.slug === slug && item.quantity !== 1 && item.quantity) {
            return [
              ...items,
              {
                ...item,
                price: parseFloat(
                  (item.price - item.price / item.quantity).toFixed(2)
                ),
                quantity: item.quantity - 1
              }
            ];
          }
          if (item.slug !== slug) {
            return [...items, item];
          }
          return items;
        },
        []
      );

      updateCookie(newCart);
      return newCart;

    case Types.removeWholeProduct:
      const _slug = action.payload;

      const _newCart = state.reduce(
        (items: CartProduct[], item: CartProduct) => {
          if (item.slug !== _slug) {
            return [...items, item];
          }
          return items;
        },
        []
      );

      updateCookie(_newCart);
      return _newCart;

    case Types.removeAllItems:
      updateCookie([]);
      return [];

    default:
      throw new Error();
  }
};

const updateCookie = (cartItems: CartProduct[]) => {
  const cookieProducts =
    cartItems.length > 0 &&
    cartItems.reduce((cookieItems: CookieCart[], item: CartProduct) => {
      if (!cookieItems.some((cookieItem) => cookieItem.slug === item.slug)) {
        return [...cookieItems, { slug: item.slug, quantity: item.quantity }];
      }
      return cookieItems;
    }, []);
  Cookies.set("_cart", JSON.stringify(cookieProducts), {
    expires: 30,
    secure: true,
    sameSite: "lax"
  });
};
