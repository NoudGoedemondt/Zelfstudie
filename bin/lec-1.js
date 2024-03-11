"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
let users = (0, immutable_1.Map)();
const addUser = (newUser) => {
    users = users.set(newUser.id, newUser);
};
addUser({ id: "6", name: "Noud", surname: "Goedemondt", age: 24 });
addUser({ id: "7", name: "Deez", surname: "Nuts", age: 21 });
console.log(users.get("6"));
