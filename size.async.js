const { access, stat, readdir } = require('node:fs/promises');
const path = require('node:path');

async function dirIsExists(dir) {
  try {
    await access(dir);
    return true;
  } catch(err) {
    return false;
  }
}

async function dirIsDir(dir) {
  try {
    const dirInfo = await stat(dir);
    const isDir = dirInfo.isDirectory();
    return isDir;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

// 获取给定目录的所有文件,广度优先
async function collectFiles(dir, exclude) {
  const allFiles = [];
  const toVisitDir = [ dir ];
  while(toVisitDir.length > 0) {
    const item = toVisitDir.shift();
    const files = await readdir(item);
    await Promise.all(files.map(async (file) => {
      const fileAbPath = path.resolve(item, file);
      const isDir = await dirIsDir(fileAbPath);
      if (!isDir) {
        // 文件，放在allFiles
        allFiles.push(fileAbPath);
      } else {
        if (!fileAbPath.includes(exclude)) {
          // 目录，放在toVisitDir里，下一轮循环访问
          toVisitDir.push(fileAbPath);
        }
      }
      return isDir;
    }))
  }
  return allFiles;
}

async function calculateFilesSize(files) {
  let totalSize = 0;
  const fileSizes = files.map(async (file) => {
    const fileSize = await stat(file);
    return fileSize.size
  });
  return Promise.all(fileSizes).then((sizes) => {
    return sizes.reduce((acc, size) => {
      return acc += size;
    }, totalSize);
  })
}

async function size(dir, exclude) {
  // 解析dir为绝对路径
  const abPath = path.resolve(__dirname, dir);
  // 检查dir是否存在
  const exists = await dirIsExists(abPath);
  if (exists) {
    // 判断是否是目录
    const dirType = await dirIsDir(abPath);
    if (!dirType) {
      throw new Error(`${dir} is not a directory`)
    } else {
      // 获取目录下所有的文件
      const allFiles = await collectFiles(abPath, exclude);
      const dirSize = await calculateFilesSize(allFiles);
      return dirSize;
    }
  } else {
    throw new Error(`${dir} is not existed`);
  }
}

module.exports = size