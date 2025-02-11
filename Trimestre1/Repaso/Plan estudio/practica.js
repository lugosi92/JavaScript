// const nombres = [];

// while(nombres.length < 6 ){
//     let nombre = prompt("Introduce nombre perro");
//     nombres.push(nombre);
// }
// console.log(nombres);
    

// for (let i = 0; i < nombres.length; i++){
//     let nombreLargo = "";
//     if(nombres[i].length > nombreLargo.length){
//     nombreLargo = nombres[i]
// }
// }

// console.log(nombreLargo);

function calculoMayor(num1, num2){
    if(num1> num2){
        alert(num1 + "es mayor");
    }else if(num1< num2){
        alert(num2 + "es mayor");
    }else{
        alert("T");
    }
}

console.log(calculoMayor(9,9));