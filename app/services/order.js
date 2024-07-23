import Order from "../models/order.js";
import Product from "../models/product.js";
import { getPrice } from "./product.js";

export async function createOrder(order) {
  const newOrder = new Order({
    items: order.items,
    totalPrice: order.totalPrice,
  });
  return newOrder.save();
}
export async function getOrderById(id) {
  return findById(id);
}
export async function updateOrder(id, order) {
  return findByIdAndUpdate(id, order, { new: true });
}
export async function deleteOrder(id) {
  return findByIdAndDelete(id);
}
export async function amountOfOrders() {
  return countDocuments();
}
export async function getTotalPrice(items) {
  let totalPrice = 0;
  for (const item of items) {
    console.log(item.productId, item.qty);
    const price = await getPrice(item.productId);
    totalPrice += price * item.qty;
  }
  return totalPrice;
}
export async function top3BestSelling() {
  return aggregate([
    {
      $unwind: {
        path: "$items",
        includeArrayIndex: "string",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $group: {
        _id: "$items.productId",
        total: {
          $sum: "$items.qty",
        },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        includeArrayIndex: "string",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$product",
            {
              total: "$total",
            },
          ],
        },
      },
    },
    {
      $limit: 5,
    },
  ]);
}
