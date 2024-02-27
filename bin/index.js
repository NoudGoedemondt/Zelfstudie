"use strict";
const empty = () => ({ kind: 'empty' });
const full = (head, tail) => ({ kind: 'full', head: head, tail: tail });
console.log(full(1, full(2, full(3, empty()))));
