const Order = require("../models/order");
const Product = require("../models/product");
const { getPrice } = require("./product");

module.exports = {
  createOrder: async (order) => {
    const newOrder = new Order({
      items: order.items,
      totalPrice: order.totalPrice,
    });
    return newOrder.save();
  },
  getOrderById: async (id) => {
    return Order.findById(id);
  },
  updateOrder: async (id, order) => {
    return Order.findByIdAndUpdate(id, order, { new: true });
  },
  deleteOrder: async (id) => {
    return Order.findByIdAndDelete(id);
  },
  amountOfOrders: async () => {
    return Order.countDocuments();
  },
  getTotalPrice: async (items) => {
    let totalPrice = 0;
    for (const item of items) {
      console.log(item.productId, item.qty);
      const price = await getPrice(item.productId);
      totalPrice += price * item.qty;
    }
    return totalPrice;
  },
  top3BestSelling: async () => {
    return Order.aggregate([
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
  },
};
