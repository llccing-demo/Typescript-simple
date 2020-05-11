/**
 * 命名空间
 * 
 * 用来组织代码的手段
 */

// 分离到文件
// 应用变得越来越大时，需要将代码分离到不同的文件中以便于维护

// 多文件中的命名空间
// 尽管是不同的文件，他们仍是同一个命名空间，并且在使用的时候就如同在一个文件中定义的一样。
// 因为不同文件之间存在依赖关系，所以我们加入了引用标签来告诉编译器文件之间的关联。


// 别名

namespace Shapes {
  export namespace Polygons {
    export class Triangle { }
    export class Square { }
  }
}

// 别名的使用方式 import q = x.y.z
import polygons = Shapes.Polygons
let sq = new polygons.Square()


// 使用其他 JavaScript 库
// 为了描述不是用 TypeScript 编写的类库的类型，我们需要声明类库导出的 API。
// 由于大部分程序只提供少数的顶级对象，命名空间是用来表示他们的一个好办法。
// 我们称其为声明，是因为它不是外部程序的具体实现。
// 我们通常在 .d.ts 里写这些声明。

// 外部命名空间
// 流行的程序库 D3 在全局对象 d3 里定义他的功能。
// 因为这个库通过 <script> 标签加载（不是模块加载器），他的声明文件使用内部模块来定义他的类型。
// 为了让 TypeScript 编译器识别它的类型，我们使用外部命名空间声明。
// 详情见 ./D3.d.ts
