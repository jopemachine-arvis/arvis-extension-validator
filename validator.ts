import { Validator } from "jsonschema";
const workflowSchema = require("../schema/workflow.json");
const pluginSchema = require("../schema/plugin.json");
const definitionSchema = require("../schema/definitions.json");

const validator = new Validator();
validator.addSchema({ id: "./workflow.json", ...workflowSchema }, "/Workflow");
validator.addSchema({ id: "./plugin.json", ...pluginSchema }, "/Plugin");
validator.addSchema({ id: "./definitions.json", ...definitionSchema }, "/Definitions");

const validate = (
  jsonData: object,
  type: "workflow" | "plugin"
): { valid: boolean; errors: Error[]; errorMsg: string } => {
  const schema = type === "workflow" ? workflowSchema : pluginSchema;
  const result = validator.validate(jsonData, schema);
  const errorMsg = result.errors.map(
    error =>
      `'${error.instance}' ${error.message}\nError path: '${error.property}'`
  ).join('\n\n');

  return {
    valid: result.errors.length === 0,
    errors: result.errors,
    errorMsg
  };
};

export { validator, validate };
