var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { Sequelize } = require("sequelize"); // Import Sequelize

// Import routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var BigVideosRouter = require("./routes/bigvideos");
var shortsVideosRouter = require("./routes/shortsvideos");
const watchlaterRouter = require("./routes/watchlater");

var app = express();


const config = require('./config/config.json')[process.env.NODE_ENV || 'development']; // Default to 'development'

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    dialectOptions: config.dialectOptions, // Include SSL settings
    logging: false, // Optional: Turn off query logging
  }
);

// // Sequelize Initialization
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres", // Use the appropriate database dialect (e.g., 'mysql', 'sqlite', etc.)
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // Important for Render's SSL setup
//     },
//   },
//   pool: {
//     max: 10, // Maximum number of connections
//     min: 1,  // Minimum number of connections
//     idle: 10000, // Time (ms) before releasing idle connections
//     acquire: 30000, // Time (ms) to wait for a connection
//   },
// });

// Retry Connection Logic
const retryOptions = { maxRetries: 5, retryDelay: 2000 };

const connectWithRetry = async (retries = retryOptions.maxRetries) => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (err) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      setTimeout(() => connectWithRetry(retries - 1), retryOptions.retryDelay);
    } else {
      console.error("Unable to connect to the database:", err);
      process.exit(1); // Exit the app if the connection fails completely
    }
  }
};

// Start the connection
connectWithRetry();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bigvideos", BigVideosRouter);
app.use("/shortsvideos", shortsVideosRouter);
app.use("/watchlater", watchlaterRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
