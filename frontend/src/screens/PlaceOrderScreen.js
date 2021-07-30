import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/OrderActions";
import { ORDER_CREATE_RESET } from "../constants/OrderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = num => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.taxPrice = toPrice(0.05 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, order, props.history, dispatch]);
  return (
    <div className="general_order">
      <div className="col-lg-7 col-md-12">
        <div className="checkout_order">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Göndəriləcək ünvan</h2>
                <p>
                  <strong>Ad:</strong> {cart.shippingAddress.name}
                  <br />
                  <strong>Soyad:</strong> {cart.shippingAddress.surname}
                  <br />
                  <strong>Telefon:</strong> {cart.shippingAddress.phone}
                  <br />
                  <strong>Ünvan:</strong> {cart.shippingAddress.address}
                  <br />
                </p>
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
                  {cart.cartItems.map(item => (
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
              {cart.itemsPrice.toFixed(2)}₼
              <br />
              <strong>Vergi:</strong>&nbsp;&nbsp;&nbsp;{" "}
              {cart.taxPrice.toFixed(2)}₼
              <br />
              <strong>Ümumi qiymət:</strong> &nbsp;&nbsp;&nbsp;
              {cart.totalPrice.toFixed(2)}
              ₼
              <br />
            </p>
            <li>
              <button
                type="button"
                onClick={placeOrderHandler}
                className="btn btn-primary"
                style={{ fontSize: "20px" }}
                disabled={cart.cartItems.length === 0}
              >
                Sifarişi təsdiqlə
              </button>
            </li>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </ul>
        </div>
      </div>
    </div>
  );
}
