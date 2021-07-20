import React from "react";
export const Header = () => {
  return (
    <header>
      <input type="checkbox" id="check" />
      <label for="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <a href="/">
        <img
          className="logo"
          src="/images/1_6jjSw8IqGbsPZp7L_43YyQ.png"
          alt="logo"
        />
      </a>
      <nav>
        <ul className="nav__links">
          <li>
            <a href="#">
              Telefonlar <i className="fas fa-caret-down"></i>
            </a>
            <ul>
              <li>
                <a href="#">APPLE</a>
              </li>
              <li>
                <a href="#">SAMSUNG</a>
              </li>
              <li>
                <a href="#">XIAOMI</a>
              </li>
              <li>
                <a href="#">HONOR</a>
              </li>
              <li>
                <a href="#">ONEPLUS</a>
              </li>
              <li>
                <a href="#">NOKIA</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              Kompüterlər <i className="fas fa-caret-down"></i>
            </a>
            <ul>
              <li>
                <a href="#">APPLE</a>
              </li>
              <li>
                <a href="#">ASUS</a>
              </li>
              <li>
                <a href="#">DELL</a>
              </li>
              <li>
                <a href="#">HP</a>
              </li>
              <li>
                <a href="#">ACER</a>
              </li>
              <li>
                <a href="#">LENOVO</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              Saatlar <i className="fas fa-caret-down"></i>
            </a>
            <ul>
              <li>
                <a href="#">APPLE</a>
              </li>
              <li>
                <a href="#">HUAWEI</a>
              </li>
              <li>
                <a href="#">XIAOMI</a>
              </li>
              <li>
                <a href="#">SAMSUNG</a>
              </li>
              <li>
                <a href="#">CASIO</a>
              </li>
              <li>
                <a href="#">EDIFICE</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              Televizorlar <i className="fas fa-caret-down"></i>
            </a>
            <ul>
              <li>
                <a href="#">Samsung</a>
              </li>
              <li>
                <a href="#">LG</a>
              </li>
              <li>
                <a href="#">TOSHIBA</a>
              </li>
              <li>
                <a href="#">XIAOMI</a>
              </li>
              <li>
                <a href="#">SONY</a>
              </li>
              <li>
                <a href="#">SKYWORTH</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              Fotoaparatlar <i className="fas fa-caret-down"></i>
            </a>
            <ul>
              <li>
                <a href="#">CANON</a>
              </li>
              <li>
                <a href="#">FUJFILM</a>
              </li>
              <li>
                <a href="#">SONY</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <i className="fas fa-shopping-basket basket">
        <span>3</span>
      </i>
      <div className="auth-buttons">
        <a className="cta" href="#">
          <button>Qeydiyyat</button>
        </a>
        <a className="cta" href="#">
          <button>Daxil ol</button>
        </a>
      </div>
    </header>
  );
};
export default Header;
