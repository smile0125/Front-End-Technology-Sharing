# 文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

- hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改。
- chunkhash：根据 chunk 生成的 hash 值，如果打包来源于同一个 chunk，那么 hash 值就一样。
- contenthash：根据文件的内容生成 hash 值，不同文件 hash 值一定不同。

## 1. 打包后文件指纹是什么？

- 打包后文件指纹名称
  - [hash]：根据项目构建的 hash 值
  - [chunkhash]：根据 chunk 生成的 hash 值
  - [contenthash]：根据文件的内容生成 hash 值

## 2. 如何在生产模式下使用文件指纹？

- 配置 output
  - filename：指定未经过处理的文件名
  - chunkFilename：指定未经过处理的文件名
  - assetModuleFilename：指定未经过处理的文件名
- 配置 plugins
  - 配置 HashPlugin
  - 配置 ChunkHashPlugin
  - 配置 ContenthashPlugin

## 3. 如何在开发模式下使用文件指纹？

- 配置 devtool
  - eval-cheap-module-source-map
  - eval-source-map
  - cheap-module-source-map
  - cheap-source-map
  - source-map

## js 文件指纹设置

- 设置 output 的 filename

```js
output: {
  filename: 'js/[name].[contenthash:8].js',
  chunkFilename: 'js/[name].[contenthash:8].js',
  assetModuleFilename: 'images/[name].[contenthash:8][ext]',
  path: path.resolve(__dirname, '../dist'),
  publicPath: '/',
},
```

## css 文件指纹设置

- 设置 output 的 chunkFilename

```js
output: {
  filename: 'js/[name].[contenthash:8].js',
  chunkFilename: 'css/[name].[contenthash:8].css',
  assetModuleFilename: 'images/[name].[contenthash:8][ext]',
  path: path.resolve(__dirname, '../dist'),
  plugins: [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    })
  ]
},

```

## 图片文件指纹设置
file-loader 中的 name
- [name]：文件名
- [path]：文件的相对路径
- [folder]：文件所在的文件夹名
- [hash]：文件的 hash 值
- [ext]：文件的扩展名
- [hash:8]：文件 hash 值的前 8 位
- [contenthash:8]：文件内容 hash 值的前 8 位

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
};
```
