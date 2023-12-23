import { Injectable, type NestMiddleware, Logger } from "@nestjs/common";
import { type Request, type Response, type NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP Response");

  public use(req: Request, res: Response, next: NextFunction): void {
    res.on("finish", () => {
      this.logger.log(`${req.method} ${req.originalUrl}`);
    });
    next();
  }
}
