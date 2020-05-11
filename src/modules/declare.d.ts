declare module 'how-new-module'


// 模块声明通配符
declare module "*!text" {
  const content: string;
  export default content
}

// 换一种方式
declare module 'json!*' {
  const value: any;
  export default value
}
