import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.send("Error in Deletion");
    }
  })
);
productRouter.get(
  "/search=:search",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      name: { $regex: req.params.search, $options: "i" },
    });
    res.send(products);
  })
);
productRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      images: req.body.images,
      price: req.body.price,
      priceDiscount: req.body.priceDiscount,
      brand: req.body.brand,
      MP: req.body.MP,
      RAM: req.body.RAM,
      OS: req.body.OS,
      INCH: req.body.INCH,
      mAH: req.body.mAH,
      memory: req.body.memory,
      screen: req.body.screen,
      SIM: req.body.SIM,
    });
    const createdProduct = await product.save();
    res.send({
      _id: createdProduct._id,
      name: createdProduct.name,
      category: createdProduct.category,
      image: createdProduct.image,
      images: createdProduct.images,
      price: createdProduct.price,
      priceDiscount: createdProduct.priceDiscount,
      brand: createdProduct.brand,
      MP: createdProduct.MP,
      RAM: createdProduct.RAM,
      OS: createdProduct.OS,
      INCH: createdProduct.INCH,
      mAH: createdProduct.mAH,
      memory: createdProduct.memory,
      screen: createdProduct.screen,
      SIM: createdProduct.SIM,
    });
  })
);
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.MP = req.body.MP;
      product.RAM = req.body.RAM;
      product.OS = req.body.OS;
      product.INCH = req.body.INCH;
      product.mAH = req.body.mAH;
      product.memory = req.body.memory;
      product.screen = req.body.screen;
      product.SIM = req.body.SIM;

      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "Product Updated", data: updatedProduct });
      }
    }
    return res.status(500).send({ message: "Error in updating" });
  })
);
productRouter.get(
  "/products/:category/:min&:max",
  expressAsyncHandler(async (req, res) => {
    const min =
      req.params.min && Number(req.params.min) !== 0
        ? Number(req.params.min)
        : 0;
    const max =
      req.params.max && Number(req.params.max) !== 0
        ? Number(req.params.max)
        : 0;
    const priceFilter =
      min && max
        ? {
            price: { $gte: Number(min), $lte: Number(max) },
          }
        : {};
    const product = Product.find({ category: req.params.category });
    const filterByPrice = await product.find({
      ...priceFilter,
    });
    if (filterByPrice) {
      res.send(filterByPrice);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);
productRouter.get(
  "/products/:category/:min&:max/:sort=:sort",
  expressAsyncHandler(async (req, res) => {
    const min =
      req.params.min && Number(req.params.min) !== 0
        ? Number(req.params.min)
        : 0;
    const max =
      req.params.max && Number(req.params.max) !== 0
        ? Number(req.params.max)
        : 0;
    const priceFilter =
      min && max
        ? {
            price: { $gte: Number(min), $lte: Number(max) },
          }
        : {};
    const sort = req.params.sort;
    const product = Product.find({ category: req.params.category });
    const filterByPrice = await product.find({
      ...priceFilter,
    });
    const sortedProducts = filterByPrice.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "price") {
        return parseInt(a.price) - parseInt(b.price);
      }
    });
    if (sortedProducts) {
      res.send(sortedProducts);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);
productRouter.get(
  "/products/:category",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({ category: req.params.category });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);
productRouter.get(
  "/products/:category/:brand",
  expressAsyncHandler(async (req, res) => {
    const product = Product.find({ category: req.params.category });
    const filterProductByItem = await product.find({ brand: req.params.brand });
    if (filterProductByItem) {
      res.send(filterProductByItem);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);

productRouter.get(
  "/products/:category/:brand/:min&:max",
  expressAsyncHandler(async (req, res) => {
    const min =
      req.params.min && Number(req.params.min) !== 0
        ? Number(req.params.min)
        : 0;
    const max =
      req.params.max && Number(req.params.max) !== 0
        ? Number(req.params.max)
        : 0;
    const priceFilter =
      min && max
        ? {
            price: { $gte: Number(min), $lte: Number(max) },
          }
        : {};
    const product = Product.find({ category: req.params.category });
    const filterProductByItem = product.find({ brand: req.params.brand });
    const filterByPrice = await filterProductByItem.find({
      ...priceFilter,
    });
    if (filterByPrice) {
      res.send(filterByPrice);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);
productRouter.get(
  "/products/:category/:brand/:min&:max/sort=:sort",
  expressAsyncHandler(async (req, res) => {
    const min =
      req.params.min && Number(req.params.min) !== 0
        ? Number(req.params.min)
        : 0;
    const max =
      req.params.max && Number(req.params.max) !== 0
        ? Number(req.params.max)
        : 0;
    const priceFilter =
      min && max
        ? {
            price: { $gte: Number(min), $lte: Number(max) },
          }
        : {};
    const sort = req.params.sort;
    const product = Product.find({ category: req.params.category });
    const filterProductByItem = product.find({ brand: req.params.brand });
    const filterByPrice = await filterProductByItem.find({
      ...priceFilter,
    });
    const sortedProducts = filterByPrice.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "price") {
        return parseInt(a.price) - parseInt(b.price);
      }
    });
    if (sortedProducts) {
      res.send(sortedProducts);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);

export default productRouter;
