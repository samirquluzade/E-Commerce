import React from "react";
export const Product = props => {
  const { product } = props;
  return (
    <div
      className="col-md-4"
      key={product._id}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <a href={`/product/${product._id}`}>
        <div
          className="card new-card text-center"
          style={{ background: "white" }}
        >
          <img
            className="card-img-top"
            src={product.image}
            alt={product.name}
            style={{ height: "300px", marginTop: "5%" }}
          />
          <div className="card-body card-content">
            <h4
              className="card-title text-center"
              style={{ paddingTop: "10px" }}
            >
              {product.name}
            </h4>

            <h3 className="card-text text-center">
              <del>{product.price}₼</del>
            </h3>
            <h3 className="card-text text-center">{product.priceDiscount}₼</h3>
            <div className="d-flex justify-content-center text-center shop">
              <button className="btn btn-danger">Səbətə əlavə et</button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
export default Product;
