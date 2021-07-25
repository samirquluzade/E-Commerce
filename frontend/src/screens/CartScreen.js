import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/CartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productID = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    props.history.push("/shipping");
  };
  return (
    <div className="cart">
      <div className="container">
        <h1 className="text-center">Kart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>Kart boşdur.</MessageBox>
        ) : (
          <ul style={{ display: "flex", flexDirection: "column" }}>
            {cartItems.map(item => (
              <li key={item.product}>
                <div className="row shop-cart">
                  <div className="col-md-3 col-3">
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <div className="col-md-2 col-2">
                    <Link
                      to={`/product/${item.product}`}
                      className="product_name"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div
                    className="col-md-2 col-2 cart-select"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <select
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      className="form-control"
                    >
                      {numbers.map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 col-2">{item.price}₼</div>
                  <div className="col-md-2 col-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <div className="order">
              <div className="price">
                Ümumi ({cartItems.reduce((a, c) => a + c.qty, 0)} ədəd) : &nbsp;
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}₼
              </div>
              <div className="order_button">
                <button
                  type="button"
                  onClick={checkOutHandler}
                  className="btn btn-warning"
                  disabled={cartItems.length === 0}
                >
                  Sifariş et
                </button>
              </div>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
