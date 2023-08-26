const serverless = require("serverless-http");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./src/database/dbConfig");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./src/middlewares/errorHandler");

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/user", require("./src/routes/userRoutes"));

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === "local") {
  const PORT = 3000;
  app.listen(PORT, () =>
    console.log(`Sever is live on: http://localhost:${PORT}`)
  );
}

module.exports.handler = serverless(app);
