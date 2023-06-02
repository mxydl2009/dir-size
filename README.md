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

// size of current working directory, exclude node_modules directory
console.log(await size('./', 'node_modules'));
```

### usage for cli
```bash
# calculate size of current working directory
$ dsize --dir . --exclude node_modules
```

## API

### size(path, [exclude])

Returns a `Promise<number>` of all files size of path.

### sizeSync(path, [exclude])

Returns a `number` of all files size of path.

### Options
#### path`<string>`
require absolute path or relative path, when relative path is relative to the current working directory

#### exclude`<string>`
option argument, require the whole directory name, exclude the directory that you don't want to include
