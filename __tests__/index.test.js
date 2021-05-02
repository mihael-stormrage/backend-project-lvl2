import path from 'path';
import { fileURLToPath } from 'url';
import outdent from 'outdent';
import genDiff, { gendiff } from '../src';
import getData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.resolve(__dirname, '..', '__fixtures__');
const getFixture = (file) => getData(path.resolve(fixturesDir, file));

let data1;
let data2;

beforeEach(() => {
  data1 = getFixture('file1.json');
  data2 = getFixture('file2.json');
});

test('getData(path)', () => {
  const obj1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const obj2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  expect(getFixture('file1.json')).toEqual(obj1);
  expect(getFixture('file1.yaml')).toEqual(obj1);
  expect(getFixture('file2.yml')).toEqual(obj2);
});

test('gendiff --help', () => {
  expect(gendiff.helpInformation().trim()).toBe(outdent`
    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Options:
      -V, --version        output the version number
      -f, --format [type]  output format
      -h, --help           output usage information`);
});

test('genDiff(data1, data2) fn', () => {
  expect(genDiff(data1, data1)).toBe('No difference');
  expect(genDiff(data1, data2)).toBe(outdent`
    {
      - follow: false
        host: hexlet.io
      - proxy: 123.234.53.22
      - timeout: 50
      + timeout: 20
      + verbose: true
    }`);
});
