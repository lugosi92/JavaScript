fechas=prompt("Introduce dias");

let fechas = "2024-10-21,2024-10-22,2024-10-23";

//Tipo String
console.log(typeof(fechas[0])); 

//Imprime las fechas separadas por una ,
let arrayFechas=fechas.split(","); 

//Ordenar array
arrayFechas.sort(function(a, b) {
    return new Date(a) - new Date(b);
}); 
console.log(arrayFechas);

//Orden al reves
arrayOrdenadoR=fechas.reverse();
console.log(arrayOrdenadoR);

ahora=new Date();
console.log(typeof(ahora)); //Tipo de dato
console.log(ahora.getDate()); //Devulve
console.log(typeof(ahora.getDate())); //tipo de dato del getday --> Numero
