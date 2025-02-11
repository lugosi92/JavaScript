// Pila lifo, last in - firts out
pila=[];
do {
operacion=prompt("Introduce 'a' para añadir o 'q' para quitar");
if(operacion=="a"){
    nuevoElemento=(prompt("Introduce elemento"));
    pila.unshift(nuevoElemento);
    console.log(pila);
    console.log("Elemento añadido: "+nuevoElemento);
    console.log("Elementos: "+ pila.length);
}else if(operacion=="q"){
    console.log("Elemento quitado: " + pila.shift());
    console.log(pila);
    console.log("Elementos: " + pila.length);    
} else if(operacion!="FIN"){
    console.log("WARNING: Solo introduce (a),(p),(FIN) ");
}   
} while (operacion!="FIN");
document.getElementById("pila").innerHTML="La pila es: "+pila;
document.getElementById("tamano").innerHTML="El tamaño final de la pila es "+pila.length;

// para optimizar el codigo y que se vea mejor, podemos hacer los siguientes cambios del codigo en la lifo

/*operacion=prompt("Introduce 'a' para añadir o 'q' para quitar");
switch(operacion){
    case "a":
        nuevoElemento=(prompt("Introduce elemento"));
        pila.unshift(nuevoElemento);
        console.log(pila);
        console.log("Elemento añadido: "+nuevoElemento);
        console.log("Elementos: "+ pila.length);
    case "q":
        console.log("Elemento quitado: " + pila.shift());
        console.log(pila);
        console.log("Elementos: " + pila.length); 
    case "FIN":
        document.getElementById("pila").innerHTML="La pila es: "+pila;
        document.getElementById("tamano").innerHTML="El tamaño final de la pila es "+pila.length;
}*/ 