import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { createProduct } from "../actions/ProductActions";

export default function AdminCreateProducts(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const [brand, setBrand] = useState("");
  const [MP, setMP] = useState("");
  const [RAM, setRAM] = useState("");
  const [OS, setOS] = useState("");
  const [INCH, setINCH] = useState("");
  const [mAH, setmAH] = useState("");
  const [memory, setmemory] = useState("");
  const [screen, setscreen] = useState("");
  const [SIM, setSIM] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const CreateProduct = useSelector(state => state.productCreate);
  const { product } = CreateProduct;

  const dispatch = useDispatch();

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
      setUploading(false);
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProduct(
        name,
        category,
        image,
        price,
        priceDiscount,
        brand,
        MP,
        RAM,
        OS,
        INCH,
        mAH,
        memory,
        screen,
        SIM,
        images
      )
    );
  };
  useEffect(() => {
    if (product) {
      props.history.push("/productlist");
    }
  }, [product, props.history]);
  return (
    <React.Fragment>
      <form
        onSubmit={submitHandler}
        className="form"
        style={{ paddingTop: "3%", background: "wheat" }}
      >
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
            value={priceDiscount}
            onChange={e => setPriceDiscount(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label htmlFor="image">Fayl</label>
          <input
            className="form-control"
            type="file"
            id="image"
            label="Şəkil seç"
            onChange={uploadFileHandler}
          />

          {uploading && <LoadingBox />}
        </div>
        <div className="inputs">
          <label htmlFor="images">Əlavə şəkillər</label>
          <div className="inputs">
            <ul>
              {images.map(x => (
                <li>{x}</li>
              ))}
            </ul>
            <input
              className="form-control"
              type="file"
              id="images"
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
        <div className="inputs form-group">
          <label htmlFor="category">Kateqoriya</label>
          <br />
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Telephone" selected>
              Telephone
            </option>
            <option value="Computer">Computer</option>
            <option value="Watches">Watches</option>
            <option value="TV">TV</option>
            <option value="Kamera">Kamera</option>
          </select>
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
              Əlavə et
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
