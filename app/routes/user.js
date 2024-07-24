import {
  signup,
  userLogin,
  addToCart,
  removeFromCart,
  updateUserCart,
  addUserOrder,
  fetchOrdersByIdAndDates,
  updateUserName,
  updateUserPw,
  TopBuyer,
} from "../controllers/user.js";
import express from "express";
import cacheNoStore from "../middlewares/cacheNoStore.js";

const router = express.Router();

router.post("/signup", cacheNoStore, signup);
/*
postman signup test
post http://localhost:3000/api/users/signup
{
    "username": "test",
    "password": "test",
    "name": "test"
}
*/
router.post("/login", cacheNoStore, userLogin);
router.post("/addToCart/:productId", cacheNoStore, addToCart);
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
