import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/ProductActions";

export default function AdminProducts(props) {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  let i = 1;

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox></MessageBox>
      ) : (
        <section class="section---1">
          <div
            class="category-title"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h1>Bütün məhsullar</h1>
          </div>
          <div class="category-search">
            <table className="table text-center">
              <thead>
                <tr>
                  <th className="text-center" scope="col">
                    #
                  </th>
                  <th className="text-center" scope="col">
                    Şəkil
                  </th>
                  <th className="text-center" scope="col">
                    Başlıq
                  </th>
                  <th className="text-center" scope="col">
                    Qiymət
                  </th>
                  <th className="text-center" scope="col">
                    Yenilə
                  </th>
                  <th className="text-center" scope="col">
                    Sil
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr>
                    <th scope="row" className="text-center">
                      {i++}
                    </th>
                    <td>{product.image}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button className="btn btn-info">Yenilə</button>
                    </td>
                    <td>
                      <button className="btn btn-danger">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
