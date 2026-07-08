const mongoose = require("mongoose");

async function connectMongoDB(blog) {
  return mongoose.connect(blog);
}

module.exports = { connectMongoDB };
