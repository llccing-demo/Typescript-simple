/**
 * 接口
 * 
 * TypeScript 的核心原则之一是对值所具有的结构类型进行检查。它有时被称做 “鸭式辨形法” 或 “结构性子类型化”。
 * 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
 */

// 接口初探
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' };
// 这里 TypeScript 会检查 myObj 中是否有 label 属性
printLabel(myObj)

// 使用接口重写上面的例子
interface labelledValue {
  label: string
}

function printLabel1(labelledObj: labelledValue) {
  console.log(labelledObj.label)
}

let myObj1 = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

// 需要注意的是，我们这里并不像其他语言一样，说传给 printLabel1 的对象实现了这个接口。我们只会去关注值的外形。
// 还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

/**
 * 可选属性
 * 可选属性在应用 "option bags" 模式时很常用，即给函数传入的参数对象中只有部分属性值
 */

// 下面是应用 "option bags" 的例子：
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'blue' })

// 可选属性的接口 仅仅是多了在属性名后的 "?" 符号。

// 可选属性的好处：1. 对可能存在的属性进行预定义； 2. 捕获引用了不存在的属性时的错误。（这个是接口的通用有点）

/**
 * 只读属性
 */
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// 这里会报错，因为接口中定义了 x 是只读属性
// p1.x = 123;

// TypeScript 具有 ReadonlyArray<T> 类型，与 Array<T> 相似，只是把所有的可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let a1: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a1
// Error
// ro[0] = 12
// Error
// ro.push(5)
// Error
// ro.length = 100
// 类型不一致，不能够赋值
// a1 = ro

// 将整个 ReadonlyArray 赋值到普通数组是不可以的。但是可以用类型断言重写：
a1 = ro as number[];

/**
 * readonly vs const
 * 
 * 最简单的判断使用 readonly 还是 const 的方法，看要把它作为变量使用还是作为属性。
 * 作为变量用 const
 * 作为属性用 readonly
 */

/**
 * 额外的属性检查
 */
interface SquareConfig1 {
  color?: string;
  width?: number;
}
function createSquare1(config: SquareConfig1): { color: string, area: number } {
  return { color: 'blue', area: 123123 }
}


// 这里报错了，因为 对象字面量会被特殊对待而且会经过 额外的属性检查，当将他们作为变量或者作为参数传递的时候。
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，就会得到一个错误。
// let mySquare1 = createSquare1({ colour: 'red', width: 100 })

// 绕开这些检查也很简单。最简便的是使用类型断言：
let mySquare3 = createSquare1({ width: 100, opacity: 0.5 } as SquareConfig1)

// 然而最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有有些做为特殊用途使用的额外属性。
// 如果 SquareConfig 带有上面定义的类型的 color 和 width 属性，并且还会带有任意数量的其他属性，我们可以这样定义它：

interface SquareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// 还有一种绕开检查的方式，就是用一个变量
let myObj2 = { colour: 'red', width: 100 }
let mySquare2 = createSquare1(myObj2)

/**
 * 函数类型
 * 接口除了描述带有属性的普通对象外，也可以描述函数类型。参数列表里的每个参数都需要名字和类型：
 */
interface SearchFunc {
  (source: string, subString: string): boolean
}

// 这样定义后，我们可以像使用其他接口一样使用这个函数类型的接口。
// 下面展示如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1;
}

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。比如，我们使用下面的代码重写上面的例子：
let mySearch1: SearchFunc;
mySearch1 = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}

// 如果你不想指定类型，TypeScript 的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc 类型变量。
let mySearch2: SearchFunc;
mySearch2 = function (src, sub) {
  return src.search(sub) > -1
}

/**
 * 可索引的类型
 * 与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 a[10] 或者 ageMap['tom']。
 * 可索引类型，具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
 */

// 这里我们定义了 StringArray 接口，它有索引签名。
// 这个索引签名表示了当用 number 去索引 StringArray 时会得到 string 类型的返回值。
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred']
let myStr: string = myArray[0]

// TypeScript 支持两种索引签名：字符串和数字。可以同时使用两种，但是数字索引的返回值必须是字符串索引返回值的子类型。
// 当用 number 来索引时，JavaScript 会将它转换为 string然后再去索引对象。

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误： 使用数值型的字符串索引，有时会得到完全不同的 Animal
// interface NotOkay {
//   [x: number]: Animal;
//   [y: string]: Dog;
// }

// 字符串索引签名能够很好的描述 dictionary 模式，并且他们也会确保所有属性与其返回值类型相匹配。
// 因为字符串索引声明了 obj.property 和 obj["property"] 两种形式都可以。下面的例子里：name的类型与字符串索引类型不匹配
// 所以类型检查器给出了一个错误提示：

interface NumberDictionary {
  [index: string]: number;
  // 可以，length 是 number 类型
  length: number;
  // 类型“string”的属性“name”不能赋给字符串索引类型“number”
  // name: string;
}

// 最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = ['Alice', 'Bob'];
// 这里索引签名是只读的，所以不能设置
// myArray2[2] = 'Mallory';

/**
 * 类类型
 */

// 与 C# 或者 Java里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) { }
}

// 你也可以在接口中描述一个方法，在类里实现它：
interface ClockInterface1 {
  currentTime: Date;
  setTime(d: Date);
}

class Clock1 implements ClockInterface1 {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) { }
}
// 接口描述了类的公共部分，而不是公共和私有两部分。它不会帮你检查类是否具有某些私有成员。

/**
 * 类静态部分与实例部分的区别
 * 
 * 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。
 * 你会注意到当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：
 */

interface ClockConstructor {
  new(hour: number, minute: number);
}

//  class Clock2 implements ClockConstructor {
//    currentTime: Date;
//    constructor(h: number, m: number) {}
//  }

// 这是因为当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor 存在于类的静态部分，所以不在检查的范围内。

// 因此，我们应该直接操作类的静态部分。
// 下面我们定义两个接口，ClockConstructor 为构造函数所用和 ClockInterface 为实例方法所用。

interface ClockConstructor1 {
  new(hour: number, minute: number): ClockInterface2
}

interface ClockInterface2 {
  tick()
}

// 定义了一个函数，它用传入的类型创建实例。
function createClock(ctor: ClockConstructor1, hour: number, minute: number): ClockInterface2 {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface2 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface2 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClock, 12, 7);
let analog = createClock(AnalogClock, 7, 32);

/**
 * 继承接口
 * 和类一样，接口也可以相互继承。这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
 */
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;

// 一个接口可以继承多个接口，创建出多个接口的合成接口。

interface Shape1 {
  color: string
}

interface PenStroke {
  penWidth: number;
}

interface Square1 extends Shape1, PenStroke {
  sideLength: number;
}

let square1 = <Square1>{};
square1.color = 'green';
square1.sideLength = 10;
square1.penWidth = 5.0;

/**
 * 混合类型
 * 
 * 接口能够描述 JavaScript 里丰富的类型。因为 JavaScript 其动态灵活的特点，
 * 有时你会希望一个对象可以同时具有上面提到的多种类型
 */

// 一个例子就是，一个对象可以同时作为函数和对象使用，并带有额外的属性。
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { }
  return counter
}

let c3 = getCounter();
c3(10);
c3.reset();
c3.interval = 5.0;

/**
 * 接口继承类
 * 
 * 当接口继承一个类类型时，它会继承累的成员但不包括其实现。就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
 * 接口同样会继承到类的 private 和 protected 成员。这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，
 * 这个接口类型只能被这个类或子类锁实现（implement）
 */

// 当你有一个庞大的继承结构时这很有用，但要指出你的代码只能在子类拥有特定属性时起作用。
// 这个子类除了继承自基类外，与基类没有任何关系。
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() {}
}

// 报错了 Image1 类 缺少 state 属性
// class Image1 implements SelectableControl {
//   select() {}
// }

class Location1 {

}

// 上面例子中，SelectableControl 包含了 Control 的所有成员，包括私有成员 state。
// 因为是私有成员，所以只能够是 Control 的子类们才能实现 SelectableControl 接口。
// 因为只有 Control 的子类才能够拥有一个声明于 Control 的私有成员 state，这对私有成员的兼容性是必须滴。

// 在 Control 类内部，是允许通过 SelectableControl 的实例来访问私有成员 state 的。实际上，
// SelectableControl 接口和拥有 select 方法的 Control 类是一样的。Button 和 TextBox 类时
// SelectableControl 的子类（因为他们都继承自 Control 并由 select 方法），但 Image 和 Location1 类并不是这样的。