# arvis-extension-validator
[![CodeFactor](https://www.codefactor.io/repository/github/jopemachine/arvis-extension-validator/badge)](https://www.codefactor.io/repository/github/jopemachine/arvis-extension-validator)
[![NPM download total](https://img.shields.io/npm/dt/arvis-extension-validator)](http://badge.fury.io/js/arvis-extension-validator)
[![CI](https://github.com/jopemachine/arvis-extension-validator/actions/workflows/main.yml/badge.svg)]()
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![GitHub issues](https://img.shields.io/github/issues/jopemachine/arvis-extension-validator.svg)](https://GitHub.com/jopemachine/arvis-extension-validator/issues/)

> [Arvis](https://github.com/jopemachine/arvis) extension's JSON schema, cli and library to validate this.

## Install

```
$ npm install -g arvis-extension-validator
```

## Schema

All schema files could be developed in the `schema` folder.

The files in the project root path are there to be imported from online directly.

`non-strict` files allow `additionalProperties`.

library's validator use `non-strict` file.

Recommend to use normal `strict` file when developing extension.

## How to add schema

Just add to below line to `arvis-workflow.json`

```json
{
  "$schema": "https://raw.githubusercontent.com/jopemachine/arvis-extension-validator/master/workflow-schema.json"
}
```

In case of `plugin`,

```json
{
  "$schema": "https://raw.githubusercontent.com/jopemachine/arvis-extension-validator/master/plugin-schema.json"
}
```

## Cli Usage

```
Usage
  $ arvis-validate workflow arvis-workflow.json
  $ arvis-validate plugin arvis-plugin.json
```

## Related

- [arvish](https://github.com/jopemachine/arvish) - Arvis workflow, plugin creator tools
