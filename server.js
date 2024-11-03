const express = require("express");
require("dotenv").config();
const connectiondb = require("./src/config/database");
const User = require("./src/models/User");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/user", async (req, res) => {
  // console.log(req.body);
  const userData = new User(req.body);

  try {
    const allowedColumns = ["about", "lastName", "age", "photoUrl", "skills"];

    const isAllowed = Object.keys(req.body).every((key) =>
      allowedColumns?.includes(key)
    );

    console.log(isAllowed);
    if (isAllowed) {
      // res.status(500).send({ code: 500, message: "Not allowed" });
      throw new Error("Not allowed");
    }

    // const result = await userData.save();
    // console.log(result);
    res.status(201).send({ code: 201, message: "User Added Successfully!" });
  } catch (error) {
    res.status(500).send({ code: 500, message: error.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send({ code: 200, message: "Success", userList: result });
  } catch (error) {
    res.status(500).send({ code: 500, message: error });
  }
});

app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  try {
    const reqBodyValue = Object.values(req.body)?.map((value) => value);
    console.log(reqBodyValue);
    // const deletedUser = await User.findByIdAndDelete(userId);
    // console.log(deletedUser);
    res.status(200).send({ code: 200, message: "Deleted Successfully!" });
  } catch (error) {
    res.status(500).send({ code: 500, message: error });
  }
});

app.patch("/user", async (req, res) => {
  const { userId } = req.body;

  const data = Object.keys(req.body).map((key) => key);
  console.log(data);
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body);
    console.log(updatedUser);
    res.status(200).send({ code: 200, message: "User Updated Successfully!" });
  } catch (error) {
    res.status(500).send({ code: 500, message: error });
  }
});

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
