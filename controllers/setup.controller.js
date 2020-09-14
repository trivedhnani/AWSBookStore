const mysql = require("mysql");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const connection = require("../DBConnection");
exports.createTable = catchAsync(async (req, res, next) => {
  const string = Object.keys(req.body.table).reduce((acc, cur) => {
    return `${acc} ${acc.length > 0 ? "," : ""} ${cur} ${req.body.table[
      cur
    ].join(" ")}`;
  }, "");
  const query = `Create table ${req.body.name}(${string} , primary key(${req.body.primary_key}))`;
  const queryAsync = promisify(connection.query).bind(connection);
  await queryAsync(query);
  res.status(200).json({
    status: "success",
    data: {
      message: "Created table",
    },
  });
});
exports.dropTable = catchAsync(async (req, res, next) => {
  if (!req.body.table) {
    next(new AppError(400, "Please provide table name"));
    return;
  }
  const query = "drop table " + req.body.table;
  const queryAsync = promisify(connection.query).bind(connection);
  await queryAsync(query);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
