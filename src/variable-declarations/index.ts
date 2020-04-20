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

//  todo ... 解构