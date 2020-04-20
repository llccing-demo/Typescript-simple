/**
 * 类
 * 
 * 传统的 JavaScript 程序使用函数和基于原型的继承来创建可重用的组件，但是对于熟悉使用面向对象方式的程序员来讲就有些棘手，
 * 因为他们用的是基于类的继承并且对象是有类构建出来的。
 */

// 使用类的例子
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'hello' + this.greeting
  }
}

let greeter1 = new Greeter('world')

/**
 * 继承
 * 
 * TypeScript 中我们可以使用常用的面向对象模式。基于类的程序设计中，一种最基本的模式是允许使用继承来扩展现有的类。
 */
class Animal1 {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m`)
  }
}

class Dog1 extends Animal1 {
  bark() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog1();
dog.bark();
dog.move(10)
dog.bark()

// 这个例子展示了最基本的继承：类从基类中继承了属性和方法。Dog 是派生类，它派生自 Animal 基类，通过 extends 关键字。
// 派生类通常被称作 子类，基类通常被称作 超类。

// 看个更复杂的例子
class Animal2 {
  name: string;
  constructor(theName: string) { this.name = theName }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m`)
  }
}

class Snake extends Animal2 {
  constructor(name: string) { super(name) }
  move(distanceInMeters = 5) {
    console.log('蛇在动')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal2 {
  constructor(name: string) { super(name) }
  move(distanceInMeters = 45) {
    console.log('马在跑')
    super.move(distanceInMeters)
  }
}

let sam = new Snake('青蛇');
let tom: Animal2 = new Horse('白龙马')

sam.move()
tom.move(34)

// 这个例子展示了上面没有提到的特性。这次我们通过 extends 关键字创建了 Animal2 的两个子类： Horse 和 Snake。
// 与前面不同的是，派生类包含了一个构造函数，他必须调用 super()，它会执行基类的构造函数。
// 而且，在构造函数里访问 this 的属性之前，我们一定要调用 super()。这是 TypeScript 强制执行的一条重要规则。
// 这个例子演示了如何在子类中重写父类方法。
// 注意，即使 tom 被声明为 Animal2 类型，但是因为它的实际值是 Horse，调用 tom.move(34) 时，它会调用 Horse 里重写的方法

/**
 * 公共、私有与受保护的修饰符
 * 
 * TypeScript中，成员都默认为 public
 */

class Animal3 {
  public name: string;
  public constructor(theName: string) { this.name = theName }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m`)
  }
}



// TypeScript 的 class 和 原生 Class的区别是？
// https://blog.csdn.net/yuse6262/article/details/100183571

/**
 * private
 * 当成员标记为 private 时，它就不能再声明它的类的外部访问.
 */

class Animal4 {
  private name: string;
  constructor(theName: string) { this.name = theName }
}
// Error 属性“name”为私有属性，只能在类“Animal4”中访问。
// new Animal4('nnnn').name;

// TypeScript 使用的是结构性类型系统（啥意思？）。当我们比较两种不同的类型时，并不在乎他们从何处而来，
// 如果所有的成员的类型都是兼容的，我们就认为他们的类型是兼容的。

// 然而，当我们比较带有 private 和 protected 成员的类型时，情况就不同了。如果其中一个类型里包含了一个 private 成员，
// 那么只有当另外一个类型中也存在这样一个 private 成员，并且它们都来自同一处声明时，我们才认为这个两个类型是兼容的。
// 对于 protected 成员也使用这个规则。

// 下面这个例子很好的说明了这一点：
class Animal5 {
  private name: string;
  constructor(theName: string) { this.name = theName }
}

class Rhino extends Animal5 {
  constructor() { super('Rhino') }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName }
}

let animal = new Animal5('Goat')
let rhino = new Rhino();
let employee = new Employee('Bob')

animal = rhino
// 错误，虽然 employee 也有 name 属性，但是和 animal 并不是来自同一处
// animal = employee

// 因为 Animal 和 Rhino 共享了来自 Animal 离得私有成员定义 private name: string，因此他们是兼容的。
// 然而，Employee 却不是这样。他们不兼容，尽管 Employee 里也有一个私有成员 name，但它明显不是 Animal 里面定义的那个。

/**
 * protected
 * 
 * 和 private 类似，有一点不同，protected 成员在派生类中仍然可以访问。
 */
class Person4 {
  protected name: string;
  constructor(name: string) { this.name = name }
}

class Employee1 extends Person4 {
  private department: string;
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

let howard = new Employee1('Howard', 'Sales');
console.log(howard.getElevatorPitch())
// 属性“name”受保护，只能在类“Person”及其子类中访问。
// console.log(howard.name)

// 注意，我们不能在 Person 类外使用 name，但是我们仍然可以通过 Employee 的实例方法 getElevatorPitch 访问
// 因为 Employee 是 Person 类派生来的。

// 构造函数也可以被标记为 protected。这意味着这个类不能在包含他的类外被实例化，但是能够被继承。比如：
class Person1 {
  protected name: string;
  protected constructor(theName: string) { this.name = theName }
}

class Employee2 extends Person1 {
  private department: string;
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

let howard1 = new Employee2('Howard', 'Sales')
// 错误，类“Person1”的构造函数是受保护的，仅可在类声明中访问。
// let john = new Person1('John');

/**
 * readonly 修饰符
 * 
 * 可以使用 readonly 关键字将属性设置为只读的。只读属性必须在声明时或者构造函数里被初始化。
 */
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName
  }
}
let dad = new Octopus('Man with the 8 strong legs')
// 错误，name是只读的
// dad.name = 'Man with the 3-piece suit'

// 参数属性
// 上面的例子中，我们必须在 Octopus 类里定义一个只读成员 name 和一个参数为 theName 的构造函数，
// 并且立刻将 theName 的值赋值给 name，这种情况经常会遇到。
// 参数属性，可以方便的让我们在一个地方定义并初始化一个成员。
// 下面的例子就是对之前的修改版，使用了参数属性：
class Octopus1 {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) { }
}

// 这里我们将声明和赋值合并到了一处，仅在构造函数里使用 readonly name: string 参数来创建和初始化 name 成员。
// 参数属性 通过给构造函数参数前增加一个访问限定符来声明。使用 private 限定一个参数属性会声明并初始化一个私有成员；
// 对于 public 和 protected 来说也是一样。

/**
 * 存取器
 * 
 * TypeScript 支持通过 getter/setter 来截取对对象的访问。它能够帮助你有效的控制对对象成员的访问。
 */

// 下面我们看如何将简单的类改为 get/set。
class Employee3 {
  fullName: string;
}

let employee3 = new Employee3();
employee3.fullName = 'Bob smith'
if (employee3.fullName) {
  console.log(employee3.fullName)
}

// 随意改变 fullName 有时可能带来麻烦。
// 下面我们先检查用户密码是否正确，然后再允许其修改员工信息。我们把对 fullName 的直接访问改成了可以检查密码的 set 方法。
// 我们也加了 get 方法，让上面的例子仍可以工作。
let passcode = 'secret passcode'
class Employee4 {
  private _fullName: string;

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('错误，没有授权修改雇员信息')
    }
  }
}

let employee4 = new Employee4()
employee4.fullName = 'bob Smith'
if (employee4.fullName) {
  alert(employee4.fullName)
}

// 存取器有下面几点需要注意的：
// 首先，存取器要求你将编译器设置为输出 ECMAScript 5或者更高。不支持降级到 ECMAScript 3。
// 其次，只带有 get 不带有 set 的存取器自动被推断为 readonly。这在从代码生成为 .d.ts 文件时是有帮助的，
// 因为利用这个属性的用户会看到不允许改变他的值。

/**
 * 静态属性
 * 类的实例成员，指的是仅当类被实例化的时候才会被初始化的属性。
 * 我们可以创建类的静态成员，这些属性存在于类的本身上面而不是类的实例上。
 */

class Grid {
  static origin = { x: 0, y: 0 }
  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = (point.x - Grid.origin.x)
    let yDist = (point.y - Grid.origin.y)
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  // 这里同时进行了声明和初始化
  constructor(public scale: number) { }
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

/**
 * 抽象类
 * 
 * 抽象类作为其他派生类的基类使用。
 * 他们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。
 * abstract 关键字是用于定义抽象类和抽象类内部定义抽象方法。
 */
abstract class Animal6 {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earch...')
  }
}

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// 抽象方法的语法与接口方法相似。
// 两者都是定义方法签名但不包含方法体。然而，抽象方法必须包含 abstract 关键词并且可以包含访问修饰符。
abstract class Department {
  constructor(public name: string) {

  }

  printName(): void {
    console.log(`Department name: ${this.name}`)
  }

  abstract printMetting(): void;
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing')
  }

  printMetting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

// 允许创建一个对抽象类型的引用
let department: Department;
// 错误，无法创建抽象类的实例。
// department = new Department();
department = new AccountingDepartment();
department.printName();
department.printMetting();
// 错误，方法在声明的抽象类中不存在
// department.generateReports();

/**
 * 高级技巧
 */

// 构造函数

// 当你在 TypeScript 里声明一个类的时候，实际上同时声明了很多东西。首先就是类的 实例的类型。
class Greeter1 {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'hello' + this.greeting
  }
}

// 这里我们写了 let greeter2: Greeter1, 意思是 Greeter 类的实例的类型是 Greeter。
let greeter2: Greeter1;
greeter2 = new Greeter1('world');
console.log(greeter2.greet())

// 我们也创建了一个叫做 构造函数的值。这个函数会在我们使用 new 创建类实例的时候被调用。
// 下面我们看看，上面的代码被编译成 JavaScript 后是什么样子：

var Greeter2 = /** @class */ (function () {
  function Greeter1(message) {
    this.greeting = message;
  }
  Greeter1.prototype.greet = function () {
    return 'hello' + this.greeting;
  };
  return Greeter1;
}());

var greeter3;
greeter3 = new Greeter1('world');
console.log(greeter3.greet());

// 上面代码里，var Greeter2 被赋值为构造函数。当我们调用 new 并执行了这个函数后，便会得到一个类的实例。
// 这个构造函数也包含了类的所有静态属性。换个角度说，我们可以认为类具有 实例部分 和 静态部分 这个两个部分。


class Greeter5 {
  static standardGreeting = 'Hello, there';
  greeting: string;
  greet() {
    if (this.greeting) {
      return 'hello, ' + this.greeting
    } else {
      return Greeter5.standardGreeting
    }
  }
}

let greeter5: Greeter5;
greeter5 = new Greeter5();
console.log(greeter5.greet())

// 这里的是赋值 类型 然后赋值 值
let greeterMarker: typeof Greeter5 = Greeter5
greeterMarker.standardGreeting = 'hey, there';

let greeter6: Greeter5 = new greeterMarker()
console.log(greeter6.greet())

// typeof Greeter5 的意思是取 Greeter5 类的类型，而不是实例的类型，也就是构造函数的类型。
// 这个类型包含了类的所有静态成员和构造函数。

// 把类当做接口使用
// 如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。因为类可以创建出类型，
// 所以你能够在允许使用接口的地方使用类。

class Point1 {
  x: number;
  y: number
}

interface Point3d extends Point1 {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
