"use strict";
const Fun = (actual) => {
    const f = actual;
    f.then = function (other) {
        return Fun((input) => other(this(input)));
    };
    return f;
};
const id = () => Fun((x) => x);
const incr = Fun((x) => x + 1);
const decr = Fun((x) => x - 1);
const double = Fun((x) => x * 2);
const f = incr.then(incr.then(double).then(decr));
console.log(f(1));
const c_n = { content: 10, counter: 0 };
