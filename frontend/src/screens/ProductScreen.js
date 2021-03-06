import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/CartActions";
import { detailsProduct } from "../actions/ProductActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productID = props.match.params.id;
  console.log(productID);
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productID));
  }, [dispatch, productID]);

  const addToCartHandler = () => {
    dispatch(addToCart(productID, Number(qty)));
  };
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <section class="section-1">
          <div class="container">
            <div
              class="product"
              style={{ marginTop: "7%", marginBottom: "3%" }}
            >
              <div class="product-title">
                <h3>{product.name}</h3>
              </div>
              <div class="product-detail">
                <div class="row">
                  <div
                    class="col-md-5"
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={product.image} alt="products" />
                    {/* <img src= */}
                  </div>
                  <div class="col-md-5 text-center" style={{ marginTop: "1%" }}>
                    <div
                      class="properties"
                      style={{
                        marginTop: "1%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {product.category === "Computer" && (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <h4>
                            <strong>Prosessor:</strong>&nbsp;{product.MP}
                          </h4>
                          <h4>
                            <strong>RAM:</strong>&nbsp;{product.RAM}
                          </h4>
                          <h4>
                            <strong>??m??liyyat sistemi:</strong>&nbsp;
                            {product.OS}
                          </h4>
                          <h4>
                            <strong>??nch(dy??m):</strong>&nbsp;{product.INCH}
                          </h4>
                          <h4>
                            <strong>USB:</strong>&nbsp;{product.mAH}
                          </h4>
                          <h4>
                            <strong>Yadda??:</strong>&nbsp;{product.memory}
                          </h4>
                          <h4>
                            <strong>Ekran:</strong>&nbsp;{product.screen}
                          </h4>
                          <h4>
                            <strong>N??v?? say??:</strong>&nbsp;{product.SIM}
                          </h4>
                          <h4>
                            <strong>Qiym??t:</strong>
                            <br />
                            <h3>
                              {product.priceDiscount
                                ? `${product.priceDiscount}???`
                                : `${product.price}???`}
                            </h3>
                          </h4>
                        </div>
                      )}
                      {product.category === "Telephone" && (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <h4>
                            <strong>MP:</strong>&nbsp;{product.MP}
                          </h4>
                          <h4>
                            <strong>RAM:</strong>&nbsp;{product.RAM}
                          </h4>
                          <h4>
                            <strong>??m??liyyat sistemi:</strong>&nbsp;
                            {product.OS}
                          </h4>
                          <h4>
                            <strong>??nch(dy??m):</strong>&nbsp;{product.INCH}
                          </h4>
                          <h4>
                            <strong>USB:</strong>&nbsp;{product.mAH}
                          </h4>
                          <h4>
                            <strong>Yadda??:</strong>&nbsp;{product.memory}
                          </h4>
                          <h4>
                            <strong>Ekran:</strong>&nbsp;{product.screen}
                          </h4>
                          <h4>
                            <strong>N??v?? say??:</strong>&nbsp;{product.SIM}
                          </h4>
                          <h4>
                            <strong>Qiym??t:</strong>
                            <br />
                            <h3>
                              {product.priceDiscount
                                ? `${product.priceDiscount}???`
                                : `${product.price}???`}
                            </h3>
                          </h4>
                        </div>
                      )}
                      {product.category === "TV" && (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <h4>
                            <strong>D??st??kl??n??n formatlar:</strong>&nbsp;
                            {product.MP}
                          </h4>
                          <h4>
                            <strong>Diaqonal:</strong>&nbsp;{product.RAM}
                          </h4>
                          <h4>
                            <strong>Ekran format??:</strong>&nbsp;{product.OS}
                          </h4>
                          <h4>
                            <strong>S??s g??c??:</strong>&nbsp;{product.INCH}
                          </h4>
                          <h4>
                            <strong>????ki:</strong>&nbsp;{product.mAH}
                          </h4>
                          <h4>
                            <strong>Audio:</strong>&nbsp;{product.memory}
                          </h4>
                          <h4>
                            <strong>Ekran:</strong>&nbsp;{product.screen}
                          </h4>
                          <h4>
                            <strong>Akustik sistem:</strong>&nbsp;{product.SIM}
                          </h4>
                          <h4>
                            <strong>Qiym??t:</strong>
                            <br />
                            <h3>
                              {product.priceDiscount
                                ? `${product.priceDiscount}???`
                                : `${product.price}???`}
                            </h3>
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="additional">
                      <span>
                        <i class="fas fa-truck"></i>
                        ??atd??r??lma pulsuzdur
                      </span>
                      <span>
                        <i class="fas fa-award"></i>1 illik z??man??t
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: "2%" }}>
                <h4>Miqdar??</h4>
                <div style={{ width: "50%", margin: "0 auto" }}>
                  <select
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                    className="form-control"
                  >
                    {numbers.map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="d-flex justify-content-center text-center shop">
                <button class="btn btn-danger" onClick={addToCartHandler}>
                  S??b??t?? ??lav?? et
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
