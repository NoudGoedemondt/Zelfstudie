import Immutable, { Map } from "immutable";

// wrapper datatype for functions
type Fun<input, output> = {
  (input: input): output;
  // then operator for function composition,
  // takes as input the output of another function and returns a new/next ouput
  then: <nextOutput>(other: Fun<output, nextOutput>) => Fun<input, nextOutput>;
};

// lifting operator which takes as input a regular function and returns our
// enriched function definition
const Fun = <input, output>(
  actual: (_: input) => output
): Fun<input, output> => {
  const f = actual as Fun<input, output>;
  // define then method
  f.then = function <nextOutput>(
    this: Fun<input, output>,
    other: Fun<output, nextOutput>
  ): Fun<input, nextOutput> {
    return Fun((input) => other(this(input)));
    /* this(input) -> output
     * give output to other for nextOutput
     * other(this(input)) -> nextOutput
     */
  };
  return f;
};

// identity function
const id = <s>() => Fun<s, s>((x) => x);

type Updater<s> = Fun<s, s>;
const Updater = Fun;

/////////////////////////

type Person = {
  id: string;
  fullName: string;
  age: number;
};

const Person = {
  Updaters: {
    fullName: (fieldUpdater: Updater<Person["fullName"]>): Updater<Person> =>
      Updater((person) => ({
        ...person,
        fullName: fieldUpdater(person.fullName),
      })),
    age: (fieldUpdater: Updater<Person["age"]>): Updater<Person> =>
      Updater((person) => ({ ...person, age: fieldUpdater(person.age) })),
  },
};

type Course = {
  teacher: Person;
  students: Immutable.Map<Person["id"], Person>;
};

const Course = {
  Updaters: {
    teacher: (fieldUpdater: Updater<Course["teacher"]>): Updater<Course> =>
      Updater((course) => ({
        ...course,
        teacher: fieldUpdater(course.teacher),
      })),
    students: (fieldUpdater: Updater<Course["students"]>): Updater<Course> =>
      Updater((course) => ({
        ...course,
        students: fieldUpdater(course.students),
      })),
  },
};

const incr = Fun((x: number) => x + 1);
const decr = Fun((x: number) => x - 1);
const double = Fun((x: number) => x * 2);
const gtz = Fun((x: number) => x > 2);
const neg = Fun((x: boolean) => !x);
const isEven = Fun((x: number) => x % 2 == 0);

const sum = Fun((x: [number, number]) => x[0] + x[1]);
const and = Fun((x: [boolean, boolean]) => x[0] && x[1]);

const noud: Person = { id: "ng", fullName: "Noud Goedemondt", age: 24 };
const doctorify = Updater((s: string) => `Dr ${s}`);

const course: Course = {
  teacher: { id: "ng", fullName: "Noud Goedemondt", age: 24 },
  students: Immutable.Map(),
};

const newCourse = Course.Updaters.teacher(Person.Updaters.fullName(doctorify))(
  course
);

console.log(newCourse);
console.log(noud);
