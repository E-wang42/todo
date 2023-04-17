const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const pool = require("./models/pgDB");

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev")); //combined
app.use(express.json());

pool.connect();

// ROUTES //

// get all todo
app.get("/todo", async (req, res) => {
  try {
    const todoAll = await pool.query("SELECT * FROM todo");
    res.json(todoAll.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get todo by id
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoID = await pool.query(
      "SELECT description FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json(todoID.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// create todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    console.log(description);
    const newTodo = await pool.query(
      "INSERT INTO todo (description, created_on) VALUES($1, CURRENT_TIMESTAMP) RETURNING *",
      [description]
    );

    res.status(201).json(newTodo.rows);
  } catch (err) {
    console.log(err);
  }
});

// update todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(description);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    res.status(200).json(updateTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// delete todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json("item removed");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = app;
