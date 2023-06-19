import { IStreamlogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamlogger {
  private static logger: IStreamlogger;
  private constructor() {}

  public static getInstanse(): IStreamlogger {
    if (!this.logger) {
      this.logger = new ConsoleLogger();
    }
    return this.logger;
  }

  log(...args: any): void {
    console.log(args);
  }

  error(...args: any): void {
    console.log(args);
  }

  end(): void {
    console.log("process completed");
  }
}
