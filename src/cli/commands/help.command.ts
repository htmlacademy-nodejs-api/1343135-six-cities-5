import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public execute(){
    console.log(`
Программа для подготовки данных для REST API сервера.

Пример: cli.js ${chalk.cyan('<command>')} ${chalk.magenta('[arguments]')}

Команды:

${chalk.cyan('--version')}:                   ${chalk.gray('# выводит номер версии')}
${chalk.cyan('--help')}:                      ${chalk.gray('# печатает этот текст')}
${chalk.cyan('--import')} ${chalk.magenta('<path>')}:             ${chalk.gray('# импортирует данные из TSV')}
${chalk.cyan('--generate')} ${chalk.magenta('<n> <path> <url>')}: ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
