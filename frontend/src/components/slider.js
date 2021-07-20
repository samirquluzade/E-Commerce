import React from "react";
export const Slider = () => {
  return (
    <section className="section--1">
      <div className="slider">
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/mref2-1-1_1-removebg-preview.png`}
              alt="macbook"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/iphone11_black-1-removebg-preview.png`}
              alt="iphone"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/m3_black-1-removebg-preview.png`}
              alt="samsung"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/acer-aspire-3-a315-34-c3pr-nxhe3er00n_1-1-removebg-preview.png`}
              alt="acer"
            />
          </div>
        </div>
        <div className="slide slide--1">
          <div className="images">
            <img
              src={`./images/a217_blue-1-removebg-preview.png`}
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
