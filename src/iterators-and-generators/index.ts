/**
 * 迭代器和生成器
 */

/**
 * 可迭代性
 * 
 * 当一个对象实现了 Symbol.iterator 属性时，我们认为它是可迭代的。
 * 一些内置的类型如 Array/Map/Set/String/Int32Array/Unit32Array 等都已经实现了各自的 Symbol.iterator。
 * 对象上的 Symbol.iterator 函数负责返回供迭代的值。
 */

// for..of 语句
// for..of 语句会遍历可迭代的对象，调用对象上的 Symbol.iterator 方法。
let someArray = [1, 'string', false]
for (let entry of someArray) {
  console.log(entry)
}

// for..of vs for..in 语句
// for..of 和 for..in 均可迭代一个列表；但是用于迭代的值却不同，
// for..in 迭代的是对象的 键 的列表，
// for..of 迭代的是对象的键对应的 值

let list3 = [4, 5, 6]
for (let i in list) {
  console.log(i)
  // '0', '1', '2' 字符串类型
}

for (let i of list) {
  console.log(i)
  // 4, 5, 6 数字类型
}

// for..in 可以操作任何对象=；它提供了查看对象属性的一种方法。
// 内置对象 Map 和 Set 已经实现了 Symbol.iterator 方法，让我们可以访问他们保存的值。

let pets = new Set(['cat', 'Dog', 'Hamster'])
pets['species'] = 'mammals'

for (let i in pets) {
  // 注意，这里只打印了 species
  console.log(i)
}

for (let i of pets) {
  // "Cat", "Dog", "Hamster"
  console.log(i)
}


// 代码生成
// 目标为 ES5 和 ES3

// 当生成目标为 ES5 或 ES3 时，迭代器只允许在 Array 类型上使用。
// 在非数组值上使用 for..of 语句会得到一个错误，就算这些非数组值已经实现了 Symbol.iterator 属性。

// 编译器会生成一个简单的 for 循环作为 for..of 循环替代，比如：

let numbers = [1, 2, 3]
for (let i of numbers) {
  console.log(i)
}

// 编译为
for (var _i = 0, _numbers = numbers; _i < _numbers.length; _i++) {
  var i = _numbers[_i];
  console.log(i);
}

// 目标为 ECMAScript 2015 或更高时，编译器会生成相应引擎的 for..of 内置迭代器实现方式。
