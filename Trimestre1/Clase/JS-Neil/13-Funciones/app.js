// ...variable hace que podamos poner un nº indefinido de argumentos
function suma(...pepe) {
  let sum = 0;
  for (let arg of pepe) {
    sum += arg;
  }
  return sum;
}

console.log(suma(4));
console.log(suma(5, 7));
console.log(suma(4, 2, 1));
console.log(suma(3, 2, 1, 6, 8));

function quitar(array, ...args) {
  return array.filter((item) => !args.includes(item));
}

const lista = [7, 4, 2, 8, 1];

console.log(quitar(lista, 5));
console.log(quitar(lista, 5, 7));
console.log(quitar(lista, 5, 7, 8));
