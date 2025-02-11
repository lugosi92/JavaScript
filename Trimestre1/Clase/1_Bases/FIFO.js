fifo =[];

do{

    operacion=prompt("Introduce 'a' para añadir, 'q' para quitar, o 'FIN' para finalizar ");

    if( operacion == "a"){
        
        nuevo = prompt("Introduce el elemnto")
        fifo.unshift(nuevo);
        console.log(fifo);
        console.log("Elemento añadidio" + nuevo);

    }else if(operacion == "q"){
        console.log("Elemento a quitado: " + fifo.pop());
        console.log(fifo);

    }else if(operacion!="FIN" || operacion!="a" || operacion!="q"){
        console.log("Introduce 'a' , 'q' o 'FIN'");
    }

} while (operacion != "FIN");
