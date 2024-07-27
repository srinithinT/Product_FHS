const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  let token = "";
  if (req.headers.authorization) {
    try {
      console.log(req.headers.authorization, req.headers.authorization.split(" ")[1], "authorizations");
      token = req.headers.authorization.split(" ")[1];
      const decodedPassword = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedPassword, "decoded password");
      req.user = await User.findById(decodedPassword.id).select("-password");
      console.log(req.user, req.body, "req userr authorized");
      next();
    } catch (e) {
      res.status(401).json({ message: "Not Authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not Authorized" });
  }
};
module.exports = authMiddleware;
