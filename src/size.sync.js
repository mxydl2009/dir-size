import { accessSync, statSync, readdirSync } from 'fs';
import { resolve } from 'path';

function dirIsExistsSync(dir) {
  try {
    accessSync(dir);
    return true;
  } catch(err) {
    return false;
  }
}

function dirIsDirSync(dir) {
  try {
    const dirInfo = statSync(dir);
    const isDir = dirInfo.isDirectory();
    return isDir;
  } catch(err) {
    return false
  }
}

// 获取给定目录的所有文件,广度优先
function collectFilesSync(dir, exclude) {
  const allFiles = [];
  const toVisitDir = [ dir ];
  while(toVisitDir.length > 0) {
    const item = toVisitDir.shift();
    const files = readdirSync(item);
    files.map((file) => {
      const fileAbPath = resolve(item, file);
      const isDir = dirIsDirSync(fileAbPath);
      if (!isDir) {
        // 文件，放在allFiles
        allFiles.push(fileAbPath);
      } else {
        if (!fileAbPath.includes(exclude)) {
          // 目录，放在toVisitDir里，下一轮循环访问
          toVisitDir.push(fileAbPath);
        }
      }
    })
  }
  return allFiles;
}

function calculateFilesSizeSync(files) {
  let totalSize = 0;
  return files.reduce((acc, file) => {
    const fileSize = statSync(file).size;
    return acc += fileSize;
  }, totalSize);
}

function sizeSync(dir, exclude) {
  // 解析dir为绝对路径
  const abPath = resolve(process.cwd(), dir);
  // 检查dir是否存在
  const exists = dirIsExistsSync(abPath);
  if (exists) {
    // 判断是否是目录
    const dirType = dirIsDirSync(abPath);
    if (!dirType) {
      throw new Error(`${dir} is not a directory`)
    } else {
      // 获取目录下所有的文件
      const allFiles = collectFilesSync(abPath, exclude);
      const dirSize = calculateFilesSizeSync(allFiles);
      return dirSize;
    }
  } else {
    throw new Error(`${dir} is not existed`);
  }
}

export default sizeSync;