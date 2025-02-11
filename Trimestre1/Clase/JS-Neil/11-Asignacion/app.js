/**
 * Tipos primitivos:
 *  - number
 *  - undefined
 *  - boolean
 *  - string
 *
 * Tipos no primitivos:
 *  - Array
 *  - Conjuntos
 */

// por valor (SOLO TIPOS PRIMITIVOS)
let a = 6;
let b = a;
console.log("Asignación por valor:");
console.log("Valor de a:", a); // 6
console.log("Valor de b:", b); // 6

// por referencia (TIPOS NO PRIMITIVOS)
let c = [1, 2, 3, 4];
let d = c;
c[1] = 5;
console.log("Asignación por referencia:");
console.log(`Se ha cambiado c[1] a 5`);
console.log("Valor de d[1]:", d[1]); // 5

// Con funciones
let nombre = "pepe";
function cambiarNombre(nombre) {
  nombre = "andres"; // el nombre del parámetro != nombre de al principio
  return nombre
}
let nombre2 = cambiarNombre(nombre); 
console.log("Con funciones:");
console.log('Variable nombre:', nombre); // pepe
console.log('Variable nombre2 con cambiarNombre():', nombre2); // andres, sin return devolvería undefined