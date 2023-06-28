import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExecFfmpeg } from "../../core/executor/command.types";
import { FileService } from "../../core/files/file.service";
import { IStreamlogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { IFfmpegInput } from "./ffmpeg.types";
import { Streamhandler } from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  constructor(logger: IStreamlogger) {
    super(logger);
  }
  private promptService = new PromptService();
  private fileService = new FileService();

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>(
      "input width",
      "number"
    );
    const height = await this.promptService.input<number>(
      "input height",
      "number"
    );
    const path = await this.promptService.input<string>("input path", "string");
    const name = await this.promptService.input<string>(
      "input file name",
      "string"
    );
    return { width, height, path, name };
  }

  protected build(input: IFfmpegInput): ICommandExecFfmpeg {
    const { width, height, path, name } = input;
    const output = this.fileService.getFilePath(path, name, "mp4");
    const args = new FfmpegBuilder()
      .addName(name)
      .addpath(output)
      .addResolution(width, height)
      .build();

    return {
      command: "ffmpeg",
      args: [args],
      output,
    };
  }

  protected spawn({
    output,
    command,
    args,
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);
  }

  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamlogger
  ): void {
    const handler = new Streamhandler(logger);
    handler.processOutput(stream);
  }
}
