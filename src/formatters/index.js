import stylish from './stylish.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return stylish;
    default:
      throw new Error('Unknown output format');
  }
};

export default getFormatter;
