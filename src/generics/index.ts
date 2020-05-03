/**
 * 泛型
 * 
 * 组件不仅能够支持当前的数据类型，同时能够支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
 */

// 一个组件可以支持多种数据类型，这样用户就可以以自己的数据类型来使用组件。

/**
 * 泛型之 Hello World
 */

// 创建第一个使用泛型的例子： identity函数。这个函数会返回任何传入它的值
// 可以把它当做 echo 命令

function identity(arg: number): number {
  return arg
}

// 或者使用 any 类型定义函数
function identity1(arg: any): any {
  return arg
}

// 使用any会导致可以传入任何类型，但是返回也可以是别的任何类型，就没有约束了。

// 所以需要一个方法保证返回值类型和传入参数的类型是相同的。
// 这里我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
function identity2<T> (arg: T): T {
  return arg
}

// 我们将 identity2 这个函数叫做泛型，因为他可以适用多个类型。

// 定义泛型函数后，有两种方式可以使用。第一种是传入所有参数，包函类型参数：
let output = identity2<string>('myString');

// 第二种方式更普遍，使用了类型推断
// 这里编译器会查看 myString 的值，然后把 T 设置为它的类型。
let outpu1 = identity2('myString')

/**
 * 使用泛型变量
 */

function identity3<T>(arg: T): T {
  // 类型“T”上不存在属性“length”
  // 这里会报错，因为假定 arg 是所有类型，如果是 number 则没有 length 属性
  // console.log(arg.length)
  return arg
}

// 改成 T 类型的数组即可。
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

function loggingIdentity1<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}
