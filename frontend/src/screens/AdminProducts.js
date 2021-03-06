import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Swal from "sweetalert2";
import { deleteProduct, listProducts } from "../actions/ProductActions";
import { PRODUCT_DETAILS_RESET } from "../constants/ProductConstants";

export default function AdminProducts(props) {
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { success: successDelete } = productDelete;
  let i = 1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    dispatch({ type: PRODUCT_DETAILS_RESET });
    return () => {};
  }, [dispatch, successDelete]);
  const removeFromListHandler = product => {
    Swal.fire({
      title: "Silmək istədiyinizdən əminsiniz?",
      text: "Məlumat sistemdən silinəcək",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sil",
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire("Silindi!", "Məlumat uğurla silindi.", "success");
        dispatch(deleteProduct(product._id));
      }
    });
  };
  const updateHandler = product => {
    props.history.push(`/product/${product._id}/edit`);
    window.location.reload();
  };
  const createHandler = () => {
    props.history.push("/product/create");
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox></MessageBox>
      ) : (
        <section className="section---1">
          <div
            className="category-title"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <h1>Bütün məhsullar</h1>
            <button
              type="button"
              className="btn btn-success"
              onClick={createHandler}
            >
              Yeni məhsul
            </button>
          </div>
          <div className="category-search">
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
                  <tr key={product._id}>
                    <th scope="row" className="text-center">
                      {i++}
                    </th>
                    <td>{product.image.substring(8, product.image.length)}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={e => updateHandler(product)}
                      >
                        Yenilə
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromListHandler(product)}
                      >
                        Sil
                      </button>
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
