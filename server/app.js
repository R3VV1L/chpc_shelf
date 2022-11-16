const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const router = require("./routes/routes.js");

function start() {
  try {
    app.use("/", router);
  } catch (err) {
    console.error(err);
  }
}

app.listen(PORT, function () {
  console.log(`Сервер работает на порту: ${PORT}`);
});
start();
