/**
 * 模块
 * 
 * TypeScript1.5 开始术语名已经发生了变化，“内部模块” 现在称作 “命名空间”。“外部模块” 现在称为 “模块”。
 * 这是为了与 ES2015 里术语保持一致，也就是说 "module {" 相当于现在推荐的写法 "namespace {"
 */

/**
 * 介绍
 * 
 * ECMAScript 2015 开始，JavaScript 引入了模块概念。TypeScript 也沿用这个概念。
 * 模块在自身的作用域中执行，而不在全局作用域里；除非 export 导出，否则不可见
 * 其他模块要使用的时候需要 import 导入。
 * 
 * 模块是自声明的；两个模块之间的关系是通过在文件级别上使用 imports 和 exports 建立的。
 * 
 * 模块使用模块加载器去导入其他模块。在运行时，模块加载器的作用是在执行次模块代码前去查找并执行这个模块所有的依赖。
 * 大家熟知的模块加载器是服务于 Node.js的 CommonJS 和 服务于 Web 应用的 Require.js。
 * 
 * TypeScirpt 与 ECMAScript 2015 一样，任何包含 import 或者 export 关键词的文件都被当做一个模块。
 * 否则如果没有 export/import 声明，那么它的内容被视为全局可见的（因此模块内也可见）。
 */

// 导出

export interface StringValidator {
  isAcceptable(s: string): boolean;
}

export const numberRegex = /^[0-9]+$/

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s) {
    return s.length === 5 && numberRegex.test(s)
  }
}

// 导出的部分重命名
export { ZipCodeValidator as mainValidator }

// 重新导出
// 重新导出功能，并不会在当前模块导入那个模块或者定义一个新的局部变量

// 联合导出，export * from 'module'


// 导入
// import { ZipCodeValidator } from 'module'

// 对导入部分重命名
// import { ZipCodeValidator as ZCV } from 'module'

// 将整个模块导入到一个变量，并通过它来访问模块的导出部分
// import * as validator from 'module'
// let myValidator = new validator.ZipCodeValidator();

// 具有副作用的导入模块
// 尽管不推荐这么做，一些模块会设置一些全局状态供其他模块使用。
// 这些模块可能没有任何导出，或者用户根本不关注他的导出。使用下面的方式导入
// import './module.js'


/**
 * 默认导出
 * 
 * default
 */

// 生成模块代码
// tsc --module commonjs Test.ts

// 可选的模块加载和其他高级加载场景

/**
 * 使用其他的 JavaScript 库
 */

// 外部模块
// 我们可以使用顶级的 export 声明来为每个模块定义一个 .d.ts 文件，但最好还是写在一个大的 .d.ts 文件里
// 我们使用与构造一个外部命名空间相似的方法，但这里使用 module 关键字并且把名字用引号括起来，方便之后 import。
// 详情见文件 ./node.d.ts

// 现在我们可以加载模块
/// <reference path="node.d.ts">
import * as URL from 'url'
let myUrl = URL.parse('https://llccing.cn')

// 外部模块简写
// 假如你不想在使用一个新模块之前花时间去编写声明，你可以采用声明的简写形式以便能够快速使用它。
// 详情见文件 ./declare.d.ts

// 简写模块里所有导出的类型将是 any
import x, { y } from 'how-new-module'
x(y)

// 模块声明通配符
// 某些模块加载器如 SystemJS 和 AMD 支持导入非 JavaScript 内容。
// 他们通常会使用一个前缀或后缀来表示特殊的加载语法。
// 模块声明通配符可以用来表示这些情况。
// 详情见 ./declare.d.ts

// 现在你就可以导入 '!*text' 或者 'json!*' 的内容了
import fileContent from './declare!text'
import data from 'json!http://example.com/data.json'
console.log(data, fileContent)

// UMD 模块
// 有些模块被设计成兼容多个模块加载器，或者不使用模块加载器（全局变量）。
// 他们一 UMD 模块为代表。这些库可以通过导入的形式或者全局变量的形式访问。例如：
// 详情见 ./math-lib.d.ts

// 然后这个库可以在某个模块里通过导入来使用：
import { isPrime } from 'math-lib'
isPrime(2)

// 错啦，“mathLib”指 UMD 全局，但当前文件是模块。请考虑改为添加导入。
// 如果要这么使用，只能在某个脚本中，例如，./test.ts
// mathLib.isPrime(2)


/**
 * 创建模块结构指导
 * 
 * 尽可能在顶层导出
 * 
 * 用户应该更容易的使用你模块导出的内容。嵌套层次过多会变得难以处理，因此仔细考虑如何组织你的代码。
 * 
 * 从你的模块中导出一个命名空间就是增加嵌套的例子。虽然命名空间有时候有他的用处，在使用模块的时候他们额外的增加了一层。
 * 这对用户来说是很不便的并且通常是多余的。
 * 
 * 导出类的静态方法也有同样的问题 -- 这个类本身就增加了一层嵌套。
 * 除非他能方便表述或者便于清晰使用，否则请考虑直接导出一个辅助方法。
 * 
 * 如果仅导出单个 class 或 function，使用 export default
 * 
 * 就像 “在顶层导出” 帮助减少用户使用的难度，一个默认的导出也能起到这个效果。
 * 如果一个模块就是为了导出特定的内容，那么你应该考虑使用一个默认导出。这会使模块的导入和使用变得些许简单。
 * 比如：
 * 详情见 MyClass.ts/MyFunc.ts/Consumer.ts
 * 这对用户来说是最理想的。他们可以随意命名导入模块的类型（本例为t）并且不需要多余的 (.) 来找相关对象。
 */

// 如果要导出多个对象，放在顶层里导出
// 详情见 ./MyThings.ts Consumer.ts

// 使用命名空间导入模式，当你要导出大量内容的时候
// 详情见 ./MyLargeModule.ts Consumer.ts

// 使用重新导出进行扩展
// 你可能需要扩展一个模块的功能。JS 里常用的模式时 jQuery 那样去扩展原对象。
// 但是模块不会像全局命名空间对象那样去 合并。
// 推荐的方案是不去改变原来的对象，而是导出一个新的实体来提供新的功能。

// 模块里不要使用命名空间

// 危险信号
// 以下为模块结构上的危险信号。重新检查以确保你没有在对模块使用命名空间：
// - 文件的顶层声明是 export namespace Foo {} (删除 Foo 并把所有内容向上层移动一层)
// - 文件只有一个 export class 或 export function (考虑使用 export default)
// - 多个文件的顶层具有同样的 export namespace Foo {} (不要以为这些会合并到一个 Foo 中！)
