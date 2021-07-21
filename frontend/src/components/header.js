import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/UserActions";
export const Header = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const user = useSelector(state => state.userLogin);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <input type="checkbox" id="check" />
      <label for="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <Link
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img
          className="logo"
          src="/images/1_6jjSw8IqGbsPZp7L_43YyQ.png"
          alt="logo"
        />
      </Link>
      <nav>
        <ul className="nav__links">
          <li>
            <Link to="/products/Telephone">
              Telefonlar <i className="fas fa-caret-down"></i>
            </Link>
            <ul>
              <li>
                <Link to="/products/Telephone/Iphone">APPLE</Link>
              </li>
              <li>
                <Link to="/products/Telephone/Samsung">SAMSUNG</Link>
              </li>
              <li>
                <Link to="/products/Telephone/Xiaomi">XIAOMI</Link>
              </li>
              <li>
                <Link to="/products/Telephone/Honor">HONOR</Link>
              </li>
              <li>
                <Link to="/products/Telephone/Oneplus">ONEPLUS</Link>
              </li>
              <li>
                <Link to="/products/Telephone/Nokia">NOKIA</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/products/Computer">
              Kompüterlər <i className="fas fa-caret-down"></i>
            </Link>
            <ul>
              <li>
                <Link to="/products/Computer/MacBook">APPLE</Link>
              </li>
              <li>
                <Link to="/products/Computer/VivoBook">ASUS</Link>
              </li>
              <li>
                <Link to="/products/Computer/Dell">DELL</Link>
              </li>
              <li>
                <Link to="/products/Computer/Hp">HP</Link>
              </li>
              <li>
                <Link to="/products/Computer/Aspire">ACER</Link>
              </li>
              <li>
                <Link to="/products/Computer/IdeaPad">LENOVO</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/" onClick={() => window.location.reload()}>
              Saatlar <i className="fas fa-caret-down"></i>
            </Link>
            <ul>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  APPLE
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  HUAWEI
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  XIAOMI
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  SAMSUNG
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  CASIO
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  EDIFICE
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/products/TV">
              Televizorlar <i className="fas fa-caret-down"></i>
            </Link>
            <ul>
              <li>
                <Link to="/products/TV/Smart">LG</Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  Samsung
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  TOSHIBA
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  XIAOMI
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  SONY
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  SKYWORTH
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/" onClick={() => window.location.reload()}>
              Fotoaparatlar <i className="fas fa-caret-down"></i>
            </Link>
            <ul>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  CANON
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  FUJFILM
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => window.location.reload()}>
                  SONY
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Link to="/cart">
        <i className="fas fa-shopping-basket basket">
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </i>
      </Link>
      {userInfo && !userInfo.isAdmin ? (
        <div
          className="dropdown"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link
            to="#"
            style={{ marginRight: "10px" }}
            className="dropdown-toggle"
            id="dropdownmenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
          </Link>
          <div className="dropdown-menu" aria-labelledby="dropdownmenu2">
            <Link className="dropdown-item" to="/profile">
              Tənzimləmələr
            </Link>
            <br />
            <Link className="dropdown-item" to="/orderhistory">
              Sifariş tarixçəsi
            </Link>
          </div>
          <Link to="/" onClick={logoutHandler} className="cta">
            <button className="btn btn-danger">Çıxış</button>
          </Link>
        </div>
      ) : userInfo && userInfo.isAdmin ? (
        <div
          className="dropdown"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link
            to="#"
            style={{ marginRight: "10px" }}
            className="dropdown-toggle"
            id="dropdownmenu3"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Admin <i className="fa fa-caret-down"></i>
          </Link>
          <div className="dropdown-menu" aria-labelledby="dropdownmenu3">
            <Link className="dropdown-item" to="/productlist">
              Məhsullar
            </Link>
            <br />
            <Link className="dropdown-item" to="/orderslist">
              Sifarişlər
            </Link>
            <br />
            <Link className="dropdown-item" to="/userlist">
              İstifadəçilər
            </Link>
          </div>
          <Link to="/" onClick={logoutHandler} className="cta">
            <button className="btn btn-danger">Çıxış</button>
          </Link>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link className="cta" to="/register">
            <button>Qeydiyyat</button>
          </Link>
          <Link className="cta" to="/login">
            <button>Daxil ol</button>
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
