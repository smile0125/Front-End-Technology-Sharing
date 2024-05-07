## 发布 npm 包

1. 注册 npm 账号
   [NPM](https://www.npmjs.com/settings/smile0125/packages)

2. 创建 npm 包 在本地创建一个文件夹，在该文件夹下执行命令：

```js
npm init -y
```

执行命令后，会生成一个 package.json 文件，该文件包含了 npm 包的基本信息，例如包名、版本号、描述等。

3. 编写 package.json

```js
{
  "name": "large-file-shard",
  "version": "1.0.3",
  "description": "大文件分片",
  "main": "build/index.js",
  "files": [],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production"
  },
  "keywords": [
    "大文件分片",
    "文件分片",
    "大文件上传",
    "文件上传"
  ],
  "author": "smile0125",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.24.5",
    "@babel/core": "^7.24.5",
    "@babel/preset-env": "^7.24.5",
    "babel-loader": "^9.1.3",
    "clean-webpack-plugin": "^4.0.0",
    "terser-webpack-plugin": "^5.3.10",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4"
  },
  "dependencies": {
    "spark-md5": "^3.0.2"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/smile0125/Large-File-Shard"
  },
  "bugs": {
    "url": "https://github.com/smile0125/Large-File-Shard/issues"
  },
  "homepage": "https://github.com/smile0125/Large-File-Shard"
}

```

4. 编写代码

```js
// lib/index.js
import SparkMD5 from "spark-md5";
const md5 = new SparkMD5();

class FileShard {
  constructor() {
    this.file = undefined; // 文件
    this.chunks = []; // 分片
    this.chunkHash = []; // 分片hash
    this.chunkSize = 1 * 1024 * 1024; // 默认1MB
    this.fileSize = 0; // 文件大小
    this.fileHash = undefined; // 文件hash
  }

  // 初始化
  init(file, chunkSize) {
    this.file = file;
    this.fileSize = file.size;
    this.chunkSize = chunkSize || this.chunkSize;
    // 遍历保存分片
    for (let i = 0; i < this.fileSize; i += this.chunkSize) {
      const chunk = file.slice(i, i + this.chunkSize);
      this.chunks.push(chunk);
    }
  }

  // 计算分片hash
  calculateChunkHash() {
    const result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.chunks.length; i++) {
        const blob = this.chunks[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const chunk = e.target.result;
          result.push(md5.appendBinary(chunk).end());
          if (i === this.chunks.length - 1) {
            resolve(result);
          }
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsArrayBuffer(blob);
      }
    });
  }

  // 获取指定分片hash
  async getChunkHash(index) {
    if (this.chunkHash.length === 0) {
      await this.getAllChunkHash();
      return this.chunkHash[index];
    }
    return this.chunkHash[index];
  }

  // 获取所有分片hash
  async getAllChunkHash() {
    this.chunkHash = await this.calculateChunkHash();
    return this.chunkHash;
  }

  // 计算文件hash（增量算法）
  calculateFileHash() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.chunks.length; i++) {
        const blob = this.chunks[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          const chunk = e.target.result;
          if (i === this.chunks.length - 1) {
            resolve(md5.end());
          }
          md5.appendBinary(chunk);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsArrayBuffer(blob);
      }
    });
  }

  // 获取文件hash
  async getFileHash() {
    this.fileHash = await this.calculateFileHash();
    return this.fileHash;
  }

  // 获取指定分片
  getChunk(index) {
    return this.chunks[index];
  }

  // 获取所有分片
  getAllChunks() {
    return this.chunks;
  }

  // 获取分片数量
  getChunkCount() {
    return this.chunks.length;
  }

  // 获取指定范围内的分片
  getChunksInRange(start, end) {
    return this.chunks.slice(start, end);
  }

  // 获取文件大小
  getFileSize() {
    return this.fileSize;
  }
}

export default FileShard;
```

```js
// 入口文件
import FileShard from "./lib/index.js";
export default FileShard;
```

5. 发布 npm 包

```js
npm login 已经登录过的可以省略此步骤
npm version patch 更新版本号 将版本号中的第三段数字自增1
npm publish  执行命令后，npm 包将被发布到 npm 官方仓库中。
```

6. 使用 npm 包

其他 npm 命令

```js
npm patch：将版本号中的第三段数字自增1。例如，如果当前版本号为1.2.3，则执行npm version patch后，版本号将变为1.2.4。
npm minor：将版本号中的第二段数字自增1。例如，如果当前版本号为1.2.3，则执行npm version minor后，版本号将变为1.3.0。
npm major：将版本号中的第一段数字自增1。例如，如果当前版本号为1.2.3，则执行npm version major后，版本号将变为2.0.0。
```

将 npm 包从仓库中移除

```js
npm unpublish <package-name>@<version> --force
```

将 npm 包安装到本地项目中

```js
npm install <package-name>
```

将 npm 包从本地项目中移除

```js
npm uninstall <package-name>
```
