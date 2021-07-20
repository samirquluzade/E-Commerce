import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/OrderActions";
import Swal from "sweetalert2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderScreen(props) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const orderId = props.match.params.id;
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector(state => state.orderPay);
  const { success: successPay } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || (order && order._id !== orderId) || successPay) {
      // dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [orderId, dispatch, order]);

  const successPaymentHandler = e => {
    e.preventDefault();
    dispatch(payOrder(order));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ödəniş uğurla keçdi",
      showConfirmButton: false,
      timer: 2500,
    });
    window.location.reload();
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="general_order">
      <div className="col-lg-7 col-md-12">
        <div className="checkout_order">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Sifariş № {order._id}</h2>
                <p>
                  <strong>Ad:</strong> {order.shippingAddress.name}
                  <br />
                  <strong>Soyad:</strong> {order.shippingAddress.surname}
                  <br />
                  <strong>Telefon:</strong> {order.shippingAddress.phone}
                  <br />
                  <strong>Ünvan:</strong> {order.shippingAddress.address}
                  <br />
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Sifariş alındı {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Göndərilmədi</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Sifariş ediləcək məhsullar</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "5%",
                  }}
                >
                  {order.orderItems.map(item => (
                    <li key={item.product}>
                      <div className="row shop-cart">
                        <div className="col-md-4 col-3">
                          <img src={item.image} alt={item.name}></img>
                        </div>
                        <div className="col-md-4 col-2">
                          <Link
                            to={`/product/${item.product}`}
                            className="product_name"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-md-4 col-2">
                          {item.qty} x {item.price}₼ = {item.qty * item.price}₼
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-lg-5 col-md-12 place_order">
        <div className="card card-body">
          <ul>
            <p>
              <h1>Sifarişin məzmunu</h1>
              <strong>Məhsullar:</strong>&nbsp;&nbsp;&nbsp;{" "}
              {order.itemsPrice.toFixed(2)}₼
              <br />
              <strong>Vergi:</strong>&nbsp;&nbsp;&nbsp;{" "}
              {order.taxPrice.toFixed(2)}₼
              <br />
              <strong>Ümumi qiymət:</strong> &nbsp;&nbsp;&nbsp;
              {order.totalPrice.toFixed(2)}
              ₼
              <br />
            </p>
          </ul>
        </div>
        {!order.isPaid && (
          <div className="credit-card">
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
            />
            <form onSubmit={successPaymentHandler}>
              <input
                type="tel"
                name="number"
                placeholder="Kartın nömrəsi"
                value={number}
                onChange={e => setNumber(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
                required
                maxLength="16"
                minLength="16"
              />
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
                required
              />
              <input
                type="tel"
                name="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
                required
                maxLength="4"
                minLength="4"
              />
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={cvc}
                onChange={e => setCvc(e.target.value)}
                onFocus={e => setFocus(e.target.name)}
                required
                maxLength="3"
                minLength="3"
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ fontSize: "18px" }}
              >
                Ödə
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
