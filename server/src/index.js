const app = require("./app");
const connectDB = require("./db");
const env = require("dotenv");

env.config({
  path: "../.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running successfully on the PORT:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Server is not connected running");
  });
