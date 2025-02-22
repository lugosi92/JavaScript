
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
        const usuario = await obtenerUsuario() //Esperar respuesta
        console.log("Usuario encontrado: ", usuario);
    }catch (error) {
        console.log("Error: ", error);
    }
}

console.log(mostrarUsuario());