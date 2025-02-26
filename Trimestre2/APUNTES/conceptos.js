// Objetos en JavaScript
// 📌 1. Concepto
// Un objeto es una estructura que almacena datos y 
// métodos relacionados en pares clave-valor.

const persona1 = {
    nombre: "Juan",
    edad: 30,
    saludar: function() {
        console.log(`Hola, soy ${this.nombre}`);
    }
};

persona.saludar(); // Hola, soy Juan


// 📌 2. Propiedades y métodos
// Las propiedades son los datos dentro del 
// objeto, y los métodos son funciones dentro del objeto.

const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    arrancar: function() {
        console.log("El coche ha arrancado.");
    }
};

console.log(coche.marca); // Toyota
coche.arrancar(); // El coche ha arrancado.


// 📌 3. Clave - valor
// Cada propiedad en un objeto se 
// define como un par clave-valor.

const alumno = {
    nombre: "Ana",
    edad: 22,
    curso: "JavaScript"
};

console.log(alumno["curso"]); // JavaScript

// 📌 4. Cómo crear un objeto
// Puedes crear un objeto con literales, el constructor Object(), o clases.

const perro = {}; // Objeto vacío
const gato = new Object(); // Constructor Object()

// 📌 5. Agregar, modificar y eliminar propiedades

const persona2 = { nombre: "Carlos" };
persona.edad = 28; // Agregar propiedad
persona.nombre = "Luis"; // Modificar propiedad
delete persona.edad; // Eliminar propiedad

console.log(persona2); // { nombre: "Luis" }


// 📌 6. Objeto This

const usuario = {
    nombre: "Pedro",
    mostrarNombre: function() {
        console.log(this.nombre);
    }
};

usuario.mostrarNombre(); // Pedro


// 📌 7. Recorrer las propiedades de un objeto

const libro = { titulo: "1984", autor: "Orwell", año: 1949 };

for (let clave in libro) {
    console.log(`${clave}: ${libro[clave]}`);
}


// 📌 8. Borrar propiedades de objetos


const coche1 = { marca: "Ford", modelo: "Fiesta" };
delete coche.modelo;

console.log(coche1); // { marca: "Ford" }

// 📌 9. Constructores

function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

const juan = new Persona("Juan", 25);
console.log(juan.nombre); // Juan

// 📌 10. Prototipos y herencia

function Animal(nombre) {
    this.nombre = nombre;
}

Animal.prototype.hablar = function() {
    console.log(`${this.nombre} hace un sonido.`);
};

const perro6 = new Animal("Bobby");
perro.hablar(); // Bobby hace un sonido.


// 🔹 BOM (Browser Object Model)
// 📌 1. Objeto window

console.log(window.innerWidth); // Ancho de la ventana


// 📌 2. Objeto navigator

console.log(navigator.userAgent); // Info del navegador

// 📌 3. Objeto screen

console.log(screen.width); // Ancho de la pantalla


// 📌 4. Objeto location

console.log(location.href); // URL actual

// 📌 5. Objeto history

history.back(); // Volver atrás en la navegación

// 🔹 DOM (Document Object Model)
// 📌 1. Concepto

console.log(document.title); // Título de la página

// 📌 2. Node Tree (Árbol de Nodos)

console.log(document.documentElement); // Nodo raíz

// 📌 3. Objeto document

console.log(document.body); // Acceder al <body>

// 📌 4. Tipos de nodos

console.log(document.body.nodeType); // 1 = Elemento

// 📌 5. Métodos principales

document.getElementById("miElemento");
document.getElementsByTagName("p");
document.getElementsByClassName("clase");
document.querySelector(".miClase");
document.querySelectorAll("p");

// 📌 6. Manipulación del DOM

document.getElementById("miTexto").textContent = "Nuevo contenido";

// 📌 7. Navegación por el DOM

console.log(document.body.firstChild);
console.log(document.body.parentNode);

// 📌 8. Creación/eliminación de elementos

let nuevo = document.createElement("p");
nuevo.textContent = "Hola!";
document.body.appendChild(nuevo);
document.body.removeChild(nuevo);

// 📌 9. Temporizadores

setTimeout(() => console.log("Hola después de 2s"), 2000);

// 🔹 Eventos
// 📌 1. Captura de eventos

document.getElementById("btn").addEventListener("click", () => {
    alert("Botón clickeado!");
});


// 📌 2. Propagación de eventos (Burbuja)

document.getElementById("padre").addEventListener("click", () => {
    console.log("Evento en el padre");
}, true);

// 📌 3. Anular eventos

document.getElementById("link").addEventListener("click", (e) => {
    e.preventDefault();
});


// 🔹 Programación Asíncrona
// 📌 1. Concepto de asincronía

console.log("Inicio");
setTimeout(() => console.log("Tarea asíncrona"), 2000);
console.log("Fin");

// 📌 2. Callback

function operacion(callback) {
    setTimeout(() => callback("Operación completada"), 1000);
}

operacion((mensaje) => console.log(mensaje));

// 📌 3. Promesas

let promesa = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Éxito"), 2000);
});

promesa.then(res => console.log(res)).catch(err => console.error(err));

// 📌 4. Encadenamiento de promesas

promesa.then(res => {
    console.log(res);
    return "Siguiente paso";
}).then(console.log);


// 📌 5. Async/Await

async function obtenerDato() {
    let resultado = await promesa;
    console.log(resultado);
}

obtenerDato();