#!/usr/bin/env node
import meow from 'meow';
import fse from 'fs-extra';
import chalk from 'chalk';
import { getHelpStr } from './helpStr';
import { validate } from './validator';
import { parse as parseJson5 } from 'json5';

const readJson5 = async (filepath: string) => {
  return new Promise((resolve, reject) => {
    fse
      .readFile(filepath, { encoding: 'utf-8' })
      .then((content) => {
        try {
          resolve(parseJson5(content));
        } catch (err) {
          reject(err);
        }
        return null;
      })
      .catch(reject);
  });
};

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

readJson5(cli.input[1]).then(jsonData => {
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
