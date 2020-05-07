/**
 * 类型推论
 */

/**
 * 基础
 */
// TypeScript 里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。如下
let x2 = 3;
// 这里 x 的类型被推断为数字。这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。

/**
 * 最佳通用类型
 * 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，
 */
let x3 = [0, 1, null]

/**
 * 上下文类型
 * 
 * TypeScript 类型推论也可以按照相反的方向进行。这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时。比如：
 */
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button)
  // 这里没有报错……
  console.log(mouseEvent.kangaroo)
}

// 这里有明确的参数类型注解，上下文类型被忽略。
window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.button)
}

// 上下文归类在很多情况下使用到。通常包括函数的参数、赋值表达式的右边、类型断言、对象成员和数组字面量和返回值语句。
// 上下文类型也会作为最佳通用类型的候选类型，比如：
function createZoo(): Animal[] {
  return []
}