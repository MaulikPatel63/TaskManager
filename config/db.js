const mongoose = require("mongoose");
const ENV_VARS = require("./envVars.js");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB : " + error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
