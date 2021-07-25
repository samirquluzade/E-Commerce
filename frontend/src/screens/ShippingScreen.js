import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/CartActions";

export default function ShippingScreen(props) {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [name, setName] = useState(shippingAddress.name);
  const [surname, setSurname] = useState(shippingAddress.surname);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [city, setCity] = useState(shippingAddress.city);
  const [region, setRegion] = useState(shippingAddress.region);
  const [address, setAddress] = useState(shippingAddress.address);
  const [notes, setNotes] = useState(shippingAddress.notes);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    // dispatch save shipping address action
    dispatch(
      saveShippingAddress({
        name,
        surname,
        phone,
        city,
        region,
        address,
        notes,
      })
    );
    props.history.push("/placeorder");
  };
  return (
    <section className="menu-body">
      <div className="container text-center">
        <h2>Sifariş</h2>
        <form className="form--signup" onSubmit={submitHandler}>
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="surname">
              Soyad
            </label>
            <input
              type="text"
              id="surname"
              className="form__input"
              placeholder="Soyadınız"
              required
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="phone">
              Telefonunuz
            </label>
            <input
              type="tel"
              id="phone"
              className="form__input"
              placeholder="0551234567"
              required
              maxlength="10"
              minLength="10"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="city">
              Şəhər
            </label>
            <input
              type="text"
              id="city"
              className="form__input"
              placeholder="Şəhər"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="region">
              Rayon
            </label>
            <input
              type="text"
              id="region"
              className="form__input"
              placeholder="Rayon"
              value={region}
              onChange={e => setRegion(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="address">
              Ünvan
            </label>
            <input
              type="text"
              id="address"
              className="form__input"
              placeholder="Küç., bina,blok,mənzil,mərtəbə"
              value={address}
              required
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form__label" htmlFor="notes">
              Qeydləriniz
            </label>
            <textarea
              id="notes"
              className="form-control"
              placeholder="Qeydləriniz"
              rows="5"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group text-center">
            <button className="btn btn-success login__btn">
              Sifarişi tamamla
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
