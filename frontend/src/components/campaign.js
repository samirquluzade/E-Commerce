import React, { useEffect } from "react";
import axios from "axios";
import { Product } from "./product";
import { LoadingBox } from "./LoadingBox";
import { MessageBox } from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";

export const Campaign = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <section className="section--2">
          <div className="container">
            <div className="search">
              <input
                type="search"
                className="form-control"
                placeholder="Axtar..."
              />
            </div>
            <div className="campaign">
              <div className="section-title">
                <h3>Kampaniyalar</h3>
              </div>
              <div className="campaign-cards">
                <div className="row">
                  {products.map(product =>
                    product.priceDiscount ? (
                      <Product key={product._id} product={product} />
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="offers text-center">
              <a href="#">Bütün təkliflərə bax</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default Campaign;
