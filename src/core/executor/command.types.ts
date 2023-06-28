export interface ICommandExecutor {
  command: string;
  args: string[];
}

export interface ICommandExecFfmpeg extends ICommandExecutor {
  output: string;
}
