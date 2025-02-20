//--------------------------------------------------CREACION DE OBJETOS--------------------------------------------


// Objeto Literal: Es la forma más sencilla de crear un objeto. Se define con llaves {} y se le asignan propiedades directamente.
   
const cliente = {
    nombre: "Khalid",
    apellido: "Benoukhiye",
    telefono: "650883881",
    ciudad: "Madrid"
};

// Object.create(): Crea un nuevo objeto basado en otro objeto. Ideal para establecer un prototipo.
const viajeBase = {
    trayecto: function() {
        return this.origen + " - " + this.destino;
    }
};
console.log("-----1------");
// Viaje hereda trayecto
const viaje = Object.create(viajeBase);
viaje.origen = "Madrid";
viaje.destino = "Paris";
viaje.duracion = "7 días";
viaje.pais = "Francia";

console.log(viaje.trayecto());  // "Madrid - Paris"

// Método new Object(): Crea un objeto vacío (No se usa)
const viaje2 = new Object();
viaje.origen = "Madrid";
viaje.destino = "Paris";
viaje.duracion = "7 días";
viaje.pais = "Francia";
viaje.trayecto = function() {
    return this.origen + " - " + this.destino;
};

console.log(viaje.trayecto());  // "Madrid - Paris"
console.log("-----2------");


//----------------------------------Definición de objetos con y sin constructores------------------------------


//1. Objeto con Método (Sin Constructor)
const viaje3 = {
    origen: "Madrid",
    destino: "Paris",
    duracion: "7 días",
    pais: "Francia",
    trayecto: function() {
        return `${this.origen} - ${this.destino}`;
    }
};

// Imprimir propiedades y método
for (const key in viaje) {
    if (typeof viaje[key] !== "function") {
        console.log(key+ " es " + viaje[key]);
    }
}

console.log(viaje.trayecto());  // "Madrid - Paris"
console.log("-----3------");


//2. Constructor para Crear Objetos (Con new)
    //Un constructor es una función que inicializa propiedades y crea instancias de un objeto. Se usa la palabra clave new para instanciar el objeto.

    // Constructor
    function Viaje(origen, destino, duracion, pais) {
        this.origen = origen;
        this.destino = destino;
        this.duracion = duracion;
        this.pais = pais;
    }
    
    // Instanciación de objetos
    const berlin = new Viaje("Madrid", "Berlin", "10 días", "Alemania");
    const mallorca = new Viaje("Madrid", "Mallorca", "10 días", "España");
    
    // Imprimir propiedades
    for (const key in berlin) {
        if (typeof berlin[key] !== "function") {
            console.log(key+ " es " + viaje[key]);
        }
    }
console.log("-----4------");




//3. Uso de delete para Eliminar Propiedades
    //Se puede eliminar propiedades de un objeto utilizando delete.

const toledo = new Viaje("Madrid", "Toledo", "10 días", "España");
console.log(toledo);  // { origen: "Madrid", destino: "Toledo", duracion: "10 días", pais: "España" }

delete toledo.pais;  // Eliminar propiedad
toledo.pais = "España";  // Añadirla de nuevo

console.log(toledo);  // { origen: "Madrid", destino: "Toledo", duracion: "10 días", pais: "España" }

console.log("-----5------");


//4. Constructor con Métodos
    //Si necesitas añadir métodos dentro del constructor, puedes hacerlo de esta forma:
function Cliente(nombre, apellido, ciudad, telefono, viaje) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.ciudad = ciudad;
    this.telefono = telefono;
    this.miViaje = viaje;
    this.contratado = function() {
        return this.miViaje ? true : false;
    };
}
    
const javier = new Cliente("Javier", "Pedrosa", "Madrid", "666666666", "Burgos");
    
console.log(javier.contratado()); 
    
// Imprimir propiedades
for (const key in javier) {
    if (typeof javier[key] !== "function") {
        console.log(key+ " es " + javier[key]);
    }
}

console.log("-----6------");



//CALL BACKS

function operar(a,b,operacion){
    return operacion(a,b);
}

function suma(x,y){
    return x+y;
}


function resta(x,y){
    return x -y;
}

console.log(operar(5,3,resta));


//sincrono - sucede al mismo tiempo que otro
//asincrono - una detras de otra 
//bloqueante  

setTimeout(despues, 3000);

function despues(){
    console.log("Terminados 3000ms");
}

console.log("Hola");


//CALL BACKS ANINADOS (call back hall) PARA QUE SE COMPORTEN DE FORMA ASINCRONA, da lugar a las promesas

// Generar un número aleatorio entre 1 y 6
const randomNumber = Math.floor(Math.random() * 6) + 1;

// Crear promesa la cual resuelve si el número es par y rechaza si es impar
const dadoPromesa = new Promise((resolve, reject) => {
  if (randomNumber % 2 === 0)
    resolve(`El numero '${randomNumber}' es PAR`); // Success
  else reject(`El numero '${randomNumber}' es IMPAR`); // Error
});

// Consumir la promesa
dadoPromesa
  .then(
    (message) => console.log(message) // Success
  )
  .catch((error) => console.error(error)) // Error
  .finally(() => console.log("Fin de la ejecución")); // Finally

function delayPromise(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(message), delay);
  });
}

// Encadenar promesas
delayPromise("Construir Sala", 5000).then((message) => {
  console.log(message);
  delayPromise("Pintar Sala", 3000).then((message) => {
    console.log(message);
    delayPromise("Traer muebles", 2000).then((message) => {
      console.log(message);
    });
  });
});