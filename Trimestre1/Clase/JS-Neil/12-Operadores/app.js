/*
// OPERADOR ?? ||
nombre = null;
apellido = null;

// El operador || o ?? ve si es nulo o no la variable.
// Si es null muestra la parte de la dcha.
console.log(nombre || "pepe");
*/

/*
// Ejemplo 1
ap = garcia
*/

/*
// Ejemplo 2
nombre = pepe
ap = "perez"
*/

/*
// Ejemplo 3
nombre = pepe
ap = null
*/

// Ejemplo 4 (nada)
// console.log(nombre ?? "Falta nombre"," ",ap ?? "Falta apellido");

let a = 0;
let b = 100;

// ?? : evalua si solo es null
let c = a ?? b;
console.log(c);
// || : evalua si no es un valor falsy (0 , "", null, undefined o NaN)
let d = a || b|| c || d
console.log(d);