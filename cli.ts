#!/usr/bin/env node
import meow from "meow";
import fse from "fs-extra";
import { getHelpStr } from "./helpStr";
import { validate } from "./validator";

const cli = meow(getHelpStr());

if (
  !cli.input[1] ||
  (cli.input[0] !== "workflow" && cli.input[0] !== "plugin")
) {
  console.error("Wrong input. please check readme.md");
  process.exit(1);
}

fse.readJSON(cli.input[1]).then(jsonData => {
  console.log(validate(jsonData, cli.input[0] as "workflow" | "plugin"));
});
