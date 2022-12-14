"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    addLog(message) {
        // fs.appendFile("./logger/logs.txt", '\n\n[' + new Date() + ']\n' + message, (err) => {})
        const TelegramLogger = require('node-telegram-logger');
        let tg = new TelegramLogger('5954814248:AAFb5tiwtGStbNVsXQxI2SEmWxzrAYUIQjs', '5954814248');
        const winston = require('winston');
        const logger = winston.createLogger({
            level: 'info',
            transports: [
                tg.setWinstonTransporter(tg)
            ]
        });
        logger.log('info', 'ff');
    }
    catcherErr(tryFunc, endFunc) {
        try {
            tryFunc();
        }
        catch (err) {
            this.addLog(String(err));
            if (endFunc != undefined) {
                endFunc();
            }
        }
    }
    renderPathClient(req) {
        return this.getClient(req) + "\nrender page '" + req.url + "'";
    }
    getClient(req) {
        return String(req.headers['user-agent']);
    }
}
exports.Logger = Logger;
