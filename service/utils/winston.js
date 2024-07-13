import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

function ensureLogDirectory() {
  const logDirectory = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {recursive: true});
  }
  return logDirectory;
}

// 创建日志文件传输配置
function createFileTransport(logDirectory) {
  return new DailyRotateFile({
    filename: path.join(logDirectory, 'admin-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
  });
}

// 创建控制台传输配置
function createConsoleTransport() {
  return new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.simple()
    )
  });
}

const logDirectory = ensureLogDirectory();
const transport = createFileTransport(logDirectory);
const consoleTransport = createConsoleTransport();

// 初始化并导出logger
export const logger = winston.createLogger({
  transports: [
    transport,
    consoleTransport
  ]
});
