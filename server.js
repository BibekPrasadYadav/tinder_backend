const express = require("express");
require("dotenv").config();
const connectiondb = require("./src/config/database");
const PORT = process.env.PORT || 3001;

const app = express();

connectiondb()
  .then(() => {
    console.log("Database Connected!!");
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
