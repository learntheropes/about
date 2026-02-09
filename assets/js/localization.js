import find from 'lodash.find';

export const locales = [
  {
    code: 'en',
    file: 'en.js',
    language: 'en-US',
    name: 'English',
    default: true 

  }, 
  {
    code: 'es',
    file: 'es.js',
    language: 'es',
    name: 'Español'
  },
  {
    code: 'it',
    file: 'it.js',
    language: 'it',
    name: 'Italiano',
  }
];

export const localeCodes = locales.map(locale => locale.code);

export const defaultLocale = find(locales, { default: true }).code;