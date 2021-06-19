const fse = require("fs-extra");

(async function() {
  const pluginSchema = await fse.readJSON("schema/plugin.json");
  pluginSchema["properties"]["actions"]["items"]["$ref"] =
    "https://raw.githubusercontent.com/jopemachine/arvis-extension-validator/master/schema/definitions.json#/definitions/command";

  const workflowSchema = await fse.readJSON("schema/workflow.json");
  workflowSchema["properties"]["commands"]["items"]["$ref"] =
    "https://raw.githubusercontent.com/jopemachine/arvis-extension-validator/master/schema/definitions.json#/definitions/command";

  workflowSchema["additionalProperties"] = false;
  pluginSchema["additionalProperties"] = false;
  
  await fse.writeJson("workflow-schema.json", workflowSchema, {
    encoding: "utf8",
    spaces: 4
  });
  await fse.writeJson("plugin-schema.json", pluginSchema, {
    encoding: "utf8",
    spaces: 4
  });

  workflowSchema["additionalProperties"] = true;
  pluginSchema["additionalProperties"] = true;

  await fse.writeJson("workflow-schema-non-strict.json", workflowSchema, {
    encoding: "utf8",
    spaces: 4
  });
  await fse.writeJson("plugin-schema-non-strict.json", pluginSchema, {
    encoding: "utf8",
    spaces: 4
  });
})();
