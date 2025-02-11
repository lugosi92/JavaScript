//Escribe un programa que convierta el número 1010 (en binario) a decimal, y luego conviértelo de nuevo a binario.
console.log("EJERCICI 1");
let binario = 1010;

let decimal = parseInt(binario, 2);
console.log(decimal);

let binarioConvertido = decimal.toString(2);
console.log(binarioConvertido);


// Dado el siguiente código, ¿qué imprime y por qué? 
console.log("EJERCICI 2");


let x = "10";
let y = 5;
console.log(x == y); //False
console.log(x === y); //False

//Escribe una función que reciba un número y devuelva true si el número es par, o false si es impar.
console.log("EJERCICIO 3");

function parImpar(num){
    if(num % 2 == 0){
        return true;
    }else{
        return false;
    }
}

console.log(parImpar(2));

//Escribe una función que reciba una cadena de texto y devuelva la misma cadena con todas las letras en mayúsculas.
console.log("EJERCICIO 4");

cadena = "hola mundo"

function mayusculas(cadena){

    let mayus = cadena.toUpperCase();

    return mayus;
}

console.log(mayusculas(cadena));


// 5. Concatenación de arrays 
    //Dado el siguiente código, ¿qué devolverá?
    console.log("EJERCICIO 5");

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
console.log(arr1.concat(arr2)); //[1,2,3,4,5,6]



//6. Recorrer un array e imprimir los valores 
    //Escribe un programa que recorra un array de números y imprima cada valor multiplicado por 2.
    console.log("EJERCICIO 6");


array2 = [1,2,3,4,5,6];

for(let i = 0; i < array2.length; i++){
    array2[i] = array2[i] * 2;
    
}

console.log(array2);


let texto = "JavaScript es genial";
console.log("AQUI");
console.log(texto.toLowerCase().indexOf("ES"));


let frutas = "manzana,pera,uva";
let resultado = frutas.split(",").map(f => f.toUpperCase());
console.log(resultado[1]);

let arr = [1, 2, 3, 4];
arr.pop();
arr.push(arr.shift());
console.log(arr);