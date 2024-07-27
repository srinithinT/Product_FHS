const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/signup", async function (req, res) {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    console.log(userExists, "userExists");
    if (userExists) {
      console.log(userExists, "userexists");
      return res.status(404).json({ message: "user already exists" });
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    // jwt token generation
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log(user, token, "user signed up successfully");
    res.status(200).json(token);
  } catch (e) {
    console.log(e, "error in signup");
    res.status(401).json({ message: "sign up failed" });
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //comparing the passwords
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (user && passwordCheck) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "password doesn't match" });
    }
  } catch (e) {
    res.status(500).json({ message: "login failed" });
  }
});
router.get("/profile", authMiddleware, async function (req, res) {
  console.log(req.user, "req user");
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (e) {
    res.status(404).json({ message: "user not found" });
  }
});
module.exports = router;
