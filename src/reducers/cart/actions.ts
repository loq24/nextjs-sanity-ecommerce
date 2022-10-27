import Types from "./types";
import { ProductSchema } from "lib/interfaces";

export interface BulkAddAction {
  type: Types.bulkAdd;
  payload: ProductSchema[];
}

export interface AddToCartAction {
  type: Types.addToCart;
  payload: ProductSchema;
}

export interface RemoveSingleItemAction {
  type: Types.removeSingleItem;
  payload: string;
}

export interface RemoveWholeProduct {
  type: Types.removeWholeProduct;
  payload: string;
}

export interface RemoveAllItems {
  type: Types.removeAllItems;
}
