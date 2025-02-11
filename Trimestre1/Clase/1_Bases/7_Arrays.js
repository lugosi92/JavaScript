palabras=prompt("Introduce varias palabras");
arrayPal=palabras.split(","); //Convierte las palabras ingresadas en un array 
console.log(arrayPal.sort((a,b) => a.localeCompare(b))); //Se ordena de forma alfabetica, estandar de region local
console.log(arrayPal.reverse()); //Invierte el orden de aray
