/**
 * 变量声明
 */

/**
 * TypeScirpt 是 JavaScript 的超集，所以本身就支持 let 和 const。
 */

/**
 * var 声明
 * 作用域规则：函数作用域
 * 捕获变量的怪异之处：for循环
 */

/**
 * let 声明
 * 块作用域（暂时性死区）
 * 重定义及屏蔽
 */

/**
 * const 声明
 * 赋值后不能在改变。与 let 有相同的作用域规则，不能重新赋值。
 * 引用类型，可以修改属性值。实际引用没有变化。
 */

/**
 * let vs const
 * 使用 最小特权原则，所有变量除了计划去修改的都应该用 const。
 * 基本原则是如果一个变量不需要对它写入，那么其他使用这些代码的人也不能够写入他们，并且要思考为什么会需要对这些变量重新赋值。
 * 使用 const 也可以让我们更容易的推测数据的流动。
 */

/**
 * 解构
 * 数组解构
 * 对象解构
 */

// 属性重命名
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};

// 这里的冒号后面跟着的不是类型，而是新的名字
let { a: newName1, b: newName2 } = o
// 下面是经过编译后的代码
// var newName1 = o.a, newName2 = o.b;

// 如果需要指定类型
let { a, b }: { a: string, b: number } = o

// 默认值
// b 为 undefined 时，a、b 都有值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject
}

keepWholeObject(o)

// 函数声明

// 解构应用于函数声明
type C = { a: string, b?: number }
function f({ a, b }: C): void {
}

// 指定默认值
function f1({ a = "", b = 0 } = {}): void {
}
f1();

function f2({ a, b = 0 } = { a: '' }): void {
}

f2({ a: 'yes' })
f2()
// 下面这个会报错，因为需要 a 属性
// f2({})

/**
 * 展开
 */

let first = [1,2]
let second = [3,4]
let bothPlus = [0, ...first, ...second, 5]

// 对象展开
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };
// 这里会有 属性值覆盖，food字段值会变为 rich
let search = { ...defaults, food: 'rich' }

// 对象展开的限制，仅包含对象 自身的可枚举属性
class Cls {
  p = 12
  m() {}
}

let cls = new Cls()
let clone = { ...cls }
clone.p;
// 这里会报错，因为 m 方法是原型上的方法，不是对象自身的方法
// clone.m()
