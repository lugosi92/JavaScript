
const palabras = prompt("Introduce palabras separadas por comas");
const arr = palabras.split(",");

console.log("Array original:", arr);

// Ordena alfabéticamente de menor a mayor utilizando localCompare
arr.sort((a, b) => a.localeCompare(b));
console.log("Ordenado de menor a mayor:", arr);
//arr.sort((a, b) => b.localeCompare(a));
arr.reverse();
console.log("Ordenado de mayor a menor:", arr);
