import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error('Unknown output format');
  }
};

export default getFormatter;
