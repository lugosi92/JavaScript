//E_1------------------------------------------------------------
let a = 5;
let b = a++;
let c = ++a;

console.log("Ejercicio_1: " + a, b, c);

//E_2------------------------------------------------------------

let f = 5;   // 5 en binario es 0101
let e = 3;   // 3 en binario es 0011

e &= f;      // b = b & a => 0011 & 0101 = 0001

console.log("Ejercicio_2" + e);  // El resultado es 1

//E_3------------------------------------------------------------

let a1 = 7;
let b2 = 4;

console.log("a vale: " + a);

// Depende de los parentesis
console.log( "Suma de a y b = " + (a + b));
console.log( "Suma de a y b = ", a + b);

console.log("Ejercicio_3: " + typeof(a));