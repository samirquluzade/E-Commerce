import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/UserActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const user = useSelector(state => state.userLogin);
  const { userInfo, loading, error } = user;
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <section class="menu-body">
      <div class="container text-center">
        <h2>Hesaba daxil ol</h2>
        <form class="form--login" onSubmit={submitHandler}>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div class="form-group">
            <label class="form__label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              class="form__input"
              placeholder="you@example.com"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label class="form__label" htmlFor="password">
              Şifrə
            </label>
            <input
              type="password"
              id="password"
              class="form__input"
              placeholder="••••••••"
              required
              minlength="8"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group text-center">
            <label />
            <button type="submit" class="btn btn-success login__btn">
              Daxil ol
            </button>
          </div>
          <div class="form-group text-center">
            <label />
            <div>
              Yeni müştərisən?
              <Link to="/register">Qeydiyyatdan keç</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
