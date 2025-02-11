/*-----------------EJERCICO 1-------------------*/
// Par o impar:
// Crea una función que tome un número como entrada y devuelva "Par" si el número es par y "Impar" si es impar

function parImpar(num){
    return num % 2 == 0 ? "par" : "impar";
}

console.log("Ejercicio 1");
console.log(parImpar(9));


/*-----------------EJERCICO 2-------------------*/
// Crea una función que tome una cadena como entrada y devuelva la cadena invertida.

function invertida(cadena){
    
    return cadena.split("").reverse().join("");

}

console.log("Ejercicio 2");
cadena = "Hola";
console.log(invertida(cadena));


/*-----------------EJERCICO 3-------------------*/
// Crea una función que reciba un array de números y devuelva la suma total de sus elementos.

function sumaTotal(array){
    return resultado = array.reduce((acc, valor) => acc + valor, 0);
}

const array = [1,5,6,3,7,8,4];

console.log("Ejercicio 3");
console.log(sumaTotal(array));



/*-----------------EJERCICO 4-------------------*/
// Crea una función que determine si un número dado es primo o no.
function esPrimo(num){
    if(num <= 1)return false;

    for( let i = 2; i <num; i++){
        if(num % i == 0) return false;
    }
    return true;
}

console.log("Ejercicio 4");
console.log(esPrimo(7));
console.log(esPrimo(8));


/*-----------------EJERCICO 5-------------------*/
// Crea una función que genere una secuencia de Fibonacci con n términos.





/*-----------------EJERCICO 6-------------------*/
// Crea una función que verifique si una palabra es un palíndromo (se lee igual al derecho y al revés).

function polindroma(frase){

    
    resultado = frase.split("").reverse().join("");

    return resultado === frase ? true : false;
}

frase = "ana"
console.log("Ejercicio 6");
console.log(polindroma(frase));


/*-----------------EJERCICO 7-------------------*/
// Contar caracteres repetidos:
// Crea una función que reciba una cadena y devuelva un objeto con el conteo de cuántas veces aparece cada carácter.

function contarCaracteres(cadena) {
    const conteo = {}; // Paso 1
    for (const char of cadena) { // Paso 2
        conteo[char] = (conteo[char] || 0) + 1; // Paso 3
    }
    return conteo; // Paso 4
}
console.log(contarCaracteres("javascript")); 
// Resultado: {j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1}


console.log("Ejercicio 7");
console.log(repetidos("javascript"));


/*-----------------EJERCICO 8-------------------*/
// Anagramas:
// Crea una función que determine si dos palabras son anagramas (contienen las mismas letras en distinto orden).

console.log("Ejercicio 8");







/*-----------------EJERCICO 9-------------------*/
// Ordenar un array de objetos:
// Dado un array de objetos con las propiedades nombre y edad, ordénalo por edad de menor a mayor.

console.log("Ejercicio 9");