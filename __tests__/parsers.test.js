import path from 'path';
import { fileURLToPath } from 'url';
import getData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.resolve(__dirname, '..', '__fixtures__');
const getFixture = (file) => getData(path.resolve(fixturesDir, file));

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

// eslint-disable-next-line jest/no-export
export default getFixture;
