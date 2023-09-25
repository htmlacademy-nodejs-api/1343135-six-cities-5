import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/utils/get-error-message.js';
import { TSVOfferParser } from '../../shared/lib/tsv-offer-parser/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filepath?: string) {
    try {
      if (!filepath) {
        throw new Error('Path to *.tsv file should be provided');
      }

      const tsvString = readFileSync(filepath, { encoding: 'utf-8' });

      console.log(TSVOfferParser.parse(tsvString));
    } catch (error) {
      console.error(chalk.red('File import failed'));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

}
