import path from 'path';
import { fileURLToPath } from 'url';
import outdent from 'outdent';
import genDiff, { gendiff, getData } from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.resolve(__dirname, 'fixtures');
const getFixture = (file) => getData(path.resolve(fixturesDir, file));

let data1;
let data2;

beforeEach(() => {
  data1 = getFixture('file1.json');
  data2 = getFixture('file2.json');
});

test('getData(path)', () => {
  expect(getFixture('file2.json')).toEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
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
