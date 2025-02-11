ahora= new Date();
console.log(ahora);
console.log(ahora.getFullYear()+"/"+(ahora.getMonth()+1)+"/"+ahora.getDate());
console.log(ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds());


/*const meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
    "Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

    console.log(ahora.getFullYear()+"/"+meses[ahora.getMonth()]+"/"+ahora.getDate());


const dias=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

    console.log(ahora.getFullYear()+"/"+meses[ahora.getMonth()]+"/"+ahora.getDate()+" "+dias[ahora.getDay()]);*/


const meses = [,"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
    "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const dias=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

console.log(
    dias[ahora.getDay()] + " " + ahora.getDate() + " de " + meses[(ahora.getMonth()+1)] + " de " + ahora.getFullYear()
);