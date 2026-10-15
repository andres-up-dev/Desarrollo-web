const sw = require("star-wars-quotes");
const superheroes = require("superheroes");
const supervillains = require("supervillains");
const fs = require("fs");

console.log("Hello world");
console.log(sw());
console.log(superheroes.random() + " vs " + supervillains.random());
console.log(fs.readFileSync("data/input.txt", "utf8"));
