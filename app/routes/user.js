import {
  signup,
  userLogin,
  addToCartH,
  removeFromCartH,
  updateUserCart,
  addUserOrderH,
  fetchOrdersByIdAndDates,
  updateUserName,
  updateUserPwH,
  TopBuyer,
  getAllUsersH,
  getCartH,
} from "../controllers/user.js";
import express from "express";
import cacheNoStore from "../middlewares/cacheNoStore.js";

const router = express.Router();

router.get("/all", cacheNoStore, getAllUsersH);
router.post("/signup", cacheNoStore, signup);
router.post("/login", cacheNoStore, userLogin);
router.post("/addToCart/:productId", cacheNoStore, addToCartH);
router.delete("/removeFromCart/:productId", cacheNoStore, removeFromCartH);
router.put("/updateCart", cacheNoStore, updateUserCart);
router.put("/addOrder/:orderId", cacheNoStore, addUserOrderH);
router.get(
  "/getOrdersByIdAndDates/:userId/:start/:end",
  cacheNoStore,
  fetchOrdersByIdAndDates
);
router.put("/updateName", cacheNoStore, updateUserName);
router.put("/updatePassword", cacheNoStore, updateUserPwH);
router.get("/getTopBuyer", cacheNoStore, TopBuyer);
router.get("/getCart/:userId", cacheNoStore, getCartH);

export default router;
