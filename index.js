const sizeAsync = require('./size.async');
const { sizeSync, sizeSyncTest } = require('./size.sync');

module.exports = {
  size: sizeAsync,
  sizeSync,
  sizeSyncTest
}