import {
  login,
  updatePassword,
  createUser,
  addOrder,
  updateCart,
  getOrdersByIdAndDates,
  updateName,
  getTopBuyer,
} from "../services/user.js";

export async function signup(req, res) {
  try {
    const { username, password, name } = req.body;
    const newUser = await createUser({ username, password, name });
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function userLogin(req, res) {
  try {
    const { username, password } = req.body;
    const loggedIn = await login(username, password);
    res.json(loggedIn);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function addToCart(req, res) {
  try {
    const userId = req.body.userId;
    const qty = req.body.qty;
    const productId = req.params.productId;

    const updatedUser = await addToCart(userId, productId, qty);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function removeFromCart(req, res) {
  try {
    const userId = req.body.userId;
    const productId = req.params.productId;
    const updatedUser = await removeFromCart(userId, productId);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function updateUserCart(req, res) {
  try {
    const userId = req.body.userId;
    const cart = req.body.cart;
    const updatedUser = await updateCart(userId, cart);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function addUserOrder(req, res) {
  try {
    const userId = req.body.userId;
    const orderId = req.params.orderId;
    console.log(userId, orderId);
    const updatedUser = await addUserOrder(userId, orderId);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function fetchOrdersByIdAndDates(req, res) {
  try {
    const userId = req.params.userId;
    const start = req.params.start;
    const end = req.params.end;
    const orders = await getOrdersByIdAndDates(userId, start, end);
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function updateUserName(req, res) {
  try {
    const userId = req.body.userId;
    const name = req.body.name;
    const updatedUser = await updateName(userId, name);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function updateUserPw(req, res) {
  try {
    const userId = req.body.userId;
    const oldPw = req.body.oldPw;
    const newPw = req.body.newPw;
    const updatedUser = await updateUserPw(userId, oldPw, newPw);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function TopBuyer(req, res) {
  try {
    const topBuyer = await getTopBuyer();
    res.json(topBuyer);
  } catch (err) {
    res.status(500).json(err);
  }
}
