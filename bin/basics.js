"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animals = [
    { name: "Fluffykins", species: "rabbit" },
    { name: "Caro", species: "dog" },
    { name: "Hamilton", species: "dog" },
    { name: "Harold", species: "fish" },
    { name: "Ursula", species: "cat" },
    { name: "Jimmy", species: "fish" },
];
const dogs = animals.filter((animal) => animal.species === "dog");
const names = animals.map((animal) => animal.name);
console.log(names);
