const express = require("express");
const bookConrtroller = require("../controllers/book.controller");
const router = express.Router();
router
  .route("/")
  .post(
    bookConrtroller.uploadPhoto,
    bookConrtroller.uploadToS3,
    bookConrtroller.addBooks
  )
  .get(bookConrtroller.getAllBooks)
  .delete(bookConrtroller.deleteAll);
router
  .route("/:id")
  .patch(
    bookConrtroller.uploadPhoto,
    bookConrtroller.uploadToS3,
    bookConrtroller.updateBook
  )
  .delete(bookConrtroller.deleteBook)
  .get(bookConrtroller.getBookById);
module.exports = router;
