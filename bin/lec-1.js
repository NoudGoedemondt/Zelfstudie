"use strict";
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
const incr = Fun((x) => x + 1);
const decr = Fun((x) => x - 1);
const double = Fun((x) => x * 2);
const gtz = Fun((x) => x > 2);
const neg = Fun((x) => !x);
const isEven = Fun((x) => x % 2 == 0);
const sum = Fun((x) => x[0] + x[1]);
const and = Fun((x) => x[0] && x[1]);
