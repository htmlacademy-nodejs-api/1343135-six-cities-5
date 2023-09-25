import { WriteStream, createWriteStream } from 'node:fs';

export class TSVFileWriter {
  private writeStream: WriteStream;
  constructor(private readonly filepath: string) {
    this.writeStream = createWriteStream(
      this.filepath,
      { encoding: 'utf-8', flags: 'w', autoClose: true }
    );
  }

  public async write(line: string) {
    if (!this.writeStream.write(line)) {
      await new Promise((resolve) => {
        this.writeStream.once('drain', resolve);
      });
    }
  }
}
