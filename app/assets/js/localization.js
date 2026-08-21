import find from 'lodash.find';

export const locales = [
  {
    code: 'es',
    file: 'es.js',
    language: 'es-419',
    name: 'Castellano'
  },
  {
    code: 'en',
    file: 'en.js',
    language: 'en-US',
    name: 'English'
  },
  {
    code: 'it',
    file: 'it.js',
    language: 'it-CH',
    name: 'Italiano',
  }
];

export const localeCodes = locales.map(locale => locale.code);