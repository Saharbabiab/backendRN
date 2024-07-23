import {
  create,
  getById,
  updateOrderHandler,
  deleteOrderHandler,
  amountOfOrdersHandler,
} from "../controllers/order.js";
import express from "express";
import cacheNoStore from "../middlewares/cacheNoStore.js";

const router = express.Router();

router.post("/create", cacheNoStore, create);
router.get("/getOrderById/:id", cacheNoStore, getById);
router.put("/updateOrder/:id", cacheNoStore, updateOrderHandler);
router.delete("/deleteOrder/:id", cacheNoStore, deleteOrderHandler);
router.get("/amountOfOrders", cacheNoStore, amountOfOrdersHandler);

export default router;
