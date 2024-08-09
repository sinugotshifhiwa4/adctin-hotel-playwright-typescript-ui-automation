import winston from "winston";
import path from "path";
import moment from "moment-timezone";
import fs from "fs";

const currentDir = __dirname;
// Go one level above (back to 'tests')
const srcDir = path.resolve(currentDir, "../..");

// Change to 'logs' folder
const loggingDir = path.resolve(srcDir, "logs");

// Ensure the logs directory exists
if (!fs.existsSync(loggingDir)) {
  fs.mkdirSync(loggingDir);
}

// Function to format log entries with timestamp and timezone
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Set the desired timezone
const timeZone = "Africa/Johannesburg"; // For Johannesburg

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_run.log"),
      maxFiles: 5, // Number of log files to retain
      maxsize: 10 * 1024 * 1024, // 10 MB, specify the size in bytes
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(loggingDir, "test_error.log"),
      maxFiles: 5, // Number of log files to retain
      maxsize: 10 * 1024 * 1024, // 10 MB, specify the size in bytes
      level: "error",
    }),
  ],
});

export default logger;
