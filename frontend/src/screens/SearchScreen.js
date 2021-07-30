import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../actions/ProductActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/product";

export default function SearchScreen(props) {
  const key = props.match.params.search;
  const productList = useSelector(state => state.searchProduct);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct(key));
  }, [dispatch, key]);
  return (
    <div className="searchs">
      <div className="container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
