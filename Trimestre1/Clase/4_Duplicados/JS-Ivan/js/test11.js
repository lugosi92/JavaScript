a=12.56*100;
b=7.25*100;
resultado=(a+b)/100;
console.log(resultado);
console.log(Math.round(resultado));

x = prompt("Introduce precio: ");
x = x.replace(",", ".");  // cambiamos
x = parseFloat(x);  // parseamos
console.log(x);  // mostramos
