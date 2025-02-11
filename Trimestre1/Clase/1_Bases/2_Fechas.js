//YEAR, MONTH , DAY , 

let d = new Date();   // Crear un nuevo objeto de fecha
console.log(d);       // Mostrar la fecha actual

console.log("Fecha: " + d.getFullYear() + ":" + d.getMonth() + ":" + d.getDate());
console.log("Hora: " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());



let fecha = new Date();
let dia = fecha.getDate();
let mes = fecha.getMonth()+1;
let anio = fecha.getFullYear();

switch (mes) {
    case 1:
        console.log(dia + " enero " + anio);
        break;
    case 2:
        console.log(dia + " feberero " + anio);;
        break;
    case 3:
        console.log(dia + " marzo " + anio);
        break;
    case 4:  
        console.log(dia + " abril " + anio);
        break;
    case 5:
        console.log(dia + " mayo " + anio);
        break;
    case 6:
        console.log(dia + " junio " + anio);
        break;
    case 7:
        console.log(dia + " julio " + anio);
        break;
    case 8:
        console.log(dia + " agosto " + anio);
        break;
    case 9:
        console.log(dia + " septiembre " + anio);
        break;
    case 10:
        console.log(dia + " octubre " + anio);
        break;
    case 11:
        console.log(dia + " noviembre " + anio);
        break;
    case 12:
        console.log(dia + " diciembre " + anio);
        break;
}





/*
getFullYear()	Get year as a four digit number (yyyy)
getMonth()	Get month as a number (0-11)
getDate()	Get day as a number (1-31)
getDay()	Get weekday as a number (0-6)
getHours()	Get hour (0-23)
getMinutes()	Get minute (0-59)
getSeconds()	Get second (0-59)
getMilliseconds()	Get millisecond (0-999)
getTime()	Get time (milliseconds since January 1, 1970)
*/