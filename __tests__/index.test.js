/* eslint-plugin-disable fp */
/* eslint-disable fp/no-let, fp/no-mutation */

import fs from 'fs';
import path from 'path';
import { genDiff, program } from '../src';
import getData from '../src/parsers';
import { plain, json } from '../src/formatters';

const getFixturePath = (file) => path.join('__fixtures__', file);
const getFixture = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const getFixtureData = (file) => getData(path.join('__fixtures__', file));

let data1;
let data2;

beforeEach(() => {
  data1 = getFixtureData('file1.json');
  data2 = getFixtureData('file2.yml');
});

test('gendiff --help', () => {
  expect(program.helpInformation()).toBe(getFixture('help'));
});

test('genDiff(data1, data2) fn', () => {
  expect(genDiff(data1, data1)).toBe('No difference');
  expect(genDiff(data1, data2)).toBe(getFixture('stylish').trim());
});

test('diff plain format', () => {
  expect(genDiff(data1, data2, plain)).toBe(getFixture('plain').trim());
});

test('diff in json format', () => {
  expect(genDiff(data1, data2, json)).toMatchSnapshot();
});
