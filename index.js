const sizeAsync = require('./size.async');
const { sizeSync } = require('./size.sync');

module.exports = {
  size: sizeAsync,
  sizeSync
}