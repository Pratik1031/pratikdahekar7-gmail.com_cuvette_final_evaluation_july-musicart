const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
// cors setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// app configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(" Hello , Welcome to Music Art Application");
});

const user_routes = require("./routes/user.routes");

app.use("/api/V1/users", user_routes);

module.exports = app;
