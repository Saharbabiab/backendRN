import Product from "../models/product.js";
import { ObjectId } from "mongodb";

export async function createProduct(P) {
  const newProduct = new Product({
    name: P.name,
    img: P.img,
    description: P.description,
    price: P.price,
    inStock: P.inStock,
  });
  return newProduct.save();
}

export async function getAllProducts() {
  return Product.find();
}
// Remove the duplicate function definition

export async function getPrice(id) {
  const product = await Product.findById(id);
  return product.price;
}

export async function getProductsByPage(page) {
  return Product.find()
    .skip((page - 1) * 10)
    .limit(10);
}

export async function getProductById(id) {
  return Product.findById(id);
}

export async function updateProduct(id, P) {
  const product = await Product.findById(id);
  if (product) {
    product.name = P.name;
    product.img = P.img;
    product.description = P.description;
    product.price = P.price;
    product.inStock = P.inStock;
    product.updatedAt = new Date();
    return product.save();
  }
  return "Product not found";
}

export async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

export async function updateProductQuantity(id, qty) {
  const product = await Product.findById(id);
  if (product) {
    product.inStock = qty;
    return product.save();
  }
  return "Product not found";
}

export async function amountOfProducts() {
  return Product.countDocuments();
}

export async function getProductsByPageAndSort(page, sort) {
  return Product.find()
    .sort(sort)
    .skip((page - 1) * 10)
    .limit(10);
}

export async function enoughToSupply(order) {
  for (const item of order.items) {
    const product = await Product.findById(item.productId);
    if (product.inStock < item.qty) {
      return false;
    }
  }
  return true;
}

export async function bestSellingByPage(page) {
  return [
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "products.productId",
        as: "order",
      },
    },
    {
      $unwind: "$order",
    },
    {
      $unwind: "$order.products",
    },
    {
      $group: {
        _id: "$_id",
        total: {
          $sum: "$order.products.quantity",
        },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $skip: (page - 1) * 10,
    },
    {
      $limit: 10,
    },
  ];
}
