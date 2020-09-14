const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const mysql = require("mysql");
const connection = require("./DBConnection");
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`DB Connection Successful`);
});
const app = require("./app");
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
