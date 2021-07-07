/* eslint-disable @typescript-eslint/no-var-requires */
import { Validator } from 'jsonschema';
import chalk from 'chalk';
import isUrl from 'is-url';

const workflowSchema = require('../schema/workflow.json');
const pluginSchema = require('../schema/plugin.json');
const definitionSchema = require('../schema/definitions.json');

const validator = new Validator();
validator.addSchema({ id: './workflow.json', ...workflowSchema }, '/Workflow');
validator.addSchema({ id: './plugin.json', ...pluginSchema }, '/Plugin');
validator.addSchema({ id: './definitions.json', ...definitionSchema }, '/Definitions');

const validate = (
  jsonData: any,
  type: 'workflow' | 'plugin',
  options?: { strict?: boolean }
): { valid: boolean; errors: Error[]; errorMsg: string } => {
  const schema = type === 'workflow' ? workflowSchema : pluginSchema;
  const result = validator.validate(jsonData, schema);

  let valid = result.errors.length === 0;
  let errorMsg = result.errors.map(
    error =>
      chalk.bgRedBright.whiteBright(error.toString())
  ).join('\n\n');

  const { webAddress, description, version, platform, defaultIcon } = jsonData;

  if (options && options.strict) {
    if (!webAddress || !isUrl(webAddress)) {
      valid = false;
      errorMsg = 'Please type valid \'webAddress\' value of extension';
    }
    if (!description) {
      valid = false;
      errorMsg = 'Please type valid \'description\' value of extension';
    }
    if (!version) {
      valid = false;
      errorMsg = 'Please type valid \'version\' value of extension';
    }
    if (platform && (!platform.length || platform.length === 0)) {
      valid = false;
      errorMsg = 'Please type valid \'platform\' value of extension';
    }
    if (!defaultIcon) {
      valid = false;
      errorMsg = 'Extension don\'t have dafault icon. Recommend to use icon on extension';
    }
  }

  return {
    valid,
    errors: result.errors,
    errorMsg
  };
};

export { validator, validate };
