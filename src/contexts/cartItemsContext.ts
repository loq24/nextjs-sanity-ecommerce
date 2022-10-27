import React from "react";
import { ACTIONTYPES } from "reducers/cart/reducer";
import { ProductSchema } from "lib/interfaces";

const CartContext = React.createContext<{
  dispatch: React.Dispatch<ACTIONTYPES>;
  cart: ProductSchema[];
}>({
  dispatch: () => null,
  cart: []
});

export default CartContext;
