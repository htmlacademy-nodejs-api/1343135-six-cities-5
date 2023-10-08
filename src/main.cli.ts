#!/usr/bin/env node

import 'reflect-metadata';
import process from 'node:process';

import { CliApplication } from './cli/cli-application.js';
import { HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './cli/commands/index.js';
import { PinoLogger } from './shared/lib/logger/index.js';
import { MongoDatabaseClient } from './shared/lib/database-client/index.js';
import { DefaultUserService, UserModel } from './shared/modules/user/index.js';
import { DefaultOfferService, OfferModel } from './shared/modules/offer/index.js';
import { RestConfig } from './shared/lib/config/index.js';

function bootstrap() {
  const cliApplication = new CliApplication();
  const logger = new PinoLogger();

  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(
      logger,
      new RestConfig(logger),
      new MongoDatabaseClient(logger),
      new DefaultUserService(logger, UserModel),
      new DefaultOfferService(logger, OfferModel),
    ),
    new GenerateCommand(),
  ]);

  cliApplication.runCommand(process.argv);
}

bootstrap();
