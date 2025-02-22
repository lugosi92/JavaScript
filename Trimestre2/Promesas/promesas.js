
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


//-------------------------------------METODOS IMPORTANTES-----------------------

//.then() - exito
promesa.then(valor => console.log("Éxito:", valor));
//.catch() - error
promesa.catch(error => console.log("Error:", error));
//.finally()  exito y error
promesa.finally(() => console.log("Siempre se ejecuta"));


//-------------------------------------PROMESAS ENCADENADAS-----------------------
//Crear una promea
//Numero mayor 0.5
//Manejar resultado
//Si exito multilpcar * 2
//imrpimir

const promesaAnidada = new Promise((resolve, reject) => {

    let condicion = Math.random() > 0.5;

    if(condicion){
        resolve(condicion)
    }else{
        reject("No es mayor de 0.5")
    }
});

promesaAnidada
    .then(valor  => {
        console.log(valor);
        return valor * 2;
    })
    .then(valor => console.log(valor))
    .catch(error => console.log(error));

//----------------PPromise.all(), Promise.race(), Promise.allSettled() y Promise.any()----------------------


//Promise.all() → Espera que todas las promesas se resuelvan
const promesa1 = new Promise(resolve => setTimeout(() => resolve("Uno"), 1000));
const promesa2 = new Promise(resolve => setTimeout(() => resolve("Dos"), 2000));

Promise.all([promesa1, promesa2])
    .then(resultados => console.log(resultados)) // ["Uno", "Dos"]
    .catch(error => console.log(error));

//Promise.race() → Devuelve la primera promesa que se resuelva o rechace
Promise.race([promesa1, promesa2])
    .then(resultado => console.log(resultado)); // "Uno" (porque se resuelve primero)

//Promise.allSettled() → Espera a todas sin importar si fallan o no
Promise.allSettled([promesa1, promesa2])
    .then(resultados => console.log(resultados));


//Promise.any() → Devuelve la primera promesa que se resuelva (ignora rechazos)
const promesa3 = new Promise((_, reject) => setTimeout(() => reject("Error"), 500));

Promise.any([promesa3, promesa1, promesa2])
    .then(resultado => console.log(resultado)) // "Uno"
    .catch(error => console.log(error));


//-------------------------------------PROMESAS ENCADENADAS-----------------------
// Función que simula una API con una promesa
function obtenerUsuario() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: 1, nombre: "Juan Pérez" });
        }, 2000);
    });
}

async function mostrarUsuario(){

    console.log("Buscando usuario...");

    try{
        const ususario = await obtenerUsuario() //Esperar respuesta
        console.log("Usuario encontrado: ", usuario);
    }catch (error) {
        console.log("Error: ", error);
    }
}