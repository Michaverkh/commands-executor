import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamlogger } from "../handlers/stream-logger.interface";
import { ICommandExecutor } from "./command.types";

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamlogger) {}

  public async execute(data: string) {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommandExecutor;
  protected abstract spawn(
    command: ICommandExecutor
  ): ChildProcessWithoutNullStreams;
  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamlogger
  ): void;
}
