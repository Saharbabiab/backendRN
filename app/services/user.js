import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import { getOrderById } from "./order.js";
import { ObjectId } from "mongodb";
import { enoughToSupply } from "./product.js";

export async function createUser(user) {
  console.log(user);
  if (!user.username || !user.password || !user.name)
    return "missing required fields";
  if ((await User.findOne({ username: user.username })) != null)
    return "user already exist";

  const newUser = new User({
    username: user.username,
    password: await hash(`${user.password}${process.env.SECRET_KEY}`, 10),
    name: user.name,
    orders: [],
  });
  return newUser.save();
}
export async function updateUserPw(userId, oldPw, newPw) {
  const user = await User.findById(userId);
  if (await compare(`${oldPw}${process.env.SECRET_KEY}`, user.password)) {
    user.password = await hash(`${newPw}${process.env.SECRET_KEY}`, 10);
    return user.save();
  }
  return "old password is not correct";
}
export async function login(username, password) {
  const user = await User.findOne({ username: username });

  if (!user) {
    return "username is incorrect";
  }

  if (await compare(`${password}${process.env.SECRET_KEY}`, user.password)) {
    return user;
  } else {
    return "password is incorrect";
  }
}
export async function addOrder(userId, orderId) {
  const user = await User.findById(userId);
  if (user) {
    user.orders.push(orderId);
    const updatedUser = await user.save();
    return updatedUser;
  }
  return "User not found";
}
export async function addToCart(userId, productId, qty) {
  const user = await User.findById(userId);
  if (user) {
    if (user.cart.some((item) => item.productId == productId)) {
      for (const item of user.cart) {
        if (item.productId == productId) {
          if (await enoughToSupply(item.productId, item.qty + qty)) {
            item.qty += qty;
          } else return "Not enough in stock";
        }
      }
    } else {
      if (await enoughToSupply(productId, qty)) {
        user.cart.push({ productId: productId, qty: qty });
      } else return "Not enough in stock";
    }
    const updatedUser = await user.save();
    return updatedUser;
  }
  return "User not found";
}
export async function removeFromCart(userId, prodId) {
  const user = await User.findById(userId);
  if (user) {
    if (user.cart.some((item) => item.productId == prodId)) {
      user.cart = user.cart.filter((item) => item.productId != prodId);
      const updatedUser = await user.save();
      return updatedUser;
    }
    return "Product not found in cart";
  }
  return "User not found";
}
export async function getOrdersByIdAndDates(userId, start, end) {
  try {
    const userOrders = await User.aggregate([
      {
        $unwind:
          /**
           * path: Path to the array field.
           * includeArrayIndex: Optional name for index.
           * preserveNullAndEmptyArrays: Optional
           *   toggle to unwind null and empty values.
           */
          {
            path: "$orders",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: false,
          },
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "orders",
            localField: "orders",
            foreignField: "_id",
            as: "order",
          },
      },
      {
        $unwind:
          /**
           * path: Path to the array field.
           * includeArrayIndex: Optional name for index.
           * preserveNullAndEmptyArrays: Optional
           *   toggle to unwind null and empty values.
           */
          {
            path: "$order",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: false,
          },
      },
      {
        $sort:
          /**
           * Provide any number of field/order pairs.
           */
          {
            "order.createdAt": -1,
          },
      },
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            "order.createdAt": {
              $gte: new Date(Number(start)),
              $lte: new Date(Number(end)),
            },
          },
      },
      {
        $group:
          /**
           * _id: The id of the group.
           * fieldN: The first field name.
           */
          {
            _id: "$_id",
            orders: {
              $push: "$order",
            },
          },
      },
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            _id: new ObjectId(userId),
          },
      },
    ]);
    if (userOrders.length > 0) {
      return userOrders[0].orders;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while fetching orders.";
  }
}
export async function updateCart(userId, cart) {
  const user = await User.findById(userId);
  if (user) {
    user.cart = cart;
    return user.save();
  }
  return "User not found";
}
export async function updateName(userId, newName) {
  const user = await User.findByIdAndUpdate(userId, { name: newName });
  return user;
}
export async function getTopBuyer() {
  return User.aggregate([
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */
        {
          path: "$orders",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "orders",
          localField: "orders",
          foreignField: "_id",
          as: "order",
        },
    },
    {
      $unwind:
        /**
         * path: Path to the array field.
         * includeArrayIndex: Optional name for index.
         * preserveNullAndEmptyArrays: Optional
         *   toggle to unwind null and empty values.
         */
        {
          path: "$order",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "$_id",
          totalPurchases: {
            $sum: "$order.totalPrice",
          },
        },
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          totalPurchases: -1,
        },
    },
    {
      $limit:
        /**
         * Provide the number of documents to limit.
         */
        1,
    },
  ]);
}

export async function getUserById(id) {
  return User.findById(id);
}

export async function updatePassword(id, password) {
  const user = await User.findById(id);
  user.password = await hash(`${password}${process.env.SECRET_KEY}`, 10);
  return user.save();
}
