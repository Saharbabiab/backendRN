import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
  getProductsByPage,
  amountOfProducts,
  getProductsByPageAndSort,
  bestSellingByPage,
  getAllProducts,
} from "../services/product.js";

import { top3BestSelling } from "../services/order.js";

export async function create(req, res) {
  try {
    const product = req.body;
    console.log(product);
    const newProduct = await createProduct(product);
    if (newProduct === "missing required fields") {
      return res.status(400).json("missing required fields");
    }
    res.json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function getAllByPageAndSort(req, res) {
  try {
    const pageN = req.params.pageN;
    const sortBy = req.params.sortBy;
    let queryOptions = {};

    if (sortBy === "newest") {
      queryOptions = { createdAt: -1 };
    } else if (sortBy === "oldest") {
      queryOptions = { createdAt: 1 };
    } else if (sortBy === "price-asc") {
      queryOptions = { price: 1 };
    } else if (sortBy === "price-desc") {
      queryOptions = { price: -1 };
    }

    let products;
    if (sortBy === "default" || !sortBy) {
      products = await getProductsByPage(pageN);
    } else {
      if (sortBy === "best-selling") {
        products = await bestSellingByPage(pageN);
      } else {
        products = await getProductsByPageAndSort(pageN, queryOptions);
      }
    }

    if (!products || products.length === 0) {
      return res.status(404).json("No products found");
    }
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    if (!products || products.length === 0) {
      return res.status(404).json("No products found");
    }
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deletedProduct(req, res) {
  console.log("delete");
  try {
    const id = req.params.id;
    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json("Product not found");
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json("missing required fields");
    }
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function editProduct(req, res) {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const updatedProduct = await updateProduct(id, updatedFields);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function deleteProductHandler(req, res) {
  try {
    const id = req.params.id;
    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json("Product not found");
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function updateQuantity(req, res) {
  try {
    const id = req.params.id;
    const quantity = req.body.quantity;
    const updatedProduct = await updateProductQuantity(id, quantity);
    if (updatedProduct == "Product not found") {
      return res.status(400).json("Product not found");
    } else if (updatedProduct === "Not enough quantity in stock") {
      return res.status(400).json("Not enough quantity in stock");
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function totalProducts(req, res) {
  try {
    const amount = await amountOfProducts();
    if (!amount) {
      return res.status(400).json("No products found");
    }
    res.json(amount);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function top3Products(req, res) {
  try {
    const top3 = await top3BestSelling();
    if (!top3) {
      return res.status(400).json("No products found");
    }
    res.json(top3);
  } catch (err) {
    res.status(500).json(err);
  }
}
