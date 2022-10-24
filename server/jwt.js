const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id, role: user.role },
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

const validateRole = (roles) => {
  return function (req, res, next) {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
      return res.status(400).json({ error: "User is not Authenticated!" });
    }

    try {
      const { role: userRole } = verify(accessToken, process.env.jwtstring);
      let hasAccess = false;

      if (roles.includes(userRole)) {
        hasAccess = true;
      }

      if (!hasAccess) {
        return res.status(400).json({ error: "You have not access!" });
      }
      next();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
};
module.exports = {
  createToken,
  validateToken,
  validateRole,
};
