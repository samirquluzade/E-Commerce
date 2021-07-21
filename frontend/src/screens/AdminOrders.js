import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/OrderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function AdminOrders(props) {
  const dispatch = useDispatch();
  const orderslist = useSelector(state => state.ordersList);
  let i = 1;

  const { loading, error, orders } = orderslist;
  useEffect(() => {
    dispatch(listOrders());
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
                    Yenilə
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
                    <td>
                      {order.isPaid
                        ? order.paidAt.substring(0, 10)
                        : "Ödənilmədi"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "Göndərilmədi"}
                    </td>
                    <td>
                      <button className="btn btn-primary">Ətraflı</button>
                    </td>
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
