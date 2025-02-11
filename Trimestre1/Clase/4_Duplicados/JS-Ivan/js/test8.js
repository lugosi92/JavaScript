diaDeMes = prompt("Introduce numeros");
const arr = diaDeMes.split(",");  
console.log(arr);

arr.sort((a, b) => a - b);  
console.log(arr);

arr.sort((a, b) => b - a);  
// arr.reverse();  //tambien se puede invertir asi
console.log(arr);

diaDeHoy = new Date().getDate(); 
if (arr.includes(diaDeHoy.toString())) { // el array es de strings hay q conv
    console.log("Se cumple año");
} else {
    console.log("No se cumple años");
}
