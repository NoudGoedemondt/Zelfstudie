"use strict";
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
*/
const contentWithCounter = (content) => ({ content: content, counter: 0 });
const incre = (source) => (Object.assign(Object.assign({}, source), { counter: source.counter + 1 }));
const cwcOfTypeString = contentWithCounter("Can contain any string");
const cwcOfTypeNum = contentWithCounter(123454325);
const cwc = contentWithCounter("hihi");
console.log(cwcOfTypeString);
console.log(cwcOfTypeNum);
