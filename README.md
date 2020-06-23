# Typescript 

## 开始

```js
// 安装依赖
npm install

// 编译
npm run build
```

## tsconfig.json

配置文件说明：
```js
{
  "compilerOptions": {
    // 生成的文件放到 dist 目录下
    "outDir": "./dist",
    // 接受 JavaScript 作为输入
    "allowJs": true,
    // 将 JavaScript 代码降级到低版本 es5
    "target": "es5"
  },
  "include": [
    // 读取所有可识别的 src 目录下的文件
    "./src/**/*"
  ]
}
```

## 参考

- [TypeScript 一种思维方式](https://zhuanlan.zhihu.com/p/63346965)
- [Typescirpt 入门实践](https://juejin.im/post/5e7c08bde51d455c4c66ddad#heading-26)

- [官方 英文文档](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [官方 中文文档](https://www.tslang.cn/docs/handbook/variable-declarations.html)

