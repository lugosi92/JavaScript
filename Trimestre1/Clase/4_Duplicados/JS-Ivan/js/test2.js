a = 7;
console.log("a: " +a);
b = 4;
console.log("Suma de a + b =",a+b );
c= true;
console.log(typeof(c));
d = "Pepe";
console.log(typeof(d));
e=0x27; //HEXADECIMAL
console.log(e);
f=0o27; //OCTAL
console.log(f);
g=0b1001101; //BINARIO
console.log(g);
color=0xffffff;
console.log("El color es: ", color.toString(16)); //COLOR HEXADECIMAL
console.log("El color es: ", color.toString(2)); //COLOR BINARIO
console.log("El color es: ", color.toString(8)); //COLOR OCTAL
console.log("El color es: ", color.toString(10)); //COLOR DECIMAL
console.log("7"==7);
console.log("7"===7);
respuesta=prompt("color: "); // Pregunta en pantalla
console.log(respuesta);
console.log(typeof respuesta); //Obtener tipo de variable
numero = parseInt(respuesta,16); // Cambiar base
console.log(respuesta);
console.log(numero);
console.log(typeof numero);
console.log(numero.toString(2)); // Pasar a binario
console.log(numero.toString(8)); // Pasar a octal
respuesta = prompt("Escribe digitos");
console.log(typeof respuesta);
numero = parseInt(respuesta,10);
console.log(respuesta);
numero2=Number(respuesta); //Combertimos a numero (0-9)
console.log(numero2);
console.log(typeof numero); 
// HEXADECIMAL - DECIMNAL - BINARIO
