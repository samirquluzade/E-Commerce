import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { updateProduct, detailsProduct } from "../actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../constants/ProductConstants";

export default function AdminProductsUpdate(props) {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [MP, setMP] = useState("");
  const [RAM, setRAM] = useState("");
  const [OS, setOS] = useState("");
  const [INCH, setINCH] = useState("");
  const [mAH, setmAH] = useState("");
  const [memory, setmemory] = useState("");
  const [screen, setscreen] = useState("");
  const [SIM, setSIM] = useState("");
  const [priceDiscount, setpriceDiscount] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      props.history.push(`/productlist`);
    }
    if (!product.name) {
      dispatch(detailsProduct(productId));
    } else {
      setId(product._id);
      setName(product.name);
      setPrice(product.price);
      setpriceDiscount(product.priceDiscount);
      setImage(product.image);
      setImages(product.images);
      setCategory(product.category);
      setBrand(product.brand);
      setMP(product.MP);
      setRAM(product.RAM);
      setINCH(product.INCH);
      setOS(product.OS);
      setmAH(product.mAH);
      setmemory(product.memory);
      setscreen(product.screen);
      setSIM(product.SIM);
    }

    return () => {
      //
    };
  }, [product, successUpdate, dispatch, props.history, productId]);

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (forImages) {
        setImages([...images, data]);
      } else {
        setImage(data);
      }
      setUploading(false);
    } catch (err) {
      setErrorUpload(err);
      setUploading(false);
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        priceDiscount,
        image,
        images,
        brand,
        category,
        MP,
        RAM,
        OS,
        INCH,
        memory,
        screen,
        SIM,
        mAH,
      })
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Məhsul yenilə</h1>
        </div>

        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {product.name && (
          <React.Fragment>
            <div className="inputs">
              <label htmlFor="name">Ad</label>
              <input
                className="form-control"
                id="name"
                type="text"
                placeholder="Məhsulun adını daxil edin!"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="price">Qiymət</label>
              <input
                className="form-control"
                id="price"
                type="number"
                placeholder="Məhsulun qiymətini əlavə edin!"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="priceDiscount">Endirim</label>
              <input
                className="form-control"
                id="priceDiscount"
                type="number"
                placeholder="Məhsulun endirim qiymətini əlavə edin!"
                value={price}
                onChange={e => setpriceDiscount(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="image">Şəkil linki</label>
              <input
                className="form-control"
                id="image"
                type="text"
                placeholder="Şəklin linkini əlavə edin"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="image-file">Fayl</label>
              <input
                className="form-control"
                type="file"
                id="image-file"
                label="Şəkil seç"
                onChange={uploadFileHandler}
              />

              {uploading && <LoadingBox />}
            </div>
            <div className="inputs">
              <label htmlFor="image-file">Additional Images</label>
              <div className="inputs">
                <ul>
                  {images.length === 0 && <li>Şəkil yoxdur</li>}
                  {images.map(x => (
                    <li>{x}</li>
                  ))}
                </ul>
                <input
                  className="form-control"
                  type="file"
                  id="additional-image-file"
                  label="Şəkil seç"
                  onChange={e => uploadFileHandler(e, true)}
                />
              </div>
              {uploading && <LoadingBox />}
            </div>
            <div className="inputs">
              <label>Növü</label>
              <input
                className="form-control"
                type="text"
                placeholder="Növünü daxil edin!"
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="MP">MP</label>
              <input
                className="form-control"
                id="MP"
                type="text"
                placeholder="MP daxil edin"
                value={MP}
                onChange={e => setMP(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="category">Kateqoriya</label>
              <input
                className="form-control"
                id="category"
                type="text"
                placeholder="Kateqoriya daxil edin!"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </div>

            <div className="inputs">
              <label htmlFor="RAM">RAM</label>
              <input
                className="form-control"
                id="RAM"
                placeholder="RAM daxil edin!"
                value={RAM}
                onChange={e => setRAM(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="OS">Əməliyyat sistemi</label>
              <input
                className="form-control"
                id="OS"
                placeholder="OS daxil edin!"
                value={OS}
                onChange={e => setOS(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="INCH">İnch(dyüm)</label>
              <input
                className="form-control"
                id="INCH"
                placeholder="INCH daxil edin!"
                value={INCH}
                onChange={e => setINCH(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="mAH">USB</label>
              <input
                className="form-control"
                id="mAH"
                placeholder="USB daxil edin!"
                value={mAH}
                onChange={e => setmAH(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="memory">Yaddaş</label>
              <input
                className="form-control"
                id="memory"
                placeholder="Yaddaş daxil edin!"
                value={memory}
                onChange={e => setmemory(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="screen">Ekran</label>
              <input
                className="form-control"
                id="screen"
                placeholder="Ekran daxil edin!"
                value={screen}
                onChange={e => setscreen(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="SIM">SIM</label>
              <input
                className="form-control"
                id="SIM"
                placeholder="SIM daxil edin!"
                value={SIM}
                onChange={e => setSIM(e.target.value)}
              />
            </div>
            <div className="inputs">
              <div />
              <div>
                <button
                  onClick={() => props.history.push("/productlist")}
                  type="button"
                  className="btn btn-danger"
                >
                  Geriyə
                </button>
                {"     "}
                <button className="btn btn-info" type="submit">
                  Yenilə
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </form>
    </div>
  );
}
