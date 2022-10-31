const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bcrypt = require("bcrypt");
const Users = require("./models/UserModel");
const Products = require("./models/ProductModel");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const token = require("./jwt");
const { check, validationResult } = require("express-validator");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.post(
  "/api/register",
  [
    check("username", "Username cannot be empty!").notEmpty(),
    check("username", "Username length should be between 5 and 10!").isLength({
      min: 5,
      max: 10,
    }),
    check("password", "Password cannot be empty!").notEmpty(),
    check("password", "Password length should be between 5 and 10!").isLength({
      min: 5,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ error: errors });
    }
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
      var user = new Users.User({
        username: username,
        password: hash,
        role: "user",
      });
      await user
        .save()
        .then(() => {
          res.json({ isRegister: true });
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({ error: err });
          }
        });
    });
  }
);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({ error: "User doesn't exist" });
  }
  const hashPassword = user.password;
  bcrypt.compare(password, hashPassword).then(async (match) => {
    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    } else {
      const accessToken = token.createToken(user);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
      return res.json({ isLogin: true, role: user.role });
    }
  });
});

app.get("/api/profile", token.validateToken, (req, res) => {
  res.json({ isLogin: true });
});

app.get("/api/admin", token.validateRole(["admin"]), (req, res) => {
  res.json({ isLogin: true });
});

app.get("/api/logout", token.validateToken, (req, res) => {
  const accessToken = req.cookies["access-token"];
  res.cookie("access-token", accessToken, {
    maxAge: 0,
  });
  res.json("Success");
});

app.get("/api/products", async (req, res) => {
  var productsArray = await Products.Product.find({});
  res.json({ products: productsArray });
});
// подключение
mongoose.connect(process.env.mongooseConnection, function (err, db) {
  if (!err) {
    console.log("We are connected");
  } else console.log(err);
});

app.listen(port, () => {
  console.log("Server start");
});
