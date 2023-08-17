const express = require("express");
const { connection } = require("mongoose");
require("dotenv").config();

const port = process.env.port || 8000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to FoodieFoo backend api");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
  console.log("server is listing  at port ", port);
});
