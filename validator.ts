import { Validator } from "jsonschema";
const workflowSchema = require("../workflow-schema.json");
const pluginSchema = require("../plugin-schema.json");
const definitionSchema = require("../definitions.json");

const validator = new Validator();
validator.addSchema({ id: "./workflow-schema.json", ...workflowSchema }, "/Workflow");
validator.addSchema({ id: "./plugin-schema.json", ...pluginSchema }, "/Plugin");
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
