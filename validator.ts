import { Validator } from "jsonschema";
const workflowSchema = require("../workflow-schema.json");
const pluginSchema = require("../plugin-schema.json");

const validator = new Validator();
validator.addSchema({ id: "/Workflow", ...workflowSchema }, "/Workflow");
validator.addSchema({ id: "/Plugin", ...pluginSchema }, "/Plugin");

const validate = (
  jsonData: object,
  type: "workflow" | "plugin"
): { valid: boolean; errors: Error[] } => {
  const schema = type === "workflow" ? workflowSchema : pluginSchema;
  const result = validator.validate(jsonData, schema);
  return {
    valid: result.errors.length === 0,
    errors: result.errors
  };
};

export { validator, validate };
