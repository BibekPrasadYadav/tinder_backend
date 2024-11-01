const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use("/", (req, res) => {
  res.status(200).json({ code: 200, message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
