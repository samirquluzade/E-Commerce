import React from "react";
export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div className="row">
            <div className="col-md-12 text-center">
              <b style={{ fontSize: "24px", color: "black" }}>Mənimlə əlaqə</b>
              <ul>
                <li>
                  <i
                    className="fab fa-facebook"
                    style={{ color: "#139EF8" }}
                  ></i>
                  <a
                    href="https://www.facebook.com/samirquluzadeh2001"
                    alt="Samir Quluzadeh facebook"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <i
                    className="fab fa-instagram"
                    style={{ color: "maroon" }}
                  ></i>
                  <a
                    href="https://www.instagram.com/samirquluzadeh/"
                    alt="Samir Quluzadeh instagram"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <i className="fab fa-whatsapp" style={{ color: "green" }}></i>
                  <a href="https://api.whatsapp.com/send?phone=0558735810&text=Salam">
                    Whatsapp
                  </a>
                </li>
                <li>
                  <i
                    className="fab fa-telegram"
                    style={{ color: "#33ABE0" }}
                  ></i>
                  <a href="https://t.me/samirquluzadeh">Telegram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
