const express = require("express");
const cors = require("cors");
const entryRoute = require("./src/routes/Authroute");
const managerRoute = require("./src/routes/Manageroute");
const app = express();
const path = require("path");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  return res.sendFile(path.join(__dirname, "screen.html"));
});
app.use("/auth", entryRoute);
app.use("/manager", managerRoute);

module.exports = app;
