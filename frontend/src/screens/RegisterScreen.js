import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/UserActions";
import Swal from "sweetalert2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Xəta",
        text: "Şifrələr uyğun deyil.Yenidən cəhd edin!",
      });
    } else {
      dispatch(register(name, email, password, passwordConfirm));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <section className="menu-body">
      <div className="container text-center">
        <h2>Qeydiyyat</h2>
        <form className="form--signup" onSubmit={submitHandler}>
          {loading && <LoadingBox></LoadingBox>}
          {error && (
            <MessageBox variant="danger">
              Bu email ilə hesab mövcuddur.Başqa email istifadə edin!
            </MessageBox>
          )}
          <div className="form-group">
            <label className="form__label" htmlFor="name">
              Ad
            </label>
            <input
              type="text"
              id="name"
              className="form__input"
              placeholder="Adınız"
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              placeholder="you@example.com"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="password">
              Şifrə
            </label>
            <input
              type="password"
              id="password"
              className="form__input"
              placeholder="••••••••"
              required
              minlength="8"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="passwordConfirm">
              Şifrənin təkrarı
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="form__input"
              placeholder="••••••••"
              required
              minlength="8"
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button className="btn btn-success login__btn">
              Qeydiyyatdan keç
            </button>
          </div>
          <div className="form-group text-center">
            <label />
            <div>
              Hesabınız var?
              <Link to="/login">Daxil olun</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
