import {
  create,
  getAllByPageAndSort,
  getById,
  editProduct,
  deletedProduct,
  updateQuantity,
  totalProducts,
  top3Products,
  getProducts,
} from "../controllers/product.js";
import express from "express";
import cacheNoStore from "../middlewares/cacheNoStore.js";

const router = express.Router();

router.post("/create", cacheNoStore, create);
router.get(
  "/getProductsByPageAndSort/:pageN/:sortBy",
  cacheNoStore,
  getAllByPageAndSort
);
router.get("/getById/:id", cacheNoStore, getById);
router.put("/editProduct/:id", cacheNoStore, editProduct);
router.delete("/deleteProduct/:id", cacheNoStore, deletedProduct);
router.put("/updateProductQuantity/:id", cacheNoStore, updateQuantity);
router.get("/getTotalProducts", cacheNoStore, totalProducts);
router.get("/top3BestSelling", cacheNoStore, top3Products);
router.get("/getProducts", cacheNoStore, getProducts);

export default router;
