const mongoose = require("mongoose");
const app = require("./src/app");
const { connectDB } = require("./config/db");
const ENV_VARS = require("./config/envVars");

const PORT = ENV_VARS.PORT || 5000;
const MONGO_URI = ENV_VARS.MONGO_URI;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
