import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  filterProducts,
  filterProductsByItemPriceCategory,
  filterProductsSort,
} from "../actions/ProductActions";

export default function AllProductsScreen(props) {
  const [minPrice, minSetPrice] = useState("");
  const [maxPrice, maxSetPrice] = useState("");
  const dispatch = useDispatch();
  const productCategory = props.match.params.category;
  const productList = useSelector(state => state.filteredProducts);

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(filterProducts(productCategory));
  }, [dispatch, productCategory]);
  const filterPrice = (minPrice, maxPrice) => {
    filterProductsByItemPriceCategory(productCategory, minPrice, maxPrice);
    props.history.push(`/products/${productCategory}/${minPrice}&${maxPrice}`);
  };
  const sortByName = sort => {
    dispatch(filterProductsSort(productCategory, sort));
    props.history.push(`/products/${productCategory}/sort=${sort}`);
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
              <div class="col-md-3">
                <div class="search-area">
                  <div class="line"></div>
                  <div class="price-range">
                    <h4>Qiymət</h4>
                    <div class="range">
                      <input
                        type="number"
                        class="form-control"
                        onChange={e => minSetPrice(e.target.value)}
                      />
                      &nbsp;
                      <div class="bold-line"></div>&nbsp;
                      <input
                        type="number"
                        class="form-control"
                        onChange={e => maxSetPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <button onClick={() => filterPrice(minPrice, maxPrice)}>
                    Axtar
                  </button>
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
        </section>
      )}
    </div>
  );
}
