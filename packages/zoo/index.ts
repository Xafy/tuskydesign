import { getRandomAnimal } from "@xrepo/animals";
import { getRandomName } from "@xrepo/names";

const name = getRandomName();
const animal = getRandomAnimal();

console.log(`${name} the ${animal.name} says ${animal.sound}!`);
