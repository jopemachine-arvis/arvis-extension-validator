import test from "ava";
import { validate } from "../dist/validator";
import fse from "fs-extra";

test("validate test - must be true", async t => {
  const jsonData = await fse.readJson("./test/mock-workflow.json");
  const { valid } = validate(jsonData, "workflow");
  t.is(valid, true);
});

test("validate test - must be false", async t => {
    const jsonData = await fse.readJson("./test/mock-invalid-workflow.json");
    const { valid } = validate(jsonData, "workflow");
    t.is(valid, false);
  });
  