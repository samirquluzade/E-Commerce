import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFİLE_REQUEST,
  USER_UPDATE_PROFİLE_FAIL,
  USER_UPDATE_PROFİLE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/UserConstants";
import Swal from "sweetalert2";

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Uğurla qeydiyyatdan keçdiniz!",
      showConfirmButton: false,
      timer: 2000,
    }).then(function () {
      window.location = "/";
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const login = (email, password) => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Hesaba uğurla daxil oldunuz!",
      showConfirmButton: false,
      timer: 1500,
    }).then(function () {
      window.location = "/";
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Email və ya şifrə səhvdir.Yenidən cəhd edin.",
    });
  }
};
export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  window.location.reload();
  dispatch({ type: USER_LOGOUT });
};

export const detailsUser = userId => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};
export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};
export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });

    const {
      userLogin: {
        userInfo: { token },
      },
    } = getState();

    const { data } = await axios.put(`/api/users/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteUser = userId => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const { data } = await axios.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserProfile = user => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFİLE_REQUEST, payload: user });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFİLE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({ type: USER_UPDATE_PROFİLE_FAIL, payload: message });
  }
};
