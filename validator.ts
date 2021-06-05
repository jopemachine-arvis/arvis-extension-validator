import { Validator } from "jsonschema";
const workflowSchema = require("./workflow-schema.json");
const pluginSchema = require("./plugin-schema.json");

const validator = new Validator();
validator.addSchema({ id: "/Workflow", ...workflowSchema }, "/Workflow");
validator.addSchema({ id: "/Plugin", ...pluginSchema }, "/Plugin");

const validate = (jsonData: object, type: "workflow" | "plugin") => {
  const schema = type === "workflow" ? workflowSchema : pluginSchema;
  return validator.validate(jsonData, schema);
};

export { validator, validate };
