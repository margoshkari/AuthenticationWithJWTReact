const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post("/api/register", (req, res) => {
  res.json("register");
});

app.listen(port, () => {
  console.log("Server start");
});
