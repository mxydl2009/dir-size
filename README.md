# dir-size

> calculate the size of all files of a given directory, you can use it by cli or npm package.

## Install

```
// install locally
$ npm install @mxydl2009/dir-size
// install globally
$ npm install @mxydl2009/dir-size -g
```

## Usage

### usage for npm package
```js
// foo.js
const { size } = require('@mxydl2009/dir-size');

// 当前目录{__dirname}所有文件的大小
console.log(await size('./'));
```

### usage for cli
```bash
# calculate size of current working directory
$ dsize --dir .
```

## API

### size(path)

Returns a `Promise<number>` of all files size of path.

### sizeSync(path)

Returns a `number` of all files size of path.
