#!/usr/bin/env node

import { CliApplication } from './cli/cliApplication.js';
import { HelpCommand, VersionCommand } from './cli/commands/index.js';
import process from 'node:process';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
  ]);
  cliApplication.runCommand(process.argv);
}

bootstrap();


/**
--help — выводит информацию о списке поддерживаемых команд. Полный список команд доступен в техническом задании к проекту. Эта команда используется по умолчанию (если пользователь не ввёл никакого параметра).
--version — выводит информации о версии приложения. Версия приложения считывается из файла package.json.
--import — импортирует данные из *.tsv-файла. Результат работы команды import должен выводиться в консоль.
*/
