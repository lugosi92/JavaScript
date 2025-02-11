/*-----------------EJERCICO 1--Maniupla Strings-----------------*/

/*
Dada la cadena " JavaScript es genial ", elimina los espacios al principio y al final usando trim().
Convierte la cadena a mayúsculas, luego extrae los primeros 5 caracteres y conviértelos a minúsculas.
Usa indexOf() para encontrar la posición de "es" y reemplázalo con la palabra "es increíble" usando slice().*/

let text = " JavaScript es genial ";

let limpio = text.trim();

let parte = limpio.toUpperCase().slice(0,5).toLowerCase();

console.log(parte);

console.log(limpio.indexOf("es"));

let resultado = limpio.slice(0, 11) + "es increible" + limpio.slice(11+2);
console.log(resultado);
 
/*-----------------EJERCICO 2--Manipulación de Arrays-----------------*/

/*
Crea un array de objetos productos, cada uno con nombre, precio y cantidad.
Usa map() para obtener un array con los nombres de los productos en mayúsculas.
Usa filter() para obtener los productos cuyo precio sea mayor a 10.
Usa reduce() para calcular el total de los precios de los productos filtrados, multiplicado por su cantidad.
*/

const productos = [
    { nombre: "Manzana", precio: 3, cantidad: 5 },
    { nombre: "Plátano", precio: 2, cantidad: 10 },
    { nombre: "Pera", precio: 12, cantidad: 2 }
];

const nombres = productos.map(productos => productos.nombre.toUpperCase()); 
const pord10 = productos.filter(productos => productos.precio > 10);
const total = productos.reduce((acumulador, productos) => (productos.precio * productos.cantidad), 0);


console.log(nombres);
console.log(pord10);
console.log(total);

/*-----------------EJERCICO 3--Manipulación de Fechas-----------------*/



/*Crea una fecha para "2024-05-15T00:00:00".
Agrega 15 días a la fecha usando setDate() y muestra la nueva fecha.*/

let fecha = new Date("2024-05-15T00:00:00");
    console.log(fecha.toISOString());

fecha.setDate(fecha.getDate()+16);
    console.log(fecha.toISOString());


/*Calcula la diferencia en días entre esta fecha y "2024-01-01T00:00:00".*/

let fecha2 = new Date("2024-01-01T00:00:00");

let diferencia = (fecha - fecha2) / (1000 * 60 * 60 * 24);
    console.log(diferencia);


/*Verifica si la fecha es un fin de semana (sábado o domingo).*/

let finde = fecha.getDate() === 6 || fecha.getDate() === 0;
    console.log(fecha);


/*-----------------EJERCICO 4--Objetos y Arrays Anidados-----------------*/

const personas = [
    { nombre: "Carlos", edad: 28 },
    { nombre: "Laura", edad: 35 },
    { nombre: "Juan", edad: 45 },
    { nombre: "Ana", edad: 23 }
];

/*Dado el siguiente array de objetos, extrae un array con los nombres de las personas que tienen más de 30 años.
filter() para obtener los mayores de 30 años.*/ 
const pers30 = personas.filter(personas => personas.edad > 30);
    console.log(pers30);

/*Usa map() para extraer los valores de edad */ 

const nomMayores30 = pers30.map(personas => personas.nombre);
    console.log(nomMayores30);


/*Ordena los resultados por edad en orden descendente.*/ 

const ordenEdad = pers30.sort((a,b) => b.edad - a.edad);
    console.log(ordenEdad);



/*-----------------EJERCICO 5--this y Funciones Avanzadas-----------------*/

/*Crea un objeto persona con un método saludar() que devuelva un mensaje personalizado.*/ 
let persona = {
    nombre: "Khaled",
    edad: 22,
    /*Dentro del método, usa this para acceder a las propiedades del objeto.*/ 
    saludar: function(){
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
    },
    /*Usa una función flecha dentro de otro método que también haga uso de this. ¿Qué sucede y por qué?*/
    saludoFlecha: () => {
        return `Hola desde la funcion flecha: ${this.nombre}`;
    }
};
console.log(persona.saludar());
// console.log(persona.saludarFlecha());


/*-----------------EJERCICO 6--this y Funciones Avanzadas-----------------*/
 
/*Crea una función recursiva que sume todos los elementos de un array de números.*/
/*Si el array está vacío, la función debe devolver 0.*/
function sumaRecursiva(array){

    if(array.length === 0){
        return 0;
    }else{
        let suma = array.reduce((acumulador, valor) => acumulador + valor, 0);
        return suma;
    }
}

let numeros = [1, 2, 3, 4, 5];
console.log(sumaRecursiva(numeros));  // 15

let numeros2 = [];
console.log(sumaRecursiva(numeros2));

/*-----------------EJERCICO 7--Uso promesas-----------------*/
function cargarDatos() {
    return new Promise((resolve, reject) => {
        console.log("Cargando datos...");

        setTimeout(() => {
            let exito = true; // Simula si la operación tiene éxito o no
            if (exito) {
                resolve("Datos cargados correctamente");
            } else {
                reject("Error al cargar los datos");
            }
        }, 2000); // Simula un retraso de 2 segundos
    });
}

cargarDatos()
    .then(resultado => {
        console.log(resultado); // "Datos cargados correctamente"
    })
    .catch(error => {
        console.error(error); // "Error al cargar los datos"
    })
    .finally(() => {
        console.log("Operación completada");
    });


/*-----------------EJERCICO 8--Uso de async y await con Promesas-----------------*/

function obtenerDatos() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos obtenidos!");
        }, 2000);
    });
}

async function procesarDatos() {
    console.log("Esperando los datos...");
    let datos = await obtenerDatos();
    console.log(datos);  // "Datos obtenidos!"
}

procesarDatos();


