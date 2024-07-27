const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/cart"));
app.use("/api", require("./routes/products"));
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT, () => console.log("listening on port " + process.env.PORT));
  })
  .catch((err) => console.error(err, "error in mongodb connection"));
