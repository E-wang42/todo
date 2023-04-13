const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoApp",
  password: "Solidity01!",
  port: 5432,
});

module.exports = pool;
