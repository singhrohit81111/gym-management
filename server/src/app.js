const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: `16Kb` }));
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use(errorHandler);

module.exports = app;
