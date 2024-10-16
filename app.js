const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/", require("./routes"));

//? Middleware to log request and response
// app.use((req, res, next) => {
//   const originalSend = res.send;
//   let responseBody;

//   res.send = function (body) {
//     responseBody = body;
//     return originalSend.apply(this, arguments);
//   };

//   res.on("finish", () => {
//     console.log(`Method: ${req.method}`);
//     console.log(`Route: ${req.originalUrl}`);
//     console.log(`Status: ${res.statusCode}`);
//     console.log(`Time: [${new Date()}]`);
//     console.log(`Request Payload: ${JSON.stringify(req.body)}`);
//     console.log(`Response: ${responseBody}`);
//   });

//   next();
// });

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
