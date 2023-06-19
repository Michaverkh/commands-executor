export class FfmpegBuilder {
  private result: string = "-i /";
  private path: string = "";

  addpath(path: string) {
    this.path = path;
    this.result += path;
    return this;
  }

  addResolution(width: number, height: number) {
    this.result += ` -c:v libx264 -s ${width}x${height} /`;
    return this;
  }

  addName(name: string) {
    this.result += `${this.path}/${name}.mp4`;
    return this;
  }

  build(): string {
    return this.result;
  }
}
