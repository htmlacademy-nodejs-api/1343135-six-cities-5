import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { isObject } from '../../shared/utils/is-object.js';
import chalk from 'chalk';
import { getErrorMessage } from '../../shared/utils/get-error-message.js';

export class VersionCommand implements Command {
  private fileName = 'package.json';

  private getVersion() {
    const file = readFileSync(this.fileName, { encoding: 'utf-8'});
    const content = JSON.parse(file);

    if (isObject(content) && typeof content.version === 'string') {
      return content.version;
    }

    throw new Error('Failed to parse file content');
  }

  public getName() {
    return '--version';
  }

  public execute() {
    try {
      const version = this.getVersion();
      console.log(chalk.green(version));
    } catch (error) {
      console.error(chalk.red(`Can not read version from file "${this.fileName}"`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
