require("dotenv").config();
const express = require("express");
const cookiesParser = require("cookie-parser");
const { connection } = require("./configs/connection");
const { userRoute } = require("./routes/user.route");

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookiesParser());

app.get("/", (req, res) => {
  res.send("welcome to FoodieFoo backend api");
});

app.use("/user", userRoute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
  console.log("server is listing  at port ", port);
});
