const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const UserScheme = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("users", UserScheme);

module.exports = {
  User,
};
