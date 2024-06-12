import { combineReducers } from "redux";
import { FacilitesReducer } from "./facilites.reduces";
import { shopReducer } from "./shop.reduces";
import { ReviewReducer } from "./review.reduces";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";
import coupanSlice from "../slice/coupan.slice";
import { categoriesReducer } from "./category.reducer";
import subCategorySlice from "../slice/subCategory.slice";
import { productsReducer } from "./product.reduces";

export const RootReducer = combineReducers({
    facilites : FacilitesReducer,
    products : productsReducer,
    shops : shopReducer,
    Review : ReviewReducer,
    counter : counterSlice,
    cart : cartSlice,
    coupon : coupanSlice,
    categories: categoriesReducer,
    subcategories : subCategorySlice
})