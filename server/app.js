const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bcrypt = require("bcrypt");
const Users = require("./models/UserModel");
const mongoose = require("mongoose");

app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    var user = new Users.User({
      username: username,
      password: hash,
    });
    await user
      .save()
      .then(() => {
        res.json("User registered");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.User.findOne({ username: username });
  if (!user) {
    res.status(400).json({ error: "User doesn't exist" });
  }
  const hashPassword = user.password;
  bcrypt.compare(password, hashPassword).then((match) => {
    if (!match) {
      res.status(400).json({ error: "Incorrect password" });
    } else {
      res.json("Logged in");
    }
  });
});

app.get("/api/profile", (req, res) => {
  res.json("profile");
});

// подключение
mongoose.connect(
  "mongodb+srv://product:qwerty123@cluster0.xotx6dl.mongodb.net/product_db"
);

app.listen(port, () => {
  console.log("Server start");
});
