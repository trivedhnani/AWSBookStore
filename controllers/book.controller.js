const connection = require("../DBConnection");
const multer = require("multer");
const AWS = require("aws-sdk");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) return cb(null, true);
  return cb(
    new AppError(400, "Not an image! Please upload only images"),
    false
  );
};
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPhoto = upload.single("photo");
exports.uploadToS3 = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const s3 = new AWS.S3();
  const Bucket = process.env.bucket;
  const Key = `${req.body.name}-${Date.now()}.jpeg`;
  req.body.photo = Key;
  const Body = req.file.buffer;
  const s3UploadAsync = s3.upload({ Bucket, Key, Body }).promise();
  await s3UploadAsync;
  next();
});
exports.addBooks = catchAsync(async (req, res, next) => {
  const query = connection.query(
    "Insert into books set ?",
    req.body,
    (err, results, fields) => {
      if (err) {
        next(new AppError(500, `Error adding book.`));
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          results,
          fields,
        },
      });
    }
  );
});
const filterObj = (body) => {
  const allowedFields = ["name", "photo", "price"];
  let newObj = {};
  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = body[key];
    }
  });
  return newObj;
};
exports.updateBook = catchAsync(async (req, res, next) => {
  req.body = filterObj(req.body);
  const query = connection.query(
    "Update books set ? where id=?",
    [req.body, req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        next(new AppError(400, "Please provide correct id"));
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          results,
        },
      });
    }
  );
});
exports.deleteBook = catchAsync(async (req, res, next) => {
  const query = connection.query(
    "Delete from books where id=?",
    req.params.id,
    (err, result) => {
      if (err) {
        next(new AppError(400, "Please provide correct id"));
        return;
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
});
exports.getBookById = catchAsync(async (req, res, next) => {
  const query = connection.query(
    "Select * from books where id=?",
    req.params.id,
    (err, results) => {
      if (err) {
        next(new AppError(400, err.message));
        return;
      } else if (results.length === 0) {
        next(new AppError(404, `Book with id ${req.params.id} not found`));
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          results,
        },
      });
    }
  );
});
exports.getAllBooks = catchAsync(async (req, res, next) => {
  const query = connection.query("Select * from books", (err, results) => {
    if (err) {
      next(new AppError(500, "Something went wrong!!"));
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        results,
      },
    });
  });
});
exports.deleteAll = catchAsync(async (req, res, next) => {
  const query = connection.query("delete from books", (err, results) => {
    if (err) {
      next(new AppError(500, "Something went wrong"));
      return;
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
});
