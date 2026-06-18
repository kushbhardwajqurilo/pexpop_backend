const dotenv = require("dotenv");
dotenv.config({});
const mongoose = require("mongoose");
mongoose.connect(`${process.env.DB_URL}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  mongodb://127.0.0.1:27017
