const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(" Hello , Welcome to Music Art Application");
});

module.exports = app;
