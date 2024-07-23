import {
  enoughToSupply,
  updateProductQuantity,
  getPrice,
} from "../services/product.js";
import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  amountOfOrders,
  getTotalPrice,
} from "../services/order.js";

export async function create(req, res) {
  try {
    const order = req.body;
    const items = order.items;
    let promiseArr = items.map((i) => enoughToSupply(i.productId, i.qty));
    const enough = await Promise.all(promiseArr);
    if (enough.includes(false)) {
      return res.status(400).json("Not enough in stock");
    }
    promiseArr = items.map((i) => updateProductQuantity(i.productId, i.qty));
    await Promise.all(promiseArr);
    const newOrder = await createOrder({
      items: order.items,
      totalPrice: order.totalPrice,
    });
    res.json(newOrder);
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
    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json("Order not found");
    }
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function updateOrderHandler(req, res) {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const updatedOrder = await updateOrder(id, updatedFields);
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function deleteOrderHandler(req, res) {
  try {
    const id = req.params.id;
    const deletedOrder = await deleteOrder(id);
    if (!deletedOrder) {
      return res.status(404).json("Order not found");
    }
    res.json(deletedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function amountOfOrdersHandler() {
  try {
    const amount = await amountOfOrders();
    res.json(amount);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function getTotalPriceHandler(req, res) {
  try {
    const totalPrice = await getTotalPrice();
    res.json(totalPrice);
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function getPriceHandler(req, res) {
  try {
    const id = req.params.id;
    const price = await getPrice(id);
    res.json(price);
  } catch (err) {
    res.status(500).json(err);
  }
}
