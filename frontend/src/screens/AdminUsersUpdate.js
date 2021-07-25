import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { updateUser, detailsUser } from "../actions/UserActions";
import { USER_UPDATE_RESET } from "../constants/UserConstants";

export default function AdminUsersUpdate(props) {
  const userId = props.match.params.id;
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetails;

  useEffect(() => {
    console.log(user);
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push(`/userslist`);
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setId(user._id);
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }

    return () => {};
  }, [user, successUpdate, dispatch, props.history, userId]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        isAdmin,
      })
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>İstifadəçi idarəetmə</h1>
        </div>

        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {user && (
          <>
            <div className="inputs">
              <label htmlFor="name">Ad</label>
              <input
                className="form-control"
                id="name"
                type="text"
                placeholder="Ad daxil edin"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="Email daxil edin"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="isAdmin">Rol</label>
              <input
                className="form-control"
                id="isAdmin"
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <div />
              <div>
                <button
                  onClick={() => props.history.push("/userlist")}
                  type="button"
                  className="btn btn-danger"
                >
                  Back
                </button>{" "}
                <button className="btn btn-success" type="submit">
                  Update
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
