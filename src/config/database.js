const mongoose = require("mongoose");
require("dotenv").config();

const connectiondb = async () => {
  await mongoose.connect(process.env.MONGODBSTRING);
};

module.exports = connectiondb;
