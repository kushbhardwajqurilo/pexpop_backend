const app = require("./app");
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();

const PORT = process.env.PORT || 1337;
// const HOST = process.env.HOST

server.listen(PORT, function () {
  console.log(`server started`);
});
