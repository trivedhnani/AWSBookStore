module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: `${err.statusCode}`.startsWith("4") ? "fail" : "error",
      message: err.message,
    });
  } else {
    res.status(500).json({ status: "fail", message: "something went wrong" });
  }
};
