import app from "./app/index.js";
import mongoose from "mongoose";
const { connect, connection } = mongoose;
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  try {
    const port = process.env.PORT || 3001;
    await connect(
      // fix the url
      process.env.DB_URL ||
        "mongodb+srv://saharbabian:W8vca977@babi.yefv4yp.mongodb.net/"
    );
    app(port, () => console.log(`Listening on port: ${port}`));
  } catch (err) {
    console.log(`FAILED TO START: ${err}`);
  }
};

run();

process.on("SIGINT", async () => {
  await connection.close();
  process.exit(0);
});
