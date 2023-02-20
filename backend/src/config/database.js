require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.DATABASE_URL;

mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
