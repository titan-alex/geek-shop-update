import fs from "fs";
import { Request } from 'express';


export class Logger{
    addLog(message: string | String ): void{
        // fs.appendFile("./logger/logs.txt", '\n\n[' + new Date() + ']\n' + message, (err) => {})
        const TelegramLogger = require('node-telegram-logger')
        let tg = new TelegramLogger('5954814248:AAFb5tiwtGStbNVsXQxI2SEmWxzrAYUIQjs','5954814248')
        const winston = require('winston')
        const logger = winston.createLogger({
            level: 'info',
            transports: [
              tg.setWinstonTransporter(tg)
            ]
          });
          logger.log('info', 'ff')
    }
    
    
    

    catcherErr(tryFunc: Function, endFunc?: Function){
        try{
            tryFunc()
        }
        catch(err){
            this.addLog(String(err));
            if(endFunc != undefined){
                endFunc();
            }
        }
    }
    
    renderPathClient(req: Request):  String{
        return this.getClient(req) + "\nrender page '" + req.url + "'"
    }
    
    getClient(req: Request): String{
        return String(req.headers['user-agent']);
    }

}