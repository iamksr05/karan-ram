const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});