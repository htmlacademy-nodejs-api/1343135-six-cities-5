#!/usr/bin/env node

import { CliApplication } from './cli/cli-application.js';
import { HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './cli/commands/index.js';
import process from 'node:process';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cliApplication.runCommand(process.argv);
}

bootstrap();

// --generate <n> <filepath> <url>
// Создаёт файл в формате tsv с тестовыми данными. Параметр n задаёт количество генерируемых предложений. Параметр filepath указывает путь для сохранения файла с предложениями. Параметр <url> задаёт адрес сервера, с которого необходимо взять данные. Каждая строка в файле tsv содержит всю необходимую информацию для создания одного предложения по аренде (кроме комментариев).
