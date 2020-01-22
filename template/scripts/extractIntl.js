'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';


const extractReactIntlMessages = require('extract-react-intl-messages');
const languages = process.argv.slice(2);

extractReactIntlMessages(
  languages,
  './src/**/*.messages.ts',
  './src/translations',
  {
    format: 'json',
    flat: true,
  }
);
