#!/usr/bin/env node
import meow from 'meow';
import fse from 'fs-extra';
import { getHelpStr } from './helpStr';
import { validate } from './validator';
import chalk from 'chalk';

const cli = meow(getHelpStr(), {
  flags: {
    strict: {
      type: 'boolean',
      alias: 's',
      default: false,
      isRequired: () => false,
    }
  }
});

if (
  !cli.input[1] ||
  (cli.input[0] !== 'workflow' && cli.input[0] !== 'plugin')
) {
  console.error(chalk.red('Wrong input. please check readme.md'));
  process.exit(1);
}

fse.readJSON(cli.input[1]).then(jsonData => {
  const { errorMsg, valid } = validate(
    jsonData,
    cli.input[0] as 'workflow' | 'plugin',
    { strict: cli.flags.strict }
  );

  if (valid) console.log(chalk.greenBright(`${cli.input[1]} is valid`));
  else {
    console.error(chalk.redBright('Not valid file. \nReason:\n'));
    console.error(chalk.redBright(errorMsg));
  }
});
