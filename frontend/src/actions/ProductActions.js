import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_FILTER_FAIL,
  PRODUCT_FILTER_BY_ITEM_REQUEST,
  PRODUCT_FILTER_BY_ITEM_SUCCESS,
  PRODUCT_FILTER_BY_ITEM_FAIL,
  PRODUCT_FILTER_BY_PRICE_REQUEST,
  PRODUCT_FILTER_BY_PRICE_SUCCESS,
  PRODUCT_FILTER_BY_PRICE_FAIL,
  PRODUCT_FILTER_BY_PRICE_CATEGORY_REQUEST,
  PRODUCT_FILTER_BY_PRICE_CATEGORY_SUCCESS,
  PRODUCT_FILTER_BY_PRICE_CATEGORY_FAIL,
  PRODUCT_SORT_BY_NAME_CATEGORY_REQUEST,
  PRODUCT_SORT_BY_NAME_CATEGORY_SUCCESS,
  PRODUCT_SORT_BY_NAME_CATEGORY_FAIL,
} from "../constants/ProductConstants";

export const listProducts = () => async dispatch => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};
export const filterProducts = products => async dispatch => {
  dispatch({
    type: PRODUCT_FILTER_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/products/${products}`);
    dispatch({ type: PRODUCT_FILTER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_FILTER_FAIL, payload: err.message });
  }
};
export const filterProductsByItem = (products, filter) => async dispatch => {
  dispatch({
    type: PRODUCT_FILTER_BY_ITEM_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `/api/products/products/${products}/${filter}`
    );
    dispatch({ type: PRODUCT_FILTER_BY_ITEM_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_FILTER_BY_ITEM_FAIL, payload: err.message });
  }
};
export const filterProductsByItemPriceCategory =
  (products, max, min) => async dispatch => {
    dispatch({
      type: PRODUCT_FILTER_BY_PRICE_CATEGORY_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products/products/${products}/${max}&${min}`
      );
      dispatch({
        type: PRODUCT_FILTER_BY_PRICE_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_FILTER_BY_PRICE_CATEGORY_FAIL,
        payload: err.message,
      });
    }
  };
export const filterProductsByItemPrice =
  (products, filter, min, max) => async dispatch => {
    dispatch({
      type: PRODUCT_FILTER_BY_PRICE_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products/products/${products}/${filter}/${min}&${max}`
      );
      dispatch({ type: PRODUCT_FILTER_BY_PRICE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_FILTER_BY_PRICE_FAIL, payload: err.message });
    }
  };
export const filterProductsSort =
  (products, min, max, sort) => async dispatch => {
    dispatch({
      type: PRODUCT_SORT_BY_NAME_CATEGORY_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products/products/${products}/${min}&${max}/sort=${sort}`
      );
      dispatch({ type: PRODUCT_SORT_BY_NAME_CATEGORY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_SORT_BY_NAME_CATEGORY_FAIL,
        payload: err.message,
      });
    }
  };
export const filterProductsBrandSort =
  (productsCategory, productsBrand, min, max, sort) => async dispatch => {
    dispatch({
      type: PRODUCT_SORT_BY_NAME_CATEGORY_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products/products/${productsCategory}/${productsBrand}/${min}&${max}/sort=${sort}`
      );
      dispatch({ type: PRODUCT_SORT_BY_NAME_CATEGORY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCT_SORT_BY_NAME_CATEGORY_FAIL,
        payload: err.message,
      });
    }
  };
export const detailsProduct = productID => async dispatch => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productID,
  });
  try {
    const { data } = await axios.get(`/api/products/${productID}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
