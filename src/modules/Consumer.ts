import t from './myClass'
import f from './MyFunc'

let x = new t()
console.log(f())

import { SomeType, someFunc } from './MyThings'
let x2 = new SomeType()
let y = someFunc()

import * as MyLargeModule from './MyLargeModule'
let x3 = new MyLargeModule.Cat()