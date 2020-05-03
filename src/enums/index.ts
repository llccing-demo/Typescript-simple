/**
 * 枚举
 * 
 * 枚举可以定义带名字的常量。
 * TypeScript 支持数字和基于字符串的枚举
 */

// 数字枚举
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
// 如上 Up 的初始值为1，其余成员从1开始自动增长。

// 或者可以不使用初始化器：
enum Direction1 {
  Up,
  Down,
  Left,
  Right
}

enum Response1 {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: Response1): void {

}

respond('Pricess Caroline', Response1.No)
function getSomeValue() { return 0 }
enum E {
  A = getSomeValue(),
  // B, // 枚举成员必须具有初始化表达式。
}

// 字符串枚举
// 字符串枚举的概念很简单，但是有 细微的 运行时差别？？
// 在一个字符串枚举里，每个成员都必须用字符串字面量，或者另外一个字符串枚举成员进行初始化。
enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// 由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。
// 字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

// 异构枚举
// 除非真的想利用 JavaScript 运行时的行为，否则不建议这样做。
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'yes'
}

// 计算的和常量成员
// 每个枚举成员都带有一个值，它可以是常量或者计算出来的。当满足如下条件时，枚举成员被当作是常量：
// 它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值0：
enum X { X }

// 它不带有初始化器且他之前的枚举成员是一个 数字常量。这种情况下，当前枚举成员的值为它上一个枚举成员的值加1。
enum E1 { X, Y, Z }
enum E2 { A = 1, B, C }

enum FileAccess {
  // 常量成员
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // 计算成员
  G = '123'.length
}

// 联合枚举与枚举成员的类型
enum ShapeKind {
  Circle,
  Square,
}
interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
let c4: Circle = {
  kind: ShapeKind.Circle,
  radius: 100,
}

enum E2 {
  Foo,
  Bar,
}

function f12(x: E2) {
  // This condition will always return 'true' since the types 'E2.Foo' and 'E2.A' have no overlap.
  // if (x !== E2.Foo || x !== E2.Bar) {

  // }
}

// 运行时的枚举
enum E3 {
  X, Y, Z
}

function f11(obj: { X: number }) {
  return obj.X
}

// E3 的 X 的类型为数字
f11(E3)

// 反向映射
// 除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字。例如：
enum Enum {
  A
}

let a11 = Enum.A
let nameOfA = Enum[a11]

// 如下是编译后的代码
// var Enum;
// (function (Enum) {
//     Enum[Enum["A"] = 0] = "A";
// })(Enum || (Enum = {}));
// var a11 = Enum.A;
// var nameOfA = Enum[a11];

// 生成的代码中，枚举类型被编译为一个对象，它包含了正向映射（name -> value）和反向映射（value -> name）。
// 引用枚举成员总会生成为对属性访问并且永远也不会内联代码。

// 要注意的是，不会为字符串枚举成员生成反向映射。

// const 枚举
// 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const 枚举。
// 常量枚举通过在枚举上使用 const 修饰符来定义。
// 常量枚举在编译阶段会被删除。
const enum Enum1 {
  A = 1,
  B = A * 2
}

// 外部枚举
// 外部枚举用来描述已经存在的枚举类型的形状。
declare enum Enum2 {
  A = 1,
  B,
  C = 2
}