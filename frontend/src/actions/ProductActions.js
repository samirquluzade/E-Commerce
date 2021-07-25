import axios from "axios";
import Swal from "sweetalert2";
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
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
} from "../constants/ProductConstants";

export const listProducts = () => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/products", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });
  }
};
export const homeProducts = () => async dispatch => {
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
export const deleteProduct = productId => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
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

export const createProduct =
  (
    name,
    category,
    image,
    price,
    priceDiscount,
    brand,
    MP,
    RAM,
    OS,
    INCH,
    mAH,
    memory,
    screen,
    SIM,
    images
  ) =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const { data } = await axios.post(
        `/api/products`,
        {
          name,
          category,
          image,
          price,
          priceDiscount,
          brand,
          MP,
          RAM,
          OS,
          INCH,
          mAH,
          memory,
          screen,
          SIM,
          images,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Uğurla məhsul əlavə edildi!",
        showConfirmButton: false,
        timer: 2000,
      }).then(function () {
        dispatch({
          type: PRODUCT_CREATE_SUCCESS,
          payload: data.product,
          success: true,
        });
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
