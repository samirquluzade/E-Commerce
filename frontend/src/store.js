import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/CartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from "./reducers/OrderReducers";
import {
  createProductReducer,
  filterProductsByItemPriceCategoryReducer,
  filterProductsByItemPriceReducer,
  filterProductsByItemReducer,
  filterProductsPriceReducer,
  filterProductsReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  searchProductReducer,
  SortProductsBrandReducer,
  SortProductsReducer,
} from "./reducers/ProductReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
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
  productCreate: createProductReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  searchProduct: searchProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderDelete: orderDeleteReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  ordersList: orderListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  filteredProducts: filterProductsReducer,
  filteredProductsById: filterProductsByItemReducer,
  filteredProductByPrice: filterProductsByItemPriceReducer,
  filteredProductByPriceCategory: filterProductsByItemPriceCategoryReducer,
  sortProductReducer: SortProductsReducer,
  sortProductsBrandReducer: SortProductsBrandReducer,
  filterProductsPrice: filterProductsPriceReducer,
  usersList: userListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
