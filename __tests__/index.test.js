import outdent from 'outdent';
import genDiff, { gendiff } from '../src';
import getFixture from './parsers.test.js';

let data1;
let data2;

beforeEach(() => {
  data1 = getFixture('file1.json');
  data2 = getFixture('file2.json');
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
