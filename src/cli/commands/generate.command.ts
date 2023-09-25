import chalk from 'chalk';
import { Command } from './command.interface.js';
import got from 'got';
import { getErrorMessage } from '../../shared/utils/get-error-message.js';

export class GenerateCommand implements Command {
  private async getSourceData(url?: string) {
    if (!url) {
      throw new Error('No server url provided');
    }

    const response = await got.get(url);
    return response;
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(n?: string, filepath?: string, url?: string) {
    try {
      const source = await this.getSourceData(url);
    } catch (error) {
      console.error(chalk.red('Error getting source data'));
      console.error(chalk.red(getErrorMessage(error)));
    }
    // call <url> and get source data
    // create tsv line from source data
    // write line to <filepath>
    // repeat n times
  }

}
