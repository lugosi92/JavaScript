/*a=12.56;
b=7.25;
b=b*100;
a=a*100;
r=a+b;
console.log(r);
console.log(r/100);*/

/*precio=prompt("Introduce un precio");
precio=precio.replace(',','.');
precioN=parseInt(precio);
console.log(precio);
console.log(typeof(precioN));*/



//DEFINIMOS LAS VARIABLES
precio1="17,56€";
precio2="7,25€";
precio3="36,76€";


//SUSTITUIMOS LAS ',' POR '.' Y CREAMOS NUEVAS VARIABLES PARA NO PERDER LA ORIGINAL 
precio1N=precio1.replace(',','.');
precio2N=precio2.replace(',','.');
precio3N=precio3.replace(',','.');

console.log(typeof(precio1N));// SIGUE SIENDO STRING

//PASAMOS EL STRING A NUMERO
precio1N=parseFloat(precio1N);
precio2N=parseFloat(precio2N);
precio3N=parseFloat(precio3N);

console.log(typeof(precio1N)); // ES UN NUMERO

//REALIZAMOS LA SUMA
total=precio1N+precio2N+precio3N;
console.log(typeof(total)); //NUMERO


total=total.toFixed(2); 
console.log(typeof(total)); //STRING
total=parseFloat(total);
console.log(typeof(total));//NUMERO
console.log(total);

//DAMOS FORMATO DE PRECIO
total=total+"€";
total=total.replace('.',',');
console.log(typeof(total)); //STRING


//MOSTRAMOS POR PANTALLA LOS PRECIOS Y EL TOTAL
document.getElementById("precio1").innerHTML=precio1;
document.getElementById("precio2").innerHTML=precio2;
document.getElementById("precio3").innerHTML=precio3;
document.getElementById("total").innerHTML=total;







