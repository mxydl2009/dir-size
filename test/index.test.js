const assert = require('assert');
const { expect } = require('chai');
const { size, sizeSync } = require('../src/index.js').default;
const mock = require('mock-fs');

describe('size of /mock with size function', function() {
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
      '/mock/pic.png': Buffer.from([1, 2, 3, 4, 5, 6]),
      '/test.js': 'console.log("hello")'
    });
  })

  after(() => {
    // 必须还原为原系统的file system，否则会进行各种文件系统报错，如测试框架可能会由于文件系统是mock的而报错
    mock.restore();
  })

  it('async size should be 32', async function() {
    const totalSize = await size('/mock');
    assert.equal(totalSize, 32);
  });

  it('size of /notExisted will throw an error', function(done) {
    size('/notExisted').catch(err => {
      done();
    })
  });

  it('size of /test.js will throw an error', function(done) {
    size('/test.js').catch(err => {
      done();
    })
  });

});


describe('size of /mock with sizeSync function', function() {
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
      '/mock/pic.png': Buffer.from([1, 2, 3, 4, 5, 6]),
      '/test.js': 'console.log("hello")'
    });
  })

  after(() => {
    // 必须还原为原系统的file system，否则会进行各种文件系统报错，如测试框架可能会由于文件系统是mock的而报错
    mock.restore();
  })

  it('sync size should be 32', function() {
    const totalSizeSync = sizeSync('/mock');
    assert.equal(totalSizeSync, 32);
  });

  it('sizeSync of /notExisted will throw an error', function() {
    expect(sizeSync.bind('/notExisted')).to.throw()
  });

  it('sizeSync of /test.js will throw an error', function() {
    expect(sizeSync.bind('/test.js')).to.throw()
  });

});