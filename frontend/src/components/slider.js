import React from "react";
export const Slider = () => {
  return (
    <section className="section--1">
      <div className="slider">
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/KH2021_071_Advertising_Single_posts_adi_post_web_cover-2.png`}
              alt="macbook"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/KH2021_071_Advertising_Single_posts_adi_post_web_cover.png`}
              alt="iphone"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/KH2021_meiset_az_cover_700x380.png`}
              alt="samsung"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/KH2021_samsung-galaxy-a12_700x380.png`}
              alt="acer"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/KH2021_televizor_az_cover_700x380.png`}
              alt="xiaomi"
            />
          </div>
        </div>
        <button className="slider__btn slider__btn--left">←</button>
        <button className="slider__btn slider__btn--right">→</button>
        <div className="dots"></div>
      </div>
    </section>
  );
};
export default Slider;
