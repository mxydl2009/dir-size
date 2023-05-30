# dir-size

> calculate the size of all files of a given directory

## Install

```
$ npm install @mxydl2009/dir-size
```

## Usage

```js
// foo.js
const { size } = require('@mxydl2009/dir-size');

// 当前目录{__dirname}所有文件的大小
console.log(await size('./'));
```

## API

### size(path)

Returns a `Promise<number>` of all files size of path.

### sizeSync(path)

Returns a `number` of all files size of path.
