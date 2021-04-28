import fs from 'fs';
import path from 'path';
import outdent from 'outdent';
import gendiff, { getData } from '../src';

test('getData(path)', () => {
  expect(getData('fixtures/file2.json')).toEqual({
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
