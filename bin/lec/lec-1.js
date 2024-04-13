"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
// lifting operator which takes as input a regular function and returns our
// enriched function definition
const Fun = (actual) => {
    const f = actual;
    // define then method
    f.then = function (other) {
        return Fun((input) => other(this(input)));
        /* this(input) -> output
         * give output to other for nextOutput
         * other(this(input)) -> nextOutput
         */
    };
    return f;
};
// identity function
const id = () => Fun((x) => x);
const Updater = Fun;
const Person = {
    Updaters: {
        fullName: (fieldUpdater) => Updater((person) => (Object.assign(Object.assign({}, person), { fullName: fieldUpdater(person.fullName) }))),
        age: (fieldUpdater) => Updater((person) => (Object.assign(Object.assign({}, person), { age: fieldUpdater(person.age) }))),
    },
};
const Course = {
    Updaters: {
        teacher: (fieldUpdater) => Updater((course) => (Object.assign(Object.assign({}, course), { teacher: fieldUpdater(course.teacher) }))),
        students: (fieldUpdater) => Updater((course) => (Object.assign(Object.assign({}, course), { students: fieldUpdater(course.students) }))),
    },
};
const incr = Fun((x) => x + 1);
const decr = Fun((x) => x - 1);
const double = Fun((x) => x * 2);
const gtz = Fun((x) => x > 2);
const neg = Fun((x) => !x);
const isEven = Fun((x) => x % 2 == 0);
const sum = Fun((x) => x[0] + x[1]);
const and = Fun((x) => x[0] && x[1]);
const noud = { id: "ng", fullName: "Noud Goedemondt", age: 24 };
const doctorify = Updater((s) => `Dr ${s}`);
const course = {
    teacher: { id: "ng", fullName: "Noud Goedemondt", age: 24 },
    students: immutable_1.default.Map(),
};
const newCourse = Course.Updaters.teacher(Person.Updaters.fullName(doctorify))(course);
console.log(newCourse);
console.log(noud);
