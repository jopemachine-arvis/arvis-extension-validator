import test from "ava";
import { validate } from "../dist/validator";
import fse from "fs-extra";

test("workflow validate test 1 - must be true", async t => {
  const jsonData = await fse.readJson("./test/mock-workflow.json");
  const { valid } = validate(jsonData, "workflow");
  t.is(valid, true);
});

// test("workflow validate test 2 - must be false", async t => {
//   const jsonData = await fse.readJson("./test/invalid-mock-workflow.json");
//   const { valid } = validate(jsonData, "workflow");
//   t.is(valid, false);
// });

// test("plugin validate test 1 - must be true", async t => {
//   const jsonData = await fse.readJson("./test/mock-plugin.json");
//   const { valid } = validate(jsonData, "workflow");
//   t.is(valid, true);
// });

// test("plugin validate test 2 - must be false", async t => {
//   const jsonData = await fse.readJson("./test/invalid-mock-plugin.json");
//   const { valid } = validate(jsonData, "workflow");
//   t.is(valid, false);
// });
