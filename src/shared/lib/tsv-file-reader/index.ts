import { createReadStream } from 'node:fs';
import { EventEmitter } from 'node:stream';

const CHUNK_SIZE = 4096;

export class TSVFileReader extends EventEmitter {
  constructor(private readonly filepath: string) {
    super();
  }

  public async read() {
    const readStream = createReadStream(
      this.filepath,
      { encoding: 'utf-8', highWaterMark: CHUNK_SIZE }
    );

    let currentString = '';
    let endOfLineIndex = -1;
    let lineCount = 0;

    for await (const chunk of readStream) {
      currentString += chunk.toString();
      endOfLineIndex = currentString.indexOf('\n');

      while (endOfLineIndex >= 0) {
        this.emit('line', currentString.slice(0, endOfLineIndex + 1));
        lineCount++;
        currentString = currentString.slice(endOfLineIndex + 1);
        endOfLineIndex = currentString.indexOf('\n');
      }
    }

    this.emit('end', lineCount);
  }
}
