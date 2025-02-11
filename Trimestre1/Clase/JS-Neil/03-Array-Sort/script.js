const input = prompt("Dime varios números");
const arr = input.split(",");
console.log("El array es: " + arr.toString());
// ordenarlos de menor a mayor
arr.sort((a, b) => a > b ? 1 : 0);
console.log("De menor a mayor: " + arr.toString());
// ordenarlos de mayor a menor
arr.sort((a, b) => b - a);
console.log("De mayor a menor: " + arr.toString());