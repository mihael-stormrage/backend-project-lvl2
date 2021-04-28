# gendiff

[![Actions Status](https://github.com/mihael-stormrage/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mihael-stormrage/backend-project-lvl2/actions)
[![Node CI](https://github.com/mihael-stormrage/backend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/mihael-stormrage/backend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/7126e7f421aede4e8735/maintainability)](https://codeclimate.com/github/mihael-stormrage/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7126e7f421aede4e8735/test_coverage)](https://codeclimate.com/github/mihael-stormrage/backend-project-lvl2/test_coverage)

    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Options:
      -V, --version        output the version number
      -f, --format [type]  output format
      -h, --help           output usage information

## Installation & Usage
### Stand-alone
Clone project, then:
```shell
make install
npm link

npx gendiff -h
```
### Library
```shell
yarn add mihael-stormrage/backend-project-lvl2
```
```js
import genDiff from 'gendiff';

genDiff(data1, data2);
```
