#!/usr/bin/env node

import { CliApplication } from './cli/cliApplication.js';
import { HelpCommand, VersionCommand, ImportCommand } from './cli/commands/index.js';
import process from 'node:process';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);
  cliApplication.runCommand(process.argv);
}

bootstrap();
