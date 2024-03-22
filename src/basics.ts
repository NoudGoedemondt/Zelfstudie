import { List } from "immutable";

/*
Recursive variables:

function drawAstrx1(len: number): string {
    let res = ''
    for (let i = 0; i < len; i++) {
        res += '*'
    }
    return res
}

        |
        V

function drawAstrx2(len: number): string {
    return len <= 0 ? '' : drawAstrx2(len-1) + '*'
}

        |
        V

const drawAstrx3 = (len: number): string => len <= 0 ? '' : drawAstrx3(len-1) + '*'


///////////////////////////////////////
Functions

const drawLine = (size: number): string => size <= 0 ? '' : drawLine(size-1) + '*'

const drawRectangle = (height: number, width: number): string => 
    height <= 0 ? '' : drawLine(width) + '\n' + drawRectangle(height - 1, width)

const drawSquare = (size: number): string => drawRectangle(size, size)

const smallSquare = drawSquare(3)
const bigSquare = drawSquare(8)

console.log(drawRectangle(5, 6))
console.log(drawSquare(5))


Recursive functions:

type isPixelOn = (x:number, y:number, height:number, width:number) => boolean

const drawShape = (width:number, height:number, isPixelOn:isPixelOn): string => {
    let res = ''
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isPixelOn(x, y, height, width)) {
                res += '*'
            } else {
                res += ' '
            }
        }
        res += '\n'
    }
    return res
}

const plus = (f:isPixelOn, g:isPixelOn): isPixelOn => (x,y,w,h) => f(x,y,w,h) || g(x,y,w,h)

type twoPar = (x:number, y:number) => boolean
const fullSquare: twoPar = (x,y) => true

const noSquare: (x:number, y:number) => boolean = (x,y) => false
const topRow: (x:number, y:number) => boolean = (x,y) => y == 0
const firstCol: (x:number, y:number) => boolean = (x,y) => x == 0
const bottomRow: (x:number, y:number, height:number, width:number) => boolean = (x,y,w,h) => y == h-1
const lastCol: (x:number, y:number, height:number, width:number) => boolean = (x,y,w,h) => x == w-1
const triangle: isPixelOn = (x,y,w,h) => x<=y

console.log(drawShape(9, 9, triangle))


///////////////////////////////////////
Types


type HasName = {name: string}
type HasSurname = {surname: string}
type HasAge= {age: number}

type Person = HasName & HasSurname & HasAge

type Owner = HasName & {ID: string, person: Person}

const noud: Person = {
    name: 'Noud',
    surname: 'Goedemondt',
    age: 24
}

const owner: Owner = {
    ID: 'XXXX-XXXX-XXXXX',
    name: 'NoudG',
    person: noud
}

type LivingBeings = Person | Owner

function printBeingName (x: LivingBeings): void {
    if ('ID' in x) {
        console.log(x.ID)
    } else {
        console.log(x.name)
    }
}

printBeingName(owner)


Recursive Types:

type EmptyListNum = { kind: 'empty' } 
type FullListNum = { kind: 'full', head: number, tail: ListNum }
type ListNum = EmptyListNum| FullListNum

const empty = (): EmptyListNum => ({kind: 'empty'})
const full = (head: number, tail: ListNum): FullListNum => ({kind: 'full', head: head, tail: tail})

const range = (lower: number, upper: number): ListNum => 
    lower > upper ? empty() : full(lower, range(lower + 1, upper))

const l: ListNum = range(1, 6)

console.log(JSON.stringify(l))


///////////////////////////////////////
Generics


type ContentWithCounter<T> = { content: T, counter: number }
const contentWithCounter = <T>(content: T): ContentWithCounter<T> => ({ content: content, counter: 0 })

const incre = <T>(source: ContentWithCounter<T>): ContentWithCounter<T> => ({...source, counter: source.counter+1})


const cwcOfTypeString = contentWithCounter<string>("Can contain any string")
const cwcOfTypeNum = contentWithCounter<number>(123454325)

const cwc = contentWithCounter<string>("hihi")

console.log(cwcOfTypeString)
console.log(cwcOfTypeNum)



const numbers: Array<Array<number>> = [[1, 2, 3], [4, 5, 6]]

//numbers[0] = numbers[1]

for (const outer of numbers) {
    for (const inner of outer) {
        console.log(inner)   
    }
}

type Person = { name: string, surname: string }

const person: Person = { name: 'John', surname: 'Doe'}

// Simulate API call that has a succes rate of 90%, returns a person if successful
const p0 : Promise<Person> = 
    new Promise<Person>((resolve, reject) => {
        if (Math.random() <= 0.9) {
            resolve(person)
        } else {
            reject("Error: wrong credentials")
        }
    })

p0.then(reason => console.log(reason)) 
    .catch(reason => console.log(`There has been a problem: ${reason}`))


type Fun<a,b> = (_:a) => b

type List<T> = { kind: "empty"} | { kind: "full", head:T, tail: List<T> }
const emptyList = <T>() : List<T> => ({ kind: "empty" })
const fullList = <T>(head: T, tail: List<T>)  : List<T> => ({ kind: "full", head: head, tail: tail })

const forEach
 : <element>(_:Fun<element, void>) => (_:List<element>) => void
 = processElement => list => {
    if (list.kind == "empty") return
    processElement(list.head)
    forEach(processElement)(list.tail)
}

const printAll = <T>(l: List<T>) => forEach<T>(console.log)(l)

//construct list with elements of type number
const l1: List<number> = fullList(1, fullList(2, fullList(3, emptyList())))

//printAll(l1)

const transform
 : Fun<Fun<number, number>, Fun<List<number>, List<number>>>
 = operation => inputList => 
    inputList.kind == "empty" ? emptyList()
    : fullList(operation(inputList.head), transform(operation)(inputList.tail))

const increment
 : Fun<List<number>, List<number>>
 = inputList => 
    transform(_ => _ + 1)(inputList)


console.log(increment(l1))

import { List, set, Range, Map } from "immutable";

type User = { id:string, name:string, surname:string, age:number }
let users: Map<User["id"], User> = Map()
const addUser = (newUser:User): void => {
    users = users.set(newUser.id, newUser)
}

addUser({ id:"6", name:"Noud", surname:"Goedemondt", age:24 })
addUser({ id:"7", name:"Deez", surname:"Nuts", age:21 })

console.log(users.get("6"))


///////////////////////////////////////
//OO
*/
type Animal = { name: string; species: string };

const animals: Animal[] = [
  { name: "Fluffykins", species: "rabbit" },
  { name: "Caro", species: "dog" },
  { name: "Hamilton", species: "dog" },
  { name: "Harold", species: "fish" },
  { name: "Ursula", species: "cat" },
  { name: "Jimmy", species: "fish" },
];

const dogs = animals.filter((animal: Animal) => animal.species === "dog");

const names = animals.map((animal: Animal) => animal.name);

console.log(names);
