import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';

export class CliApplication {
  private commands: Record<string, Command> = {};
  private defaultCommandName = '--help';

  public registerCommands(commands: Command[]) {
    for (const command of commands) {
      const name = command.getName();
      if (this.commands[name]) {
        throw new Error(`Command ${name} is already registered`);
      }
      this.commands[name] = command;
    }
  }

  public runCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);

    if (parsedCommand && this.commands[parsedCommand.name]) {
      this.commands[parsedCommand.name].execute(...parsedCommand.arguments);
      return;
    }

    if (this.commands[this.defaultCommandName]) {
      this.commands[this.defaultCommandName].execute();
      return;
    }

    throw new Error('Default command is not provided');
  }
}
