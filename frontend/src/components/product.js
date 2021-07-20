import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/CartActions";
export const Product = props => {
  const dispatch = useDispatch();
  const { product } = props;
  const addToCartHandler = () => {
    dispatch(addToCart(product._id, Number(1)));
  };
  return (
    <div
      className="col-md-4"
      key={product._id}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="card new-card text-center"
        style={{ background: "white", width: "300px" }}
      >
        <Link to={`/product/${product._id}`}>
          <div className="my-card">
            <img
              className="card-img-top"
              src={product.image}
              alt={product.name}
              style={{ height: "300px", marginTop: "5%" }}
            />
            <div className="card-body card-content">
              <h4
                className="card-title text-center"
                style={{ paddingTop: "10px", fontSize: "16px" }}
              >
                {product.name}
              </h4>
              {product.priceDiscount ? (
                <React.Fragment>
                  <h3 className="card-text text-center">
                    {product.priceDiscount}₼
                  </h3>
                </React.Fragment>
              ) : (
                <h3 className="card-text text-center">{product.price}₼</h3>
              )}
            </div>
          </div>
        </Link>
        <div className="d-flex justify-content-center text-center shop">
          <button className="btn btn-danger" onClick={addToCartHandler}>
            Səbətə əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
