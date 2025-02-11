/*------------------------------------------------------------------------DIA 1--------------------------------------------------------------------*/

let x1 = 5;       // x es un número
x1 = "Hola";      // Ahora x es un string
// let f = 5;
// let f = 10; // Error

var z = 5;
var z = 10; // Permitido


const x = 5;
x = 10; // Error

"5" == 5; // true

"5" === 5; // false




/*------------------------------------------------------------------------DIA 2--------------------------------------------------------------------*/


/*-----------------STRINGS-------------------*/

let texto = "Hola mundo";

console.log(texto.toLowerCase());
console.log(texto.toUpperCase());
console.log(texto.indexOf("Hola"));
console.log(texto.split(" ")); //Convierte la cadena en un array de caracteres.
console.log(texto.trim(" ")); //Invierte el orden de los elementos en el array creado con split("").
// console.log(texto.slice(0,4)); Convierte el array invertido de nuevo en una cadena

let texto1 = "JavaScript es genial";
let resultado = texto.split("").reverse().join("").slice(0, 10);
console.log(resultado);

/*-----------------ARRAYS-------------------*/

let numero = [2,3,4];

numero.unshift(1); //[1,2,3,4] Agrega el principio
numero.push(5); // [1,2,3,4,5] Agrega al final
numero.shift(); //[2,3,4,5] Elimina el primer elemento
numero.pop(); //[2,3,4] Elimina el ultimo elemento

//No modififca el array [2,3,4]

// Aplica una función a cada elemento y devuelve un nuevo array
numero.map(num => num * 2); //[4,6,8]

// Filtra elementos según una condición
numero.filter(num => num  % 2 === 0); //[2,4] todos son pares
// .filter((e, index) => index % 2 !== 0);

//Crea un array desde el indice 1
let num2 = numero.slice(1) 
    console.log(num2);

//[2,3,4] 9
let suma = numero.reduce((acumulador, valor) => acumulador + valor, 0); 
    console.log(suma);

// Orden descendente
let ordenadosPorEdad = mayoresDe30.sort((a, b) => b.edad - a.edad);

/*-----------------CONJUNTOS-------------------*/

// Metodo size
const conjunto4 = new Set([1, 2, 3, 4, 5]);
    console.log(conjunto4.size); // Devuelve: 5

// MAP (clave valor)
const mapa = new Map();
mapa.set("a", 1);
mapa.set("b", 2);
mapa.set("c", 3);
    
console.log(mapa.size); // Devuelve: 3
    
// Añadir eliminar a conjutno
const conjunto5 = new Set();
conjunto5.add(1);
conjunto5.add(2);
conjunto5.add(3);
conjunto5.delete(3);
console.log(conjunto5); // Set(3) { 1, 2, 3 }

// Verificar la Existencia con has()
const conjunto6 = new Set([1, 2, 3, 4]);
console.log(conjunto6.has(2)); // true
console.log(conjunto6.has(5)); // false

// Limpiar Todos los Elementos con clear()
const conjunto7 = new Set([1, 2, 3, 4]);
conjunto7.clear();
console.log(conjunto7); // Set(0) {}

//  Iterar sobre un Conjunto
const conjunto8 = new Set([1, 2, 3, 4]);
conjunto8.forEach(valor => console.log(valor));

for (let valor of conjunto8) {
    console.log(valor);
  }
  


/*-----------------FECHAS-------------------*/

let ahora = new Date(); //Objeto fecha

console.log(Date.now());
console.log(ahora.getFullYear());
console.log(ahora.getMonth());
console.log(ahora.getDate());

// 1-b 2-a 3-a 4-a 5-a 6-a 7-b 8- 9- 10c


let fecha = new Date("2024-01-01T00:00:00");
fecha.setDate(fecha.getDate()+30);

// fecha.setDate(fecha.getDate() + 30);
console.log(fecha.toISOString().slice(0, 10));

/*------------------------------------------------------------------------DIA 3-4--------------------------------------------------------------------*/

/*----------------1. Manejo de Arrays y Conjuntos-------------------------*/
/*-----------------Arrays-------------------*/
/*Un array es una colección ordenada de elementos que pueden ser de cualquier tipo (números, cadenas, objetos, etc.).*/ 

let numeros = [1, 2, 3, 4];
let frutas = ["manzana", "pera", "uva"];

let arr1 = [1, 2];
let arr2 = [3, 4];
let unido = [...arr1, ...arr2];
console.log(unido); // [1, 2, 3, 4]


/*-----------------Conjuntos-------------------*/
/*Un set es una colección de valores únicos, es decir, no permite duplicados.*/ 

const conjuntoA = new Set([1, 2, 3, 4]);
const conjuntoB = new Set([3, 4, 5, 6]);

// UNIR
const union = new Set([...conjuntoA, conjuntoB]);
    console.log(union);
// INTERSECCION
const interseccion = new Set([...conjuntoA].filter(x => conjuntoB.has(x)));
    console.log(interseccion);
// DIFERENCIA
const diferencia = new Set([...conjuntoA].filter(x => !conjuntoB.has(x)));
    console.log(diferencia);



 // ELIMINAR DUPLICADOS

    // Separamos por lineas y retorno de carro
    const lineas = contenido.split("\r\n");
    // Creamos conjunto
    const perros = new Set(lineas);
    perros.delete("");

    // PASAR DE CONJUNTO A ARRAY
    const arrayPerros = [...perros];


/*----------------2. Funciones: Definición, Parámetros y Valor de Retorno-------------------------*/

/*-----------------2.1 Definición de funciones-------------------*/
// Declaración de una función
function sumar(a, b) {
    return a + b; // Devuelve el resultado de la suma
}
console.log(sumar(2, 3)); // 5

// Expresión de función
const multiplicar = function(a, b) {
    return a * b;
};
console.log(multiplicar(2, 3)); // 6

// Función flecha
const dividir = (a, b) => a / b;
console.log(dividir(6, 2)); // 3


/*-----------------2.2 Parámetros de funciones-------------------*/
// Parámetros opcionales
function saludar(nombre = "Invitado") {
    return `Hola, ${nombre}!`;
}
console.log(saludar()); // "Hola, Invitado!"
console.log(saludar("Khaled")); // "Hola, Khaled!"

// Rest parameters (...)
function sumarTodos(...numeros) {
    return numeros.reduce((acc, num) => acc + num, 0);
}
console.log(sumarTodos(1, 2, 3, 4)); // 10

/*-----------------2.3 Valor de retorno (Resultado de una funcion)-------------------*/
// Con return
function cuadrado(x) {
    return x * x;
}
console.log(cuadrado(4)); // 16

// Sin return (valor undefined)
function imprimirMensaje(mensaje) {
    console.log(mensaje);
}
console.log(imprimirMensaje("Hola")); // "Hola" y luego `undefined`

/*----------------3. Bucles y Control de Flujo-------------------------*/

/*-----------------3.1 Tipos de bucles-------------------*/

// FOR
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// WHILE
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// DO-WHILE
let i1 = 0;
do {
    console.log(i);
    i++;
} while (i < 5);

// FOR-OF
let numeros2 = [1, 2, 3];
for (let num of numeros) {
    console.log(num);
}

// FOR-IN
let objeto = { a: 1, b: 2, c: 3 };
for (let clave in objeto) {
    console.log(clave, objeto[clave]);
}


/*-----------------3.2 Control de flujo-------------------*/

// BREAK
for (let i = 0; i < 5; i++) {
    if (i === 3) break;
    console.log(i); // 0, 1, 2
}

// CONTINUE
for (let i = 0; i < 5; i++) {
    if (i === 3) continue;
    console.log(i); // 0, 1, 2, 4
}

/*
Arrays: Métodos como map, filter, y spread son fundamentales para la manipulación de datos.
Sets: Útiles para trabajar con valores únicos y realizar operaciones como unión e intersección.
Funciones: Pueden ser tradicionales, flecha o anónimas. Entender parámetros y retornos es clave.
Bucles y control de flujo: Permiten manejar la lógica de repetición y controlar el flujo del programa.
*/

/*------------------------------------------------------------------------DIA 5-6--------------------------------------------------------------------*/

/*-----------------0. Conversión de Tipos en JavaScript-------------------*/

// NUMBER
console.log(Number("123")); // 123
console.log(Number(true));  // 1
console.log(Number(false)); // 0
console.log(Number("abc")); // NaN (Not a Number)

// parseInt() y parseFloat()
console.log(parseInt("123"));    // 123
console.log(parseInt("123.45")); // 123
console.log(parseFloat("123.45"));// 123.45
console.log(parseInt("abc"));    // NaN


// toString()
console.log((123).toString()); // "123"
console.log(true.toString()); // "true"


// String()
console.log(String(123));  // "123"
console.log(String(false)); // "false"


// Convertir a Booleano
console.log(Boolean(0));       // false
console.log(Boolean("hello")); // true


/*-----------------1. Spread Operator (...)-------------------*/

// Combinar Arrays
const arry1 = [1, 2, 3];
const arry2 = [4, 5, 6];
const combinado = [...arr1, ...arr2];
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// Copiar Objetos

const obj1 = { a: 1, b: 2 };
const copia = { ...obj1, c: 3 };
console.log(copia); // { a: 1, b: 2, c: 3 }



/*-----------------2. Operador Nullish Coalescing (??)-------------------*/
const valor = null ?? "Valor por defecto";
console.log(valor); // "Valor por defecto"

const valor2 = 0 ?? 42;
console.log(valor2); // 0 (porque no es null ni undefined)



/*-----------------3. Operador OR (||)-------------------*/
const nombre = "" || "Anónimo";
console.log(nombre); // "Anónimo"

const edad = 0 || 18;
console.log(edad); // 18


/*------------------------------------------------------------------------DIA 7--------------------------------------------------------------------*/

// FACTORIAL
function calcularFactorial(num) {
    let resultado = 1;
    for (let i = 2; i <= num; i++) {
      resultado *= i;
    }
    return resultado;
  }
  
  console.log(calcularFactorial(5)); // Devuelve 120

// PRIMOS = Un número es primo si es mayor que 1 y solo es divisible entre 1 y sí mismo.
function esPrimo(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  console.log(esPrimo(7)); // true
  console.log(esPrimo(4)); // false
  

// FIBONACCI = La secuencia de Fibonacci es una secuencia donde cada número es la suma de los dos anteriores:
function generarFibonacci(n) {
    const secuencia = [0, 1];
    for (let i = 2; i < n; i++) {
      secuencia.push(secuencia[i - 1] + secuencia[i - 2]);
    }
    return secuencia;
  }
  
  console.log(generarFibonacci(5)); // Devuelve [0, 1, 1, 2, 3]
  

  /*-----------------2. Redondeo con Math-------------------*/

  console.log(Math.floor(4.7));  // 4
  console.log(Math.floor(-4.7)); // -5
  
  console.log(Math.ceil(4.1));  // 5
  console.log(Math.ceil(-4.1)); // -4
  


  console.log(Math.round(4.5));  // 5
  console.log(Math.round(4.4));  // 4
  console.log(Math.round(-4.5)); // -4

  
  console.log(Math.trunc(4.7));  // 4
console.log(Math.trunc(-4.7)); // -4

