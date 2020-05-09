/**
 * 高级类型
 */

/**
 * 交叉类型 Intersection Types
 * 
 * 交叉类型是将多个类型合并为一个类型。
 * 例如：Person & Serializable & Loggable 同时是 Person 和 Serializable 和 Loggable，就是说这个类型的对象同时拥有了这三种类型的成员。
 * 我们大多在混入（mixin）或其他不适合典型面向对象模型的地方看到交叉类型的使用（JavaScript 中发生这种情况的场合很多！），、
 * 下面是如何创建一个混入的简单例子：
 */
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id]

    // 下面的方式会报如下错：
    // 不能将类型“T[Extract<keyof T, string>]”分配给类型“(T & U)[Extract<keyof T, string>]”。
    // 不能将类型“T”分配给类型“T & U”。
    // 不能将类型“T”分配给类型“U”。
    // 'T' is assignable to the constraint of type 'U', but 'U' could be instantiated with a different subtype of constraint '{}'
    // result[id] = first[id]
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]
    }
  }
  return result
}

class Person2 {
  constructor(public name: string) { }
}

interface Loggable {
  log(): void;
}

class ConsoleLogger implements Loggable {
  log() {

  }
}

var jim = extend(new Person2('Jim'), new ConsoleLogger())
var n5 = jim.name
jim.log()


/**
 * 联合类型 Union Types
 * 
 * 联合类型和交叉类型很有关联，但是使用上完全不同。偶尔你会遇到这种情况，一个代码库希望传入 number 或 string 类型的函数。
 * 例如下面的函数：
 */

/**
 * 读取一个字符串并在左侧添加(padding)空白
 * 如果 padding 是 string 类型，那么则将内容添加到左侧
 * 如果 padding 是 number 类型，那么则在左侧留出指定数量的空格
 */
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('world', 'hello ')

// padLeft 函数的一个问题是，如果我们传入非 string/number 类型，TypeScript 不报错，运行时报错。
// 代替 any，我们可以使用 联合类型 作为 padding 的类型

function padLeft1(value: string, padding: string | number) {

}
// 类型“true”的参数不能赋给类型“string | number”的参数。
// let indentedString = padLeft1('hello world', true)
let indentedString = padLeft1('world', 'hello ')

// 联合类型表示一个值可以是几种类型之一。我们用竖线（ | ）分隔每个类型。

// 如果一个值是联合类型，我们只能访问次联合类型的所有类型里共有的成员。
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

class HappyBird implements Bird {
  fly() { }
  layEggs() { }
}

function getSamllPet(): Fish | Bird {
  return new HappyBird()
}

let pet = getSamllPet()
pet.layEggs()

// 下面这行代码报错了
// 类型“Bird | Fish”上不存在属性“swim”。
// 类型“Bird”上不存在属性“swim”。
// pet.swim()



// 类型保护与区分类型 Type Guards and Differentiating Types
// 联合类型适合那些值可以为不同类型的情况。但当我们想确切了解是否为 Fish 时怎么办？
// JavaScript 里常用的区分2个可能值的方法是检查成员是否存在。
// 如之前提的，我们只能访问联合类型中共同拥有的成员。


// 下面的代码，每个成员访问都会报错
// if (pet.swim) {
//   pet.swim()
// } else if (pet.fly) {
//   pet.fly()
// }

// 为了使上面的代码工作，我们要使用类型断言
if ((<Fish>pet).swim) {
  (<Fish>pet).swim()
} else if ((<Bird>pet).fly) {
  (<Bird>pet).fly()
}

// 用户自定义的类型保护
// 这里我们不得不多次使用类型断言。如果我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet 的类型的话就好了。
// TypeScript 里的 类型保护机制 让它成为了现实。
// 类型保护就是一些表达式，他们会在运行时检查以确保在某个作用域里的类型。
// 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}

// pet is Fish 就是类型谓词。谓词为 parameterName is Type 这种形式，
// parameterName 必须来自当前函数签名里的一个参数名。

// 每当使用一些变量调用 isFish 时，TypeScript 会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

// 注意 TypeScript 不仅知道在 if 分支里 pet 是 Fish 类型；它还清楚 else 分支里，一定不是 Fish 类型，一定是 Bird 类型。


// typeof 类型保护

// 看下如何用联合类型来改写 padLeft 代码，我们可以像下面这样使用类型断言来写：
function isNumber(x: any): x is number {
  return typeof x === 'number'
}

function isString(x: any): x is string {
  return typeof x === 'string'
}

function padLeft2(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// 然而，必须要定义个函数来判断类型是否是原始类型，这太痛苦。幸运的是，现在我们不必将 typeof x === 'number' 抽象成一个函数，
// 因为 TypeScript 可以将它识别为一个类型保护。也就是说我们可以直接在代码里检查类型了。
function padLeft3(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// 这些 typeof 类型保护只有两种形式能被识别：typeof v === 'typename' 和 typeof v !== 'typename'
// typename 必须是 'number'/'string'/'symbol'
// 但是 TypeScript 并不会阻止你与其它字符串比较，只不过语言不会把那些表达式识别为类型保护（简而言之，就是会报错）。

/**
 * instanceof 类型保护
 * 
 * instanceof 类型保护是通过构造函数来细化类型的一种方式。
 * 比如，我们借鉴一下之前字符串填充的例子：
 */
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpace: number) { }
  getPaddingString() {
    return Array(this.numSpace + 1).join(' ')
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder(' ')
}

// 类型为 SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  // 类型细化为 SpaceRepeatingPadder
  padder;
}

if (padder instanceof StringPadder) {
  // 类型细化为 StringPadder
  padder;
}

// instanceof 的右侧要求是一个构造函数，TypeScript将细化为：
// 1. 此构造函数的 prototype 属性的类型，如果它的类型不为 any 的话
// 2. 构造签名所返回的类型的联合

/**
 * 可以为 null 的类型
 * TypeScript 有两种特殊类型，null 和 undefined，他们分别具有值 null 和 undefined。
 * 默认情况下，类型检查器认为 null 与 undefined 可以赋值给任何类型。
 * null 和 undefined 是所有其他类型的一个有效值。
 * 
 * null发明者 价值亿万美金的错误 Tony Hoare https://en.wikipedia.org/wiki/Null_pointer#History
 */

let s = 'foo'
//  不能将类型“null”分配给类型“string”
// s = null
let sn: string | null = 'bar'
sn = null

// 不能将类型“undefined”分配给类型“string | null”
// sn = undefined

// 按照 JavaScript 语义，TypeScript 会把 null 和 undefined 区别对待。
// string|null, string|undefined 和 string|undefined|null 是不同的类型。

// 可选参数和可选属性
// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined
function f4(x: number, y?: number) {
  return x + (y || 0)
}
f4(1, 2)
f4(1)
f4(1, undefined)
// 报错啦，类型“null”的参数不能赋给类型“number | undefined”的参数
// f4(1, null)


// 可选属性也会有同样的处理
class C1 {
  a: number;
  b?: number;
}
let c5 = new C1()
c5.a = 12
// 不能将类型“undefined”分配给类型“number”
// c5.a = undefined
c5.b = 13
c5.b = undefined
// 报错啦，不能将类型“null”分配给类型“number | undefined”
// c5.b = null

// 类型保护和类型断言
// 由于可以为 null 的类型是通过联合类型来实现，那么你需要使用类型保护来去除 null。
// 幸运的是这与在 JavaScript 里写的代码一致：
function f5(sn: string | null): string {
  if (sn == null) {
    return 'default'
  } else {
    return sn
  }
}

// 这里很明显的去除了 null，你也可以使用短路运算符：
function f6(sn: string | null): string {
  return sn || 'default'
}

// 如果编译器不能去除 null 或 undefined，你可以使用类型断言手动去除。
// 语法是添加 ! 后缀：
// identifier! 从 identifier 的类型里去除了 null 和 undefined:
function broken(name: string | null): string {
  function postfix(epithet: string) {
    // 对象可能为 "null"
    // return name.charAt(0) + '. the ' + epithet 
    return name + epithet
  }
  name = name || 'Bob'
  return postfix('great')
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    // ! 语法，手动去除 null 和 undefined 类型
    return name!.charAt(0) + '. the ' + epithet
  }
  name = name || 'Bob'
  return postfix('great')
}

/**
 * 类型别名
 * 
 * 类型别名 会给类型起个新名字。类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其他任何你需要手写的类型
 */
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// 起别名不会新建一个类型 - 它创建了一个新 名字 来引用那个类型。给原始类型起别名通常没什么用，尽管可以作为文档的一种形式使用。
// 同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：
type Container<T> = { value: T }

// 我们也可以使用类型别名来在属性里引用自己：
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}

// 与交叉类型一起使用，我们可以创建出一些稀奇古怪的类型。
type LinkedList<T> = T & { next: LinkedList<T> }

interface Person3 {
  name: string;
}

var people: LinkedList<Person3>;
var s1 = people.name
var s1 = people.next.name
var s1 = people.next.next.name
var s1 = people.next.next.next.name

// 然而，类型别名不能出现在声明右侧的任何地方。
// 然而，这么写也不报错啊，所以是可行得吧
type Yikes = Array<Yikes>;

// 接口 vs 类型别名
// 区别1，接口创建了一个新的名字，可以在其他任何地方使用。类型别名并不创建新名字，比如，错误信息就不会使用别名。
// 在下面的示例代码里，在编译器中将鼠标悬停在 interfaced 上，显示它返回的是 Interface，
// 但悬停在 aliased 上时，显示的确实对象字面量类型

type Alias = { num: number }
interface Interface {
  num: number;
}

// 悬停时展示内容：function aliased(arg: Alias): Alias
// 并不像上面所说呢……
declare function aliased(arg: Alias): Alias;
// 悬停时展示内容：function interfaced(arg: Interface): Interface
declare function interfaced(arg: Interface): Interface;

// 另一个重要区别是类型别名不能被 extends 和 implements（自己也不能 extends 和 implements 其他类型）
// 因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的（开闭原则 https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle），
// 你应该尽量去使用接口代替类型别名。

// 另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

/**
 * 字符串字面量类型
 * 
 * 字符串字面量类型允许你指定字符串必须的固定值。
 * 在实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。
 * 通过结合使用这些类型，你可以实现类似枚举类型的字符串
 */
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === 'ease-out') {
      // ...
    } else if (easing === 'ease-in-out') {
      // ...
    } else {
      // 错了，不应该传入 null 或 undefined
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
// 报错了，类型“"uneasy"”的参数不能赋给类型“Easing”的参数
// button.animate(0, 0, 'uneasy')

// 字符串字面量类型，还可以用于区分函数重载：
// 函数名重复……
function createElement(tagName: 'img'): HTMLImageElement
function createElement(tagName: 'input'): HTMLInputElement
function createElement(tagName: string): Element {
  return
}

/**
 * 数字字面量类型
 */
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return 1
}

// 很少像上面直接使用，但是可以用在缩小范围调试 bug 的时候：
function foo(x: number) {
  // 当能够判断 x!==2时，x的值一定为1。所以这个检查是非法的
  // if(x !==1 || x!==2 ){

  // }
}

/**
 * 枚举成员类型
 * 
 * 当每个枚举成员都是用 字面量初始化的时候，枚举成员是具有类型的。
 * 
 * 单例类型，多数是指枚举成员类型和数字/字符串字面量类型，尽管大多数用户会互换使用 “单例类型” 和 “字面量类型”
 */

/**
 * 可辨识联合 Discriminated Unions
 * 
 * 你可以合并单例类型、联合类型、类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称作 标签联合 或 代数数据类型
 * 可辨识联合在函数式编程很有用处。一些语言会自动的为你辨识联合；
 * 而 TypeScript 则基于已有的 JavaScript 模式。它有三个要素：
 * 1. 具有普通的单例类型属性 - 可辨识的特征
 * 2. 一个类型别名包含了那些类型的集合- 联合
 * 3. 此属性上的类型保护
 */

interface Square11 {
  kind: 'square';
  size: number;
}

interface Rectangle11 {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle11 {
  kind: 'circle';
  radius: number;
}

// 首先我们声明了需要联合的接口，kind 属性称为 可辨识的特征 或 标签。
// 其他属性则特定于各个接口。


// 我们把上面的接口联合到一起
type Shape2 = Square11 | Rectangle11 | Circle11

// 我们使用可辨识联合
function area(s: Shape2) {
  switch (s.kind) {
    case 'square': return s.size * s.size
    case 'rectangle': return s.height * s.width
    case 'circle': return Math.PI * s.radius * 2
  }
}

// 完整性检查
// 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。比如，如果我们添加了 Triangle 到 Shape2，我们同时还需要更新 area：

interface Triagnle {
  kind: 'triangle';
  width: number;
}

type Shape3 = Square11 | Rectangle11 | Circle11 | Triagnle
function area2(s: Shape3) {
  switch (s.kind) {
    case 'square': return s.size * s.size
    case 'rectangle': return s.height * s.width
    case 'circle': return Math.PI * s.radius * 2
    // case 'triangle': return s.width * 2
  }
  // should error here - we didn't handle case "triangle"
}

// 有两种方式可以实现。首先是启用 --strictNullChecks 并且制定返回类型：
function area3(s: Shape3): number {
  switch (s.kind) {
    case 'square': return s.size * s.size
    case 'rectangle': return s.height * s.width
    case 'circle': return Math.PI * s.radius * 2
    // case 'triangle': return s.width * 2
  }
  // should error here - we didn't handle case "triangle"
}
// 因为 switch 没有包函所有情况，所以 TypeScript 认为这个函数有时候会返回 undefined。
// 如果你明确的指定返回值类型为 number，那么你会看到一个错误。因为实际的返回类型为 number | undefined。
// 然而，这种方法存在微妙之处，且 --strictNullChecks 对旧代码支持不好。

// 第二种方法使用 never 类型，编译器用它来进行完整性检查：
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}

function area4(s: Shape3) {
  switch (s.kind) {
    case 'square': return s.size * s.size
    case 'rectangle': return s.height * s.width
    case 'circle': return Math.PI * s.radius * 2
    // case 'triangle': return s.width * 2
    // 类型“Triagnle”的参数不能赋给类型“never”的参数。
    // default: return assertNever(s)
  }
  // should error here - we didn't handle case "triangle"
}
// 这里，assertNever 检查 s 是否为 never 类型 -- 即为除去所有可能情况后剩下的类型。
// 如果忘记了某个case，那么 s 将具有一个真实的类型并且你会得到一个错误。
// 这种方式需要额外定义函数，但是在你忘记某个 case 时也更加明显。

/**
 * 多态的 this 类型
 * 
 * 多态的 this 类型表示的是某个包函类或接口的 子类型。这被称为 F-bounded 多态性。它能很容易的表现连贯接口间的继承。
 * 比如，计算器的例子里，每个操作之后都返回 this 类型：
 */
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  public currentValue(): number {
    return this.value
  }
  public add(operand: number): this {
    this.value += operand
    return this
  }

  public multiply(operand: number): this {
    this.value *= operand
    return this
  }
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue()

// 由于这个类使用了 this 类型，你可以继承他，新的类可以直接使用之前的方法，不需要做任何改变。
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) { super(value) }
  public sin(): this {
    this.value = Math.sin(this.value)
    return this
  }
}

let v1 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue()

// 如果没有 this 类型，ScientificCalculator 就不能够在继承 BasicCalculator 的同时还保持接口的连贯性。
// multiply 将会返回 BasicCalculator，它并没有sin方法。
// 然而，使用 this 类型，multiply 会返回 this，在这里就是 ScientificCalculator。

/**
 * 索引类型
 * 
 * 使用索引类型，编译器就能够检查使用了动态属性名的代码。
 * 例如，一个常见的 JavaScript 模式时从对象中选取属性的子集。
 */
function pluck(o, names) {
  return names.map(n => o[n])
}

// 下面展示如何在 TypeScript 中使用此函数，通过 索引类型查询 和 索引访问 操作符：
function pluck1<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

interface Person8 {
  name: string;
  age: number;
}

let person: Person8 = {
  name: 'Jjjj',
  age: 35
}

let strings: string[] = pluck1(person, ['name'])
// 编译器会检查 name 是否真的是 Person8 的一个属性。
// 本例引入的几个新的类型操作符：
// keyof T 索引类型查询操作符。对于任何类型 T，keyof T 的结果为 T 上已知的公共属性名的联合。例如：
let personProps: keyof Person8

// 第二个类型操作符是 T[K]，索引访问操作符。

// 索引类型和字符串索引签名
// keyof 和 T[K] 与 字符串索引签名进行交互。如果你有一个带有字符串索引签名的类型，那么 keyof T 会是string。
// 并且 T[string] 为索引签名的类型
interface Map2<T> {
  [key: string]: T;
}

// keys 类型为 string
let keys: keyof Map2<number>
// value 类型为 number
let value: Map2<number>['foo']

/**
 * 映射类型
 * 
 * 一个常见的任务是将一个已知的类型每个属性都变为可选的：
 */
interface PersonPartial {
  name?: string;
  age?: number;
}

interface PersonPartialOnly {
  readonly name: string;
  readonly age: number;
}

// 这在 JavaScript 里经常出现，TypeScript 提供了从旧类型中创建新类型的一种方式 -- 映射类型。
// 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。
// 例如，你可以令每个属性成为 readonly 类型或可选的。
type Readonly1<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial1<T> = {
  [P in keyof T]?: T[P]
}

type PersonPartial1 = Partial<Person>
type ReadonlyPerson = Readonly1<Person>

// 下面看下最简单的映射类型和它的组成部分：
type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }

// 在这个简单的例子里，Keys 是硬编码的属性名列表并且属性类型永远是 boolean，因此这个映射类型等同于：
type Flags1 = {
  option1: boolean;
  option2: boolean;
}

// 在真正的应用里，可能不同于上面的 Readonly 或 partical。它们会基于一些已经存在的类型，且按照一定的方式转换字段。
// 这就是 keyof 和 索引访问类型要做的事情：
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerosn = { [P in keyof Person]?: Person[P] }

// 但它更有用的地方是可以有一些通用版本。
type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial2<T> = { [P in keyof T]?: T[P] }


/**
 * 预定义的有条件类型
 * 
 * - Exclude<T, U> -- 从 T 中剔除可以赋值给 U 的类型
 * - Extract<T, U> -- 提取 T 中可以赋值给 U 的类型
 * - NonNullable<T> -- 从 T 中剔除 null 和 undefined
 * - ReturnType<T> -- 获取函数返回值类型
 * - InstanceType<T> -- 获取构造函数类型的实例类型
 */

type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>
type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>

type T02 = Exclude<string | number | (() => void), Function>
type T03 = Extract<string | number | (() => void), Function>

type T04 = NonNullable<string | number | undefined>
type T05 = NonNullable<(() => string) | string[] | null | undefined>

function f21(s: string) {
  return { a: 1, b: s }
}

class C9 {
  x = 0;
  y = 0;
}

type T10 = ReturnType<() => string>
type T11 = ReturnType<(s: string) => void>
type T12 = ReturnType<(<T>() => T)>
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>
type T14 = ReturnType<typeof f21>
type T15 = ReturnType<any>
type T16 = ReturnType<never>

// 错误
// 类型“string”不满足约束“(...args: any) => any”
// type T17 = ReturnType<string>

// 错误
// 类型“Function”不满足约束“(...args: any) => any”。
// 类型“Function”提供的内容与签名“(...args: any): any”不匹配。
// type T18 = ReturnType<Function>

type T20 = InstanceType<typeof C9>
type T21 = InstanceType<any>
type T22 = InstanceType<never>

// 错误，同上
// 类型“string”不满足约束“new (...args: any) => any”
// type T23 = InstanceType<string>

// 错误，同上
// 类型“Function”不满足约束“new (...args: any) => any”。
// 类型“Function”提供的内容与签名“new (...args: any): any”不匹配。
// type T24 = InstanceType<Function>

// 注意，Exclude 类型是建议的 Diff 类型的一种实现。
// 我们使用 Exclude 这个名字是为了避免破坏已经定义了 Diff 的代码，且我们感觉这个名字能更好的表达类型的语义。