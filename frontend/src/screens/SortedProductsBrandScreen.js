import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { filterProductsBrandSort } from "../actions/ProductActions";

export default function SortedProductsScreen(props) {
  const min = props.match.params.min;
  const max = props.match.params.max;
  const sort = props.match.params.sort;
  const dispatch = useDispatch();
  const productCategory = props.match.params.category;
  const productCategoryBrand = props.match.params.brand;
  const productList = useSelector(state => state.sortProductsBrandReducer);

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(
      filterProductsBrandSort(
        productCategory,
        productCategoryBrand,
        min,
        max,
        sort
      )
    );
  }, [dispatch, productCategoryBrand, productCategory, min, max, sort]);
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
              <h3 className="text-center">Bütün məhsullar</h3>
            </div>
            <div class="category-search">
              {/* <div class="row"> */}
              {products.map(product => (
                <Product key={product._id} product={product} />
              ))}
              {/* </div> */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
