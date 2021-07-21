import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/CartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/OrderReducers";
import {
  filterProductsByItemPriceCategoryReducer,
  filterProductsByItemPriceReducer,
  filterProductsByItemReducer,
  filterProductsPriceReducer,
  filterProductsReducer,
  productDetailsReducer,
  productListReducer,
  SortProductsBrandReducer,
  SortProductsReducer,
} from "./reducers/ProductReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/UserReducers";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  ordersList: orderListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  filteredProducts: filterProductsReducer,
  filteredProductsById: filterProductsByItemReducer,
  filteredProductByPrice: filterProductsByItemPriceReducer,
  filteredProductByPriceCategory: filterProductsByItemPriceCategoryReducer,
  sortProductReducer: SortProductsReducer,
  sortProductsBrandReducer: SortProductsBrandReducer,
  filterProductsPrice: filterProductsPriceReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
