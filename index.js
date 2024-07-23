import app from "./app/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { connect, connection } = mongoose;

const run = async () => {
  try {
    const port = process.env.PORT || 3001;
    const dbUrl =
      process.env.DB_URL ||
      "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";

    await connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1); // Exit with failure
  }
};

run();

process.on("SIGINT", async () => {
  try {
    await connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error(`Error while closing MongoDB connection: ${error}`);
    process.exit(1); // Exit with failure
  }
});
