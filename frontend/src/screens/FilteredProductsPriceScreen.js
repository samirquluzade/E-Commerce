import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  filterProductsBrandSort,
  filterProductsByItemPrice,
} from "../actions/ProductActions";

export default function FilteredProductsScreen(props) {
  const productMin = props.match.params.min;
  const productMax = props.match.params.max;
  const dispatch = useDispatch();
  const productCategory = props.match.params.category;
  const productCategoryBrand = props.match.params.brand;
  const productList = useSelector(state => state.filteredProductByPrice);

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(
      filterProductsByItemPrice(
        productCategory,
        productCategoryBrand,
        productMin,
        productMax
      )
    );
  }, [dispatch, productCategory, productCategoryBrand, productMin, productMax]);
  const sortByName = sort => {
    dispatch(
      filterProductsBrandSort(
        productCategory,
        productCategoryBrand,
        productMin,
        productMax,
        sort
      )
    );
    props.history.push(
      `/products/${productCategory}/${productCategoryBrand}/${productMin}&${productMax}/sort=${sort}`
    );
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox></MessageBox>
      ) : (
        <section class="section---1">
          <div class="container">
            <div class="category-title">
              <h3>Bütün məhsullar</h3>
            </div>
            <div class="category-search">
              <div class="row">
                <div class="col-md-3">
                  <div class="search-area">
                    <div class="category-name">
                      <h4>{productCategoryBrand}</h4>
                    </div>
                    <div class="line"></div>
                    <div class="sort-by">
                      <button onClick={() => sortByName("name")}>
                        Ada görə sırala (A-Z)
                      </button>
                      <button onClick={() => sortByName("price")}>
                        Ucuzdan bahaya sırala
                      </button>
                    </div>
                  </div>
                </div>
                {products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
