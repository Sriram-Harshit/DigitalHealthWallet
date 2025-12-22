const { createLogger, format, transports } = require("winston");
const chalk = require("chalk");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return (
        chalk.gray(`[${timestamp}]`) +
        " " +
        chalk.green(level) +
        chalk.green(":") +
        " " +
        chalk.white(message)
      );
    })
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
