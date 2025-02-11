/*
Por valor
Por referncia

|| verfifca si es falso o verdader
?? verfica si esta inicializada o no
*/
let  nombre = "pepe";
let  apellido = "perez";

console.log(nombre+" "+apellido);

// TEST 2
let  nombre1 = "pepe";
let  apellido1 = null;

console.log((nombre1 ?? "Falta nombre") + " " + (apellido1 ?? "Falta apellido"));

// Test 3 (ERROR)
let nombre2;
let  apellido2 = "garcia";

console.log((nombre2 ?? "Falta nombre" ) + " " + (apellido2 ?? "Falta apellido"));

// Test 4 
let  persona1 = null; 
let  persona2 = "Jose";
let  persona3 = "Pepe";

console.log(persona1 ?? persona2 ?? persona3);

// Test 5
a= 0;
b = 100;

c = a ?? b;
d = a || b;

console.log(c + " " + d);


// Funciones
    // Operador spred [...arg]


/*function suma (a, b ,c){
     return a + b + c;
 }*/

function suma (...args){

    let resultado = 0;
    for (const element of args) {
        resultado+=element;
    }

    return resultado;
}

console.log(suma(4));
console.log(suma(5,7));
console.log(suma(4,2,1));
console.log(suma(3,2,1,6,8));
console.log(suma());

// Test 2

let array = [7,5,4,2,8,1];

function quitar(array, ...args){

    for(let j = 0; j< args.length; j++){
            console.log(args[j]);
        for (let i = 0; i< array.length; i++) {
            if(array.includes(args[j])){
                let index = array.indexOf(args[j]);
                array.splice(index, 1);
            }
        }
    }
    return array; 
}
    
   


console.log(quitar(array, 5 ,7));