import { List } from "immutable"

const test: List<List<number>> = List([List([1,2,3,4])])

console.log(test)