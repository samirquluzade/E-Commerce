import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";

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
