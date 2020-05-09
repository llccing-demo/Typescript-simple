/**
 * Symbols
 * 
 * 从 ECMAScript 2015起，symbol 成为了一种新的原生类型，就像 number 和 string 一样。
 */

// symbol 类型的值是通过 Symbol 构造函数创建的。
// 注意 target 应该是 es6，否则编译不过
let sym1 = Symbol();
let sym2 = Symbol('key')

// Symbols 是不可以改变且唯一的。
let sym3 = Symbol('key')
let sym4 = Symbol('key')
sym3 === sym4 // false, symbols 是唯一的

// 像字符串一样，Symbol 也可以作为对象属性的键
let sym5 = Symbol()
let obj = {
  [sym5]: 'value'
}

// Symbol 也可以与计算出的属性名声明相结合来声明对象的属性和类成员。
const getClassNameSymbol = Symbol();
class C10 {
  [getClassNameSymbol](){
    return 'C'
  }
}

let c10 = new C10()
let className = c10[getClassNameSymbol]()

/**
 * 众所周知的 Symbol
 * 
 * 除了用户自定义的 Symbol，还有一些已经众所周知的内置 Symbol，内置 Symbol 用来表示语言内部的行为。
 */

// 以下为这些 Symbol 的列表


// 该方法会被 instanceof 运算符调用。构造对象用来识别一个对象是否是其实例
Symbol.hasInstance

// 布尔值，表示当在一个对象上调用 Array.prototype.concat 时，这个对象的数组元是否可以展开。
Symbol.isConcatSpreadable

// 被 for-of 语句调用，返回对象的默认迭代器。
Symbol.iterator

// 被 String.prototype.match 调用。正则表达式用来匹配字符串
Symbol.match
// 替换匹配到的字符串
Symbol.replace
// 返回被匹配部分在字符串中的索引
Symbol.search

// 函数值，为一个构造函数。用来创建派生对象
Symbol.species

// 被 String.prototype.split 调用。正则表达式用来分割字符串
Symbol.split

// 被 ToPrimitive 抽象操作调用。把对象转换为相应的原始值。
Symbol.toPrimitive

// 被内置方法 Object.prototype.toString 调用。返回创建对象时默认的字符串描述
Symbol.toStringTag

// 对象，他自己拥有的属性会被 with 作用域排除在外
Symbol.unscopables

