
random = Math.floor(Math.random() * 3) + 1;
// Crear promesa
const primeraPromesa = new Promise((resolve, reject) =>{

   

    if(random == 1){
        console.log("Exito");
    }else{
        console.log("Error")
    }
});

// Consumir promesa
primeraPromesa
    .then((resultado) => {
        console.group(resultado)
    })
    .catch((error) => {
        console.log(error);
    });


/*---------------------------------TIPOS DE OPERACIONES CON PROMESAS--------------------------------------*/ 

// Promesa simple

const promesaSimple = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promesa completada despues de 2 segundos"), 2000);
});

promesaSimple .then((resultado) => console.log(resultado));