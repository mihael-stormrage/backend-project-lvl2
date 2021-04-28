import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import outdent from 'outdent';
import gendiff, { getData } from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.resolve(__dirname, 'fixtures');

test('getData(path)', () => {
  expect(getData(path.resolve(fixturesDir, 'file2.json'))).toEqual({
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
