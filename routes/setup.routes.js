const express = require("express");
const setUpController = require("../controllers/setup.controller");
const router = express.Router();
router
  .route("/table")
  .post(setUpController.createTable)
  .delete(setUpController.dropTable);
module.exports = router;
