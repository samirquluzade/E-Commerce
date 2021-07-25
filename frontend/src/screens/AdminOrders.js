import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/OrderActions";
import Swal from "sweetalert2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DETAILS_RESET } from "../constants/OrderConstants";

export default function AdminOrders(props) {
  const orderslist = useSelector(state => state.ordersList);
  const { loading, error, orders } = orderslist;

  const orderDelete = useSelector(state => state.orderDelete);
  const { success: successDelete } = orderDelete;
  let i = 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    dispatch({ type: ORDER_DETAILS_RESET });
    return () => {};
  }, [dispatch, successDelete]);
  const removeFromListHandler = order => {
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
        dispatch(deleteOrder(order._id));
      }
    });
  };
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
            <h1>Bütün sifarişlər</h1>
          </div>
          <div class="category-search">
            <table className="table text-center">
              <thead>
                <tr>
                  <th className="text-center" scope="col">
                    #
                  </th>
                  <th className="text-center" scope="col">
                    Tarix
                  </th>
                  <th className="text-center" scope="col">
                    Cəm
                  </th>
                  <th className="text-center" scope="col">
                    Ödəniş
                  </th>
                  <th className="text-center" scope="col">
                    Göndərildi
                  </th>
                  <th className="text-center" scope="col">
                    Ətraflı
                  </th>
                  <th className="text-center" scope="col">
                    Sil
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <th scope="row" className="text-center">
                      {i++}
                    </th>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? order.paidAt : "Ödənilmədi"}</td>
                    <td>
                      {order.isDelivered ? order.deliveredAt : "Göndərilmədi"}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          props.history.push(`/order/${order._id}`)
                        }
                      >
                        Ətraflı
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromListHandler(order)}
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
