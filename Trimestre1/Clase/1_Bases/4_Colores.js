color=prompt("Cual es tu color favorito: ?");

//Color lo interpretamos como hexadecimal por el 16 y 
//despues lo pasamos a entero con el parseINT y 
//lo guardamos en variable  numero

num = parseInt(color,2);

console.log("Color hexadecimal: " + num.toString(16));
console.log("Color decimal: " + num.toString(10));
console.log("Color octal: " + num.toString(8));


//01-10

a= 7;
b = 22;

console.log("Texto" + a + b);
console.log("Texto" + (a + b));
console.log(a + b +"Texto");

console.log('' + a +b + "Texto");
console.log(a.toString()+b.toString()+ "Texto");