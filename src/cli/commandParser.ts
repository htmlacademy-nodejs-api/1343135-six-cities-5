type ParsedCommand = {
  name: string;
  arguments: string[];
}

export class CommandParser {
  static parse(argv: string[]) {
    const commandIndex = argv.findIndex((argvItem) => argvItem.startsWith('--'));

    if (commandIndex < 0) {
      return null;
    }

    const parsedCommand: ParsedCommand = {
      name: argv[commandIndex],
      arguments: []
    };

    for (let i = commandIndex + 1; i < argv.length; i++) {
      if (argv[i].startsWith('--')) {
        break;
      }

      parsedCommand.arguments.push(argv[i]);
    }

    return parsedCommand;
  }
}
