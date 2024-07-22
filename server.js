const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const run = async () => {
  try {
    const port = process.env.PORT || 3001;
    await mongoose.connect(
      // fix the url
      process.env.DB_URL || "mongodb://localhost:27017/"
    );
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  } catch (err) {
    console.log(`FAILED TO START: ${err}`);
  }
};

run();

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
