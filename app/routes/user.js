import {
  signup,
  userLogin,
  addToCartH,
  removeFromCart,
  updateUserCart,
  addUserOrder,
  fetchOrdersByIdAndDates,
  updateUserName,
  updateUserPw,
  TopBuyer,
  getAllUsersH,
} from "../controllers/user.js";
import express from "express";
import cacheNoStore from "../middlewares/cacheNoStore.js";

const router = express.Router();

router.get("/all", cacheNoStore, getAllUsersH);
router.post("/signup", cacheNoStore, signup);
router.post("/login", cacheNoStore, userLogin);
router.post("/addToCart/:productId", cacheNoStore, addToCartH);
router.delete("/removeFromCart/:productId", cacheNoStore, removeFromCart);
router.put("/updateCart", cacheNoStore, updateUserCart);
router.put("/addOrder/:orderId", cacheNoStore, addUserOrder);
router.get(
  "/getOrdersByIdAndDates/:userId/:start/:end",
  cacheNoStore,
  fetchOrdersByIdAndDates
);
router.put("/updateName", cacheNoStore, updateUserName);
router.put("/updatePassword", cacheNoStore, updateUserPw);
router.get("/getTopBuyer", cacheNoStore, TopBuyer);

export default router;
