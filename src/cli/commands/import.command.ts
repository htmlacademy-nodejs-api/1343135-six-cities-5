import { Command } from './command.interface.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/utils/get-error-message.js';
import { TSVOfferParser } from '../../shared/lib/tsv-offer-parser/index.js';
import { TSVFileReader } from '../../shared/lib/tsv-file-reader/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(filepath?: string) {
    try {
      if (!filepath) {
        throw new Error('Path to *.tsv file should be provided');
      }

      const fileReader = new TSVFileReader(filepath);

      fileReader.on('line', (line: string) => {
        console.log(TSVOfferParser.parse(line));
      });
      fileReader.on(
        'end',
        (lineCount: number) => console.log(`Import is finished. Created ${lineCount} offers`)
      );
      await fileReader.read();
    } catch (error) {
      console.error(chalk.red('File import failed'));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

}
