colorFavorito = prompt("¿Cuál es tu color favorito?");
 
numeroh=parseInt(colorFavorito,16);
numerod=parseInt(colorFavorito,10);
numeroo=parseInt(colorFavorito,8);
numerob=parseInt(colorFavorito,2);

console.log("hexadecimal: " , numeroh);
console.log("decimal: " , numerod);
console.log("octal: " , numeroo);
console.log("binario: " , numerob);