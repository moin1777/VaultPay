const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      msg: "you are not authenticated"
    });
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (verified.userId) {
      req.userId = verified.userId
      next();
    }
  } catch {
    return res.status(403).json({
      msg: "you are not authenticated"
    });
  }
}

module.exports = {
  authMiddleware
}