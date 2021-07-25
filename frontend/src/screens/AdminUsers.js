import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/UserActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Swal from "sweetalert2";
import { USER_DETAILS_RESET } from "../constants/UserConstants";

export default function AdminUsers(props) {
  const usersList = useSelector(state => state.usersList);
  const { loading, error, users } = usersList;

  const deletedUser = useSelector(state => state.userDelete);
  const { success: successDelete } = deletedUser;
  let i = 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
    return () => {};
  }, [dispatch, successDelete]);
  const removeFromListHandler = user => {
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
        dispatch(deleteUser(user._id));
      }
    });
  };
  const updateHandler = user => {
    props.history.push(`/user/${user._id}/edit`);
    window.location.reload();
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
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h1>Bütün istifadəçilər</h1>
          </div>
          <div className="category-search">
            <table className="table text-center">
              <thead>
                <tr>
                  <th className="text-center" scope="col">
                    #
                  </th>
                  <th className="text-center" scope="col">
                    Ad
                  </th>
                  <th className="text-center" scope="col">
                    Email
                  </th>
                  <th className="text-center" scope="col">
                    Rol
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
                {users.map(user => (
                  <tr key={user._id}>
                    <th scope="row" className="text-center">
                      {i++}
                    </th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateHandler(user)}
                      >
                        Yenilə
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromListHandler(user)}
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
