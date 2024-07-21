const app = require("./app");
const MongoDatabase = require("./app/DAL/db");

const run = async () => {
  try {
    const port = process.env.PORT || "3001";
    await MongoDatabase.instance().connect();
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  } catch (err) {
    console.log(`FAILED TO START: ${err}`);
  }
};

run();

process.on("SIGINT", async () => {
  await MongoDatabase.instance().disconnect();
  process.exit(0);
});
