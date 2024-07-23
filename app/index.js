import pkg from "body-parser";
const { json } = pkg;
import cors from "cors";
import express from "express";
import productsRouter from "./routes/product.js";
import usersRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";

const app = express();
app.use(json());
app.use(cors());
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", orderRouter);

export default app;
