/*-----------------Ejercicio 1: Eliminación de duplicados-----------------*/

const numeros = [1, 2, 3, 2, 4, 1, 5];

const conjunto = new Set(numeros);

const arrayNum = [...conjunto];
console.log(arrayNum);

/*-----------------Ejercicio 2: Unión e intersección de conjuntos-----------------*/

const conjuntoA = new Set([1, 2, 3, 4]);
const conjuntoB = new Set([3, 4, 5, 6]);

const union = new Set([...conjuntoA, conjuntoB]);
    console.log(union);
const interseccion = new Set([...conjuntoA].filter(x => conjuntoB.has(x)));
    console.log(interseccion);
const diferencia = new Set([...conjuntoA].filter(x => !conjuntoB.has(x)));
    console.log(diferencia);

/*-----------------Ejercicio 3: Manipulación de arrays-----------------*/

const numeros2 = [1, 2, 3, 4, 5, 6, 7, 8];

const doble = numeros2.map(x => x * 2);
    console.log(doble);

const mayores4 = numeros2.filter(x => x > 4);
    console.log(mayores4);

const suma = numeros2.reduce((acc, valor) => acc + valor, 0);
    console.log(suma); //36



/*-----------------Ejercicio 4: Suma de múltiples parámetros-----------------*/

function sumaTotal(...arg){
    let resultado = 0;

    for (const elemento of arg) {
        resultado += elemento;
    }
    return resultado;
}

console.log(sumaTotal(1, 2, 3, 4)); // 10
console.log(sumaTotal(10, 20, 30)); // 60

/*-----------------Ejercicio 5: Parámetros opcionales-----------------*/

function saludar( nombre =  "Invitado"){
    return "Hola, " + nombre;
}

console.log(saludar()); // "Hola, Invitado!"
console.log(saludar("Khaled")); // "Hola, Khaled!"

/*-----------------Ejercicio 6: Conversión de temperatura-----------------*/

function convertirTemperatura(temperatura, tipo) {
    if (tipo === "C") {
        // Celsius a Fahrenheit
        return (temperatura * 9 / 5) + 32;
    } else if (tipo === "F") {
        // Fahrenheit a Celsius
        return (temperatura - 32) * 5 / 9;
    } else {
        // Tipo inválido
        return "Tipo de conversión no válido. Usa 'C' o 'F'.";
    }
}


console.log(convertirTemperatura(0, "F")); // 32
console.log(convertirTemperatura(100, "C")); // 212


/*-----------------Ejercicio 7: Números pares-----------------*/

arrayPar = [];

for(let i = 1; i < 20; i++){
    if(i % 2 === 0){
        arrayPar.push(i);
        console.log(arrayPar);
    }
}



/*-----------------Ejercicio 8: Iteración de un array----------------*/

const nombres = ["Khaled", "Sara", "Mariam", "Ali"];

for (let element of nombres) {
    console.log(element.toUpperCase());
}



for (const key in nombres) {
    // Imprimir los índices
    console.log(key); // Muestra los índices del array
}




/*-----------------Ejercicio 9: Crear un patrón con bucles----------------*/

for (let i = 1; i <= 5; i++) {
    let linea = ""; // Variable para acumular las estrellas en cada fila
    for (let j = 1; j <= i; j++) {
        linea += "*"; // Agregar una estrella
    }
    console.log(linea); // Imprimir la línea completa
}

/*-----------------Ejercicio 10: Uso de break y continue----------------*/

const numeros3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numeros3.length; i++) {
    if(numeros3[i] >= 6){
        console.log(numeros3[i]);
        break;
    }
    if(numeros3[i] % 3 === 0){
        console.log(numeros3[i]);
        continue;    
    }
}

/*-----------------Ejercicio 11: Número primo----------------*/

function esPrimo(num) {
    if (num <= 1) return false; // Números menores o iguales a 1 no son primos

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false; // Si encontramos un divisor, no es primo
        }
    }

    return true; // Si no encontramos divisores, es primo
}
console.log(esPrimo(7)); // true
console.log(esPrimo(9)); // false
console.log(esPrimo(13)); // true



/*-----------------Ejercicio 12: Números perfectos----------------*/

function esPerfecto(num) {
    if (num <= 1) return false; // Números <= 1 no son perfectos

    let sumaDivisores = 0;

    // Encontrar divisores y sumarlos
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            sumaDivisores += i;
        }
    }

    // Verificar si la suma de divisores es igual al número
    return sumaDivisores === num;
}

/*-----------------Ejercicio 13: Números perfectos----------------*/
function analizarNombres(conjunto, letra) {
    // Convertimos el conjunto en un array
    const nombresArray = [...conjunto];

    // Filtrar nombres que comienzan con la letra especificada
    const nombresConLetra = nombresArray.filter(nombre => 
        nombre.startsWith(letra)
    );

    // Devolvemos el total y los nombres filtrados
    return {
        total: nombresArray.length,
        nombresConLetra
    };
}

// Pruebas
const nombres4 = new Set(["Khaled", "Sara", "Karim", "Mariam", "Ali"]);

console.log(analizarNombres(nombres, "K"));
// { total: 5, nombresConLetra: ["Khaled", "Karim"] }

console.log(analizarNombres(nombres, "M"));
// { total: 5, nombresConLetra: ["Mariam"] }

console.log(analizarNombres(nombres, "A"));
// { total: 5, nombresConLetra: ["Ali"] }
