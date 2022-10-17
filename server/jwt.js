const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    process.env.jwtstring
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ error: "User is not Authenticated!" });
  }

  try {
    const validToken = verify(accessToken, process.env.jwtstring);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = {
  createToken,
  validateToken,
};