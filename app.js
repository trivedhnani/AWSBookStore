const express = require("express");
const app = express();
const globalErrorHandler = require("./utils/globalErrorHandler");
const bookRouter = require("./routes/book.routes");
const setUpRouter = require("./routes/setup.routes");
app.use(express.json({ limit: "10kb" }));
app.use("*", (req, res, next) => {
  console.log("Sample middleware");
  next();
});
app.use("/api/v1/health", (req, res, next) => {
  res.status(200).json({ status: "success", message: "healthy" });
});
app.use("/api/v1/setup", setUpRouter);
app.use("/api/v1/book", bookRouter);
app.use(globalErrorHandler);
module.exports = app;
