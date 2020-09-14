const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.DBport,
  user: process.env.DBuser,
  password: process.env.DBpassword,
  database: process.env.database,
});
module.exports = connection;
