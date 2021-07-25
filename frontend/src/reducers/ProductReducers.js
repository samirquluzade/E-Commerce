import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_FILTER_BY_ITEM_FAIL,
  PRODUCT_FILTER_BY_ITEM_REQUEST,
  PRODUCT_FILTER_BY_ITEM_SUCCESS,
  PRODUCT_FILTER_BY_PRICE_CATEGORY_FAIL,
  PRODUCT_FILTER_BY_PRICE_CATEGORY_REQUEST,
  PRODUCT_FILTER_BY_PRICE_CATEGORY_SUCCESS,
  PRODUCT_FILTER_BY_PRICE_FAIL,
  PRODUCT_FILTER_BY_PRICE_REQUEST,
  PRODUCT_FILTER_BY_PRICE_SUCCESS,
  PRODUCT_FILTER_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_PRICE_FILTER_FAIL,
  PRODUCT_LIST_PRICE_FILTER_REQUEST,
  PRODUCT_LIST_PRICE_FILTER_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SORT_BY_NAME_CATEGORY_FAIL,
  PRODUCT_SORT_BY_NAME_CATEGORY_REQUEST,
  PRODUCT_SORT_BY_NAME_CATEGORY_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/ProductConstants";

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const filterProductsReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTER_REQUEST:
      return { loading: true };
    case PRODUCT_FILTER_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const SortProductsReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SORT_BY_NAME_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_SORT_BY_NAME_CATEGORY_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_SORT_BY_NAME_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const SortProductsBrandReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SORT_BY_NAME_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_SORT_BY_NAME_CATEGORY_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_SORT_BY_NAME_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const filterProductsByItemReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTER_BY_ITEM_REQUEST:
      return { loading: true };
    case PRODUCT_FILTER_BY_ITEM_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_FILTER_BY_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const filterProductsByItemPriceReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTER_BY_PRICE_REQUEST:
      return { loading: true };
    case PRODUCT_FILTER_BY_PRICE_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_FILTER_BY_PRICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const filterProductsByItemPriceCategoryReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTER_BY_PRICE_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_FILTER_BY_PRICE_CATEGORY_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_FILTER_BY_PRICE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const filterProductsPriceReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_PRICE_FILTER_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_PRICE_FILTER_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_PRICE_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
