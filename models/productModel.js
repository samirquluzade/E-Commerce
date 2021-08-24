import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    priceDiscount: { type: Number },
    MP: { type: String, required: true },
    RAM: { type: Number, required: true },
    INCH: { type: Number, required: true },
    mAH: { type: Number, required: true },
    SIM: { type: Number, required: true },
    OS: { type: String, required: true },
    memory: { type: String, required: true },
    screen: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
