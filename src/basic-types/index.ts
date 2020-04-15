/**
 * TypeScript 支持与 JavaScript 几乎相同的数据类型，还提供了枚举类型
 * 
 */


/**
 * 布尔值 boolean
 * true/false
 */
let isDone: boolean = false;

/**
 * 数字 number
 * 和 JavaScript 一样，TypeScript 里所有数字都是浮点数，类型是 number。支持 十进制、十六进制字面量
 * 还支持 ECMAScript 2015 中引入的二进制、八进制字面量
 */
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

/**
 * 字符串 string
 * 支持 ""、''
 */
let nameName: string = "bob";
nameName = "simth";

/**
 *
 let name: string = "bob";
 name = "simth";
 * 这里有个很奇怪的问题，不能用 name 作为变量名吗？
 *  node_modules/typescript/lib/lib.dom.d.ts:19627:15
    19627 declare const name: never;
                        ~~~~
    'name' was also declared here.
 */

//  never 类型 https://www.zhihu.com/question/354601204

// 也可以使用 模板字符串
let nameTemp: string = `Gene`

/**
 * 数组 number[]
 * 两种方式定义数组:
 * 1. 元素类型后接上 []，表示此类型元素组成的数组
 * 2. 使用数组反省，Array<元素类型>
 */
let list: number[] = [1, 2, 3];

let list2: Array<number> = [1, 2, 3]

/**
 * 元组 Tuple
 * 元组类型，允许表示一个已知元素数量和类型的数组，各元素类型不必相同。
 */

// 声明一个元组类型
let x: [string, number]
// 初始化
x = ['12313', 123123]
// 错误的初始化
// x = [10, 'hello']

// 当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substr(1));
// 类型“number”上不存在属性“substr”。
// console.log(x[1].substr(1))

// 当访问一个越界的元素，会使用联合类型替代：
// x[3] = 'world'; // 不能将类型“"world"”分配给类型“undefined”。

// let a = x[5] // Tuple type '[string, number]' of length '2' has no element at index '5'.
// console.log(a.toString()) // 对象可能为“未定义”。

/**
 * 枚举
 * 枚举是对 JavaScript 标准数据类型的补充。
 * 使用枚举可以为一组数值赋予友好的名字
 */
enum Color { Red, Green, Blue }
let c: Color = Color.Green

// 默认情况下从 0 开始编号。也可以指定
enum Color1 { Red = 1, Green, Blue }
let c1: Color1 = Color1.Red

// 或者全部手动赋值
enum Color2 { Red = 1, Green = 2, Blue = 4 }
let c2: Color2 = Color2.Green

// 枚举类型的一个便利是，可以通过数值得到名字

enum Color3 { Red = 1, Green, Blue }
let colorName: string = Color3[2]

console.log(colorName) // 2 对应的 Green

/**
 * Any
 * 为编程过程中，还不清楚类型的变量指定一个类型。
 * 这些值可能来自动态内容，用户输入活第三方代码库。
 * 这些情况下，我们不希望类型检查器对这些值进行检查而直接让他们通过编译阶段的检查。
 * 那么我们可以使用 any 类型来标记这些变量：
 */
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false

/**
 * 对现有代码进行改写的时候，any 类型十分有用，他允许你在编译时可选择地包函或移除类型检查。
 * 你可能认为 Object 有类似作用，但 Object 类型的变量只是允许你给他赋任意值 - 但是却不能调用任意方法，
 * 即便他真的有这些方法：
 */
let notSure1: any = 4;
notSure.ifItExists(); // 可行，ifItExists 可能在运行时存在
notSure.toFixed(); // 可行，toFixed 存在（但是编译器不检查它）

let prettySure: Object = 4;
// prettySure.toFixed(); // Error 类型“Object”上不存在属性“toFixed”。

// 当你只知道一部分数据的类型时，any 类型时有用的。比如，你有一个包含了不同类型的数组：
let list1: any[] = [1, true, 'string'];
list1[1] = 100;