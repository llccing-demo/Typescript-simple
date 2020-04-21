/**
 * 函数
 * 
 * 函数是 JavaScript 应用程序的基础。它帮助你实现抽象层、模拟类、信息隐藏和模块。
 * 在 TypeScript 里，虽然已经支持类、命名空间和模块，但函数仍然是主要的定义 行为 的地方。
 * TypeScript 为 JavaScript 函数添加了额外的功能，让我们可以更容易的使用。
 */

// 函数
// TypeScript 函数可以创建有名字的函数和匿名函数。

// 命名函数
function add(x, y) {
  return x + y
}

// 匿名函数
let myAdd = function (x, y) { return x + y }

// 在 JavaScript 里，函数可以使用函数体外部的变量。
let z = 100
function addToZ(x, y) {
  return x + y + z
}

/**
 * 函数类型
 */

// 为函数定义类型
function add1(x: number, y: number): number {
  return x + y
}

let myAdd1 = function (x: number, y: number): number { return x + y }

// 我们可以为每个参数添加类型之后再为函数本身添加返回值类型。
// TypeScript 能够根据返回语句自动推断出返回值类型，因此我们通常忽略它。

// 书写完整函数类型
let myAdd2: (x: number, y: number) => number =
  function (x: number, y: number): number { return x + y }

// 函数类型包函两部分：参数类型和返回值类型。当写出完整函数类型的时候，这两部分都是需要的。
// 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。这个名字只是为了增加可读性。
// 我们也可以这么写：
let myAdd3: (baseValue: number, increment: number) => number =
  function (x: number, y: number): number { return x + y }

// 只要参数类型是匹配的，那么就认为他是有效的函数类型，而不在乎参数名是否正确。

// 第二部分是返回值类型。对于返回值，我们再函数和返回值之前使用 (=>) 符号，使之清晰明了。
// 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有任何返回值，你也必须制定返回值类型为 void 而不能留空。

// 函数的类型只是有参数类型和返回值类型组成的。函数中使用的捕获变量不会体现在类型里
// 实际上，这些变量是函数的隐藏状态并不是组件 API 的一部分。


// 推断类型

// 如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript 编译器会自动识别出类型：
// 全的函数类型
let myAdd4 = function (x: number, y: number): number { return x + y }
// 参数 x,y 是数字类型
let myAdd5: (baseValue: number, increment: number) => number =
  function (x, y) { return x + y }

// 这叫做 “按上下文归类”，是类型推断的一种。它帮助我们更好地为程序指定类型。

/**
 * 可选参数 和 默认参数
 * 
 * TypeScript 里的每个参数都是必须的。
 * 这不是指不能传递 null 和 undefined 作为参数，而是说编译器检查用户是否为每个参数都传入了值。
 * 编译器还会假设只有这些参数会被传递进函数
 * 简短的说，传递给一个函数的参数个数必须与函数期望的参数个数一致。
 */
function buildName(firstName: string, lastName: string) {
  return firstName + '' + lastName
}

// 错误，应有 2 个参数，但获得 1 个
// let result1 = buildName('Bob')
// 错误，应有 2 个参数，但获得 3 个
// let result2 = buildName('Bob', 'adams', 'Sr.')
let result3 = buildName('Bob', 'Adams')


// JavaScript 里，每个参数都是可选的，可传可不传。没传的时候就是 undefined。
// TypeScript 中可以在参数名旁用 ? 实现可选参数的功能。比如：
function buildName1(firstName: string, lastName?: string) {
  if (lastName) {
    return first + '' + lastName
  } else {
    return firstName
  }
}

// lastName 是可选参数，所以正确
let result4 = buildName1('Bob')
// 参数过多
// let result5 = buildName1('Bob', 'adams', 'Sr.')
let result6 = buildName1('Bob', 'Adams')

// 可选参数必须放在必选参数后面。

// TypeScript 里，我们可以为参数提供一个默认值，当用户没有传递这个参数或者传递的值是 undefined 时。
function buildName2(firstName: string, lastName = 'Smith') {
  return firstName + '' + lastName
}

let result7 = buildName2('Bob')
let result8 = buildName2('Bob', undefined)
// 参数过多
// let result9 = buildName2('Bob', 'adams', 'Sr.')
let result10 = buildName2('Bob', 'Adams')

// 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。
// 也就是说可选参数与末尾的默认参数共享参数类型。
function buildName3(firstName: string, lastName?: string) { }
function buildName4(firstName: string, lastName = 'Smith') { }

// 共享同样的类型 (firstName: string, lastName?: string) => string。
// 有默认值的 lastName 的类型消失了，仅留下参数是可选的事实。

// 与普通可选参数不同，带默认值的可选参数不需要放在必须参数后面。
// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined 值来获得默认值。

function buildName5(firstName = 'Will', lastName: string) {
  return firstName + ' ' + lastName
}

// 错误 少一个参数
// let result11 = buildName5('bob')
// 错误 多一个参数 
// let result12 = buildName5('bob', 'Adams','Sr.')
let result13 = buildName5('Bob', 'Adams')
// 显示的指定第一个参数为 undefined
let result14 = buildName5(undefined, 'adams')


/**
 * 剩余参数
 * 
 * 必要参数，默认参数和可选参数的共同点是：他们表示某一个参数。
 * 你想同时操作多个参数，或者你并不知道会有多少个参数传进来。
 * JavaScript 中可以使用 arguments 来访问所有传入的参数
 */

// TypeScript 中你可以把所有参数收集到一个变量里：
function buildName6(firstName: string, ...resetOfName: string[]) {
  return firstName + ' ' + resetOfName.join(' ')
}

let employeeName = buildName6('Joseph', 'Samuel', 'Lucas', 'Mackinzie')


// 省略号也会在带有剩余参数的函数类型定义上使用到：
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName6


/**
 * this
 * 
 * 学习如何在 JavaScript 里正确使用 this 就好比一场成年礼。
 * TypeScript 能够通知你错误地使用了 this 的地方。
 */

// this 和 箭头函数

// JavaScript 里，this 的值在函数被调用的时候才会指定。这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用上下文是什么。
// 众所周知，这不是一个简单的事，尤其是在返回一个函数，或者将函数当做参数传递的时候

// 下面看一个例子:
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

// createCardPicker 本身是个函数，它有返回了一个函数。
let cardPicker = deck.createCardPicker()
// createCardPicker 返回的函数中的 this 被设置为了 window 而不是 deck 对象。
// 因为我们独立调用了 cardPicker()。 顶级的非方法式调用会将 this 视为 window。（严格模式下 this 为 undefined）
let pickedCard = cardPicker()
alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit)

// 为了解决这个问题，我们可以在函数被返回时就绑好正确的 this。这样无论怎么使用，都会引用绑定的 deck 对象。
// 我们需要改变函数表达式来使用 ECMAScript 6 箭头语法。箭头函数能保存函数创建时的 this 值，而不是调用时的值。

let deck1 = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function () {
    // 箭头函数，允许我们将 this 捕获在这里
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

let cardPicker1 = deck1.createCardPicker();
let pickedCard1 = cardPicker1();

alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

// 如上，就解决了 this 指向的问题。同时给编译器配置 "noImplicitThis": true 标记。
// 它会指出 this.suits[pickSuit] 里的 this 的类型为 any。

// this 参数
// 不幸的是，this.suits[pickSuit] 的类型依旧是 any。这是因为 this 来自对象字面量的函数表达式。
// 修改的方法是，提供一个显示的 this 参数。this 参数是个假的参数，它出现在参数列表的最前面：
function f3(this: void) {
  console.log(this)
}

// 所谓假的参数，我们可以看下面的编译结果，this 参数会被 typescript 删除掉
// function f3() {
//   console.log(this);
// }

// 让我们向上面的例子中增加一些接口， Card 和 Deck，让类型重用能够变得清晰简单些：
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[],
  cards: number[],
  createCardPicker(this: Deck): () => Card
}

let deck2: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
    }
  }
}

let cardPicker2 = deck2.createCardPicker();
let pickedCard2 = cardPicker2();

alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 现在 TypeScript 知道 createCardPicker 期望在某个Deck对象上调用。也就是说 this 是 Deck 类型的，而非 any
// 因此，"noImplicitThis": true 就不会报错了


// this 参数在回调函数里
// 你可能也看到过在回调函数里的 this 报错，当你将一个函数传递到某个库函数里稍后被调用时。
// 因为当回调被调用的时候，它们会被当成一个普通函数调用，this 将为 undefined。
// 稍作改动，你就可以通过 this 参数来避免错误。首先，库函数的作者要指定 this 的类型：
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

// this:void 这表示 addClickListener 希望 onclick 函数，不需要 this 类型，也表明你将在代码中使用 this。

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // 这里使用了 this，如果在运行时的回调函数中使用将会报错
    // this.info = e.message
  }
}

let h = new Handler();
// todo 剩余部分内容，文档逻辑有点问题，暂略



/**
 * 重载
 * 
 * JavaScript 本身是个动态语言。JavaScript 里函数根据传入不同的参数而返回不同类型的数据是很常见的。
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
  // 检查类型是否为 object/array
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  }

  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 }
]
let pickedCard3 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard4 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// pickCard 方法根据传入参数的不同会返回两种不同的类型。如果传入的是代表纸牌的对象，函数的作用是从中抓一张纸牌。
// 如果用户想抓纸牌，我们告诉他抓到了什么牌。那么该怎么在类型系统中表示呢

// 方法是为同一个函数提供多个函数类型定义来进行函数重载。
// 编译器会根据这个列表去处理函数的调用

let suits1 = ["hearts", "spades", "clubs", "diamonds"];
function pickCard1(x: { suit: string; card: number; }[]): number;
function pickCard1(x: number): { suit: string; card: number };
function pickCard1(x): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck1 = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard5 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard6 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 这样改变后，重载的 pickCard1 函数在调用的时候会进行正确的类型检查。

// 为了让编译器能够选择正确的检查类型，它与 JavaScript 里的处理流程相似。它查找重载列表，尝试使用第一个重载定义。
// 如果匹配的话就使用这个。
// 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

// 注意，function pickCard1(x): any 并不是重载列表的一部分，因此这里只有两个重载：
// 一个是接收对象，另一个是接收数字
// 以其他参数调用 pickCard1 会产生错误。
