import React, { useEffect, useState } from "react";
import { Product } from "./product";
import { LoadingBox } from "./LoadingBox";
import { useHistory } from "react-router-dom";
import { MessageBox } from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { homeProducts, searchProduct } from "../actions/ProductActions";
import { Link } from "react-router-dom";

export default function Campaign(props) {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(homeProducts());
  }, [dispatch]);
  const searchHandler = e => {
    e.preventDefault();
    history.push(`/search=${inputValue}`);
    dispatch(searchProduct(inputValue));
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <section className="section--2" style={{ marginTop: "5%" }}>
          <div className="container">
            <div className="search">
              <input
                type="search"
                className="form-control search-input"
                placeholder="Axtar..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
              <button className="btn btn-primary" onClick={searchHandler}>
                Axtar
              </button>
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
              <Link to="/products/Telephone">Bütün məhsullara bax</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
