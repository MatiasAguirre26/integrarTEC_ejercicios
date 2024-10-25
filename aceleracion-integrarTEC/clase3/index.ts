import * as fs from 'fs';

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface LoggerConfig {
  minLevel: LogLevel;
  dateFormat: string;
  destination: "consola" | "archivo";
}

const logLevelPriority: Record<LogLevel, number> = {
  "DEBUG": 1,
  "INFO": 2,
  "WARN": 3,
  "ERROR": 4
};

class Logger {
  private minLevel: LogLevel;
  private dateFormat: string;
  private destination: "consola" | "archivo";

  constructor(config: LoggerConfig) {
    this.minLevel = config.minLevel;
    this.dateFormat = config.dateFormat;
    this.destination = config.destination;
  }

  private formatDate(): string {
    const now = new Date();
    return this.dateFormat
      .replace("YYYY", now.getFullYear().toString())
      .replace("MM", (now.getMonth() + 1).toString().padStart(2, "0"))
      .replace("DD", now.getDate().toString().padStart(2, "0"))
      .replace("HH", now.getHours().toString().padStart(2, "0"))
      .replace("mm", now.getMinutes().toString().padStart(2, "0"))
      .replace("ss", now.getSeconds().toString().padStart(2, "0"));
  }

  private shouldLog(level: LogLevel): boolean {
    return logLevelPriority[level] >= logLevelPriority[this.minLevel];
  }

  public setDestination(newDestination: "consola" | "archivo"): void {
    this.destination = newDestination;
  }

  public log(level: LogLevel, message: string): void {
    if (!this.shouldLog(level)) {
      return; 
    }

    const formattedMessage = `[${this.formatDate()}] [${level}]: ${message}`;

    if (this.destination === "consola") {
      console.log(formattedMessage);
    } else if (this.destination === "archivo") {
      fs.appendFileSync('log.txt', formattedMessage + '\n', 'utf8');
    }
  }
}


const logger = new Logger({
  minLevel: "INFO",
  dateFormat: "YYYY-MM-DD HH:mm:ss",
  destination: "consola",
});

logger.log("DEBUG", "Este es un mensaje de depuración."); 
logger.log("INFO", "Información relevante."); 
logger.log("WARN", "Advertencia!"); 
logger.log("ERROR", "Error grave!"); 

logger.setDestination("archivo");
logger.log("ERROR", "Error que va al archivo.");
