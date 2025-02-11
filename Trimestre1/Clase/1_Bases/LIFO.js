lifo=[];

do {

operacion=prompt("Introduce 'a' para añadir, 'q' para quitar, o 'FIN' para finalizar ");

        switch(operacion){
        
            case "a":
                nuevo=(prompt("Introduce nuevo elemento"));
                lifo.unshift(nuevo);
                console.log(lifo);
                console.log("Numero de elementos: "+ lifo.length);
                console.log("Elemento añadido: "+nuevo);
                break;

            case "q":
                console.log("Elemento quitado: " + lifo.shift());
                console.log(lifo);
                console.log("Numero de elementos: " + lifo.length);
                break;

            case "FIN":
                operacion="FIN";
            
            default:
                console.log("Error: Solo puedes introducir 'q' 'a' 'FIN' ");
                break;
        }
    }while (operacion!="FIN");

