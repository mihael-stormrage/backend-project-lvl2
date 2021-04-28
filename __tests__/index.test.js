import outdent from 'outdent';
import gendiff from '../src';

test('gendiff --help', () => {
  expect(gendiff.helpInformation().trim()).toBe(outdent`
    Usage: gendiff [options]

    Compares two configuration files and shows a difference.

    Options:
      -V, --version        output the version number
      -f, --format [type]  output format
      -h, --help           output usage information`);
});
