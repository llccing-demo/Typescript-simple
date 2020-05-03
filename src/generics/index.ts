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
function identity2<T>(arg: T): T {
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

/**
 * 泛型类型
 */

// 泛型函数的类型与非泛型函数的类型没有什么不同，只是有一个类型参数在最前面，像函数声明一样：
function identity4<T>(arg: T): T {
  return arg
}

let myIdentity: <T>(args: T) => T = identity4

// 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
let myIdentity2: <U>(args: U) => U = identity4

// 我们也可以使用带有调用签名的对象字面量来定义泛型函数：
let myIdentity3: { <T>(arg: T): T } = identity4

// 这引导我们去写第一个泛型接口了。我们把上面例子里的对象字面量拿出来作为一个接口：
interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity4: GenericIdentityFn = identity4

// 我们可能把泛型参数当做整个接口的一个参数，这样我们就能够清楚的知道使用的具体是哪个泛型类型
interface GenericIdentityFn2<T> {
  (arg: T): T;
}

let myIdentity5: GenericIdentityFn2<number> = identity4

// 除了泛型接口，我们还可以创建泛型类。注意，无法创建泛型枚举和泛型命名空间。

/**
 * 泛型类
 * 
 * 泛型类使用（<>）括起泛型类型，跟在类名后面。
 */
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y }

// 我们在 类 的那节说过，类有两部分：静态部分和实例部分。泛型指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

/**
 * 泛型约束
 */

// 我们定义一个接口来描述约束条件。创建一个包含 .length 属性的接口，使用这个接口和 extends 关键字来实现约束：
interface lengthwise {
  length: number;
}

function loggingIdentity2<T extends lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// 现在这个泛型函数被定义了约束，因此它不再适用于任意类型：
// loggingIdentity2(3) // 类型“3”的参数不能赋给类型“lengthwise”的参数

loggingIdentity2({ length: 10, value: 3 })

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x1 = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x1, 'a')

// getProperty(x1, 'm') // 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数

// 在泛型里使用类类型
// 在 TypeScript 使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，
function create<T>(c: { new(): T; }): T {
  return new c()
}

// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal7 {
  numLegs: number;
}

class Bee extends Animal7 {
  keeper: BeeKeeper;
}

class Lion extends Animal7 {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal7>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
