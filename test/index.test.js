const assert = require('assert');
const { size, sizeSync } = require('../dist/index');
const mock = require('mock-fs');

describe('size of /mock', function() {
  beforeEach(() => {
    mock({
      '/mock/test': {
        'test_1.txt': '111',
        'test_2.txt': '222'
      },
      '/mock/1': {
        '2': {
          "3": {
            'big': '11111111111111111111'
          }
        }
      },
      '/mock/pic.png': Buffer.from([1, 2, 3, 4, 5, 6])
    });
  })

  it('async size should be 32', async function() {
    const totalSize = await size('/mock');
    assert.equal(totalSize, 32);
  });

  it('sync size should be 32', async function() {
    const totalSizeSync = sizeSync('/mock');
    assert.equal(totalSizeSync, 32);
  });
});