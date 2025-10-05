import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import logger from "./utils/logger";

const port = config.port;
const mongoUri = config.mongoUri;

console.log('Mongo URI:', mongoUri);

// connect to mongo db
mongoose
  .connect(mongoUri)
  .then(() => {
    logger.info("Connected to MongoDB");
    // listen for requests
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error);
    process.exit(1);
  });

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", reason);
  process.exit(1);
});
