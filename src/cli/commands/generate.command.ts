import chalk from 'chalk';
import { Command } from './command.interface.js';
import got from 'got';
import { getErrorMessage } from '../../shared/utils/get-error-message.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TSVFileWriter } from '../../shared/lib/tsv-file-writer/index.js';
import { TSVOfferGenerator } from '../../shared/lib/tsv-offer-generator/index.js';

export class GenerateCommand implements Command {
  private async getSourceData<T>(url: string): Promise<T> {
    try {
      return await got.get(url).json();
    } catch (error) {
      console.error(chalk.red(`Can not get mock data from "${url}"`));
      throw error;
    }
  }

  private async write(source: MockServerData, filepath: string, count: number) {
    const fileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < count; i++) {
      const line = TSVOfferGenerator.generate(source);
      await fileWriter.write(line);
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(n?: string, filepath?: string, url?: string) {
    const offerCount = Number(n);
    if (!(n && filepath && url) || Number.isNaN(offerCount)) {
      console.error(chalk.red('Invalid arguments. See "--help"'));
      return;
    }

    try {
      const sourceData = await this.getSourceData<MockServerData>(url);
      await this.write(sourceData, filepath, offerCount);

      console.log(`Data generation finished. File: "${filepath}"`);
    } catch (error) {
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
