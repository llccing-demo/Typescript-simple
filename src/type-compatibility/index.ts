/**
 * 类型兼容性
 */

/**
 * 介绍
 * 
 * TypeScirpt 里的类型兼容性是基于结构子类型的。结构类型是一种只使用其成员来描述类型的方式。
 * 它正好与名义（nominal）类型形成对比。
 */
interface Named {
  name11: string;
}

class Person11 {
  name11: string;
}

let p: Named;
// 这是可以的，因为结构类型
p = new Person11()
// 使用基于名义类型的语言，如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了 Named 接口。

/**
 * 开始
 * 
 * TypeScript 结构化类型系统的基本规则是，如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性。比如：
 */
interface Named1 {
  name: string;
}

let x4: Named1;
let y = { name: 'Alice', location: 'seattle' }
// 这里要检查 y 是否能够赋值给 x4，编译器检查 x 中的美格 属性，看是否能在 y 中也找到对应属性。
// 在这个例子中，y 必须包含名字是 name 的 string 类型成员。y 满足条件，因此赋值正确。
x4 = y

// 检查函数参数时使用相同的规则：
function greet(n: Named1) {
  console.log('hello' + n)
}
greet(y)

// 虽然 y 有额外属性 location，但是不会引发错误，只有目标类型（Named1）的成员会被一一检查是否兼容。
// 这个比较过程是递归的，检查每个成员及子成员。

/**
 * 比较两个函数
 * 
 * 相对来讲，在比较原始类型和对象类型的时候是比较容易理解的，问题是如何判断两个函数是兼容的。
 */

let x5 = (a: number) => 0
let y5 = (b: number, s: string) => 0

y5 = x5
// 不能将类型“(b: number, s: string) => number”分配给类型“(a: number) => number”。
// x5 = y5

// 要看 x 能否赋值给 y，需要看 x 的参数列表类型是否在 y 中存在。类型相同即可，名字无所谓。
// x 的每个参数在 y 中能找到对应的参数，所以允许赋值。
// 第二个错误，因为 y 有个必须的第二个参数，但是 x 没有，所以不允许赋值。

// 为啥允许忽略参数呢？像 y = x 那样。
// 因为忽略额外参数在 JavaScript 里是很常见的。
// 举个例子，Array#forEach给回调函数传3个参数：数组元素、索引、整个数组。尽管如此，输入一个只使用第一个参数的回调函数也是很有用的。

let items = [1, 2, 3]
items.forEach((item, idx, array) => console.log(item))

items.forEach(item => console.log(item))

// 下面看看如何处理返回值类型，创建两个仅仅是返回值类型不同的函数：
let x6 = () => ({ name: 'alice' })
let y6 = () => ({ name: 'alice', location: 'seattle' })

x6 = y6
// 错误了， Property 'location' is missing in type '{ name: string; }' but required in type '{ name: string; location: string; }'
// y6 = x6

// 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。

/**
 * 函数参数双向协变
 * 
 */

// 函数重载
// 对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。这确保了目标函数可以再所有源函数可调用的地方调用。 

// 枚举
// 枚举类型和数字类型兼容，并且数字类型和枚举类型兼容。不同枚举类型之前是不兼容的。比如：
enum Status { Ready, Waiting }
enum Color5 { Red, Blue, Green }

let status1 = Status.Ready
// 错误，不能将类型“Color5.Green”分配给类型“Status”
// status1 = Color5.Green

// 类
// 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。比较两个类类型的对象时，只有实例的成员会被比较。
// 静态成员和构造函数不在比较的范围内。
class Animial8 {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size8 {
  feet: number;
  constructor(numFeet: number) {}
}

let a8: Animial8;
let s8: Size8;
a8 = s8;
s8 = a8;

// 类的私有成员和受保护成员
// 类的私有成员和受保护成员会影响兼容性。