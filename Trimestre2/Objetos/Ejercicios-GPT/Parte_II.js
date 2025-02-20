//-------------------------------------EJERCICIO 1---------------------------------------------//

console.log("-----1------");
/*Crea una función constructora llamada Vehiculo que tenga las propiedades marca y modelo. 
Luego, crea un método en el prototype que imprima 
"Este vehículo es de marca [marca] y modelo [modelo]". 
Crea una instancia de un vehículo y llama a este método.*/

function Vehiculo(marca, modelo){
    this.marca = marca;
    this.modelo = modelo;
}

Vehiculo.prototype.caracteristicas = function(){
    console.log(`Este vehículo es de marca ${this.marca} y modelo ${this.modelo}`);
}

const mercedes = new Vehiculo("Mercedes" , "Clase A");
mercedes.caracteristicas();

//-------------------------------------EJERCICIO 2---------------------------------------------//

console.log("-----2------");
/*Crea un constructor llamado Animal con la propiedad nombre y 
un método hablar que imprima un mensaje como "El animal [nombre] hace un sonido". 
Luego, crea un constructor Gato que herede de Animal y 
tenga un método adicional maullar que imprima "El gato [nombre] está maullando". 
Crea una instancia de Gato y utiliza ambos métodos.*/


function Animal(nombre){
    this.nombre = nombre;
}

    Animal.prototype.hablar = function(){
        console.log(`El animal ${this.nombre} hace un sonido`);
    }

// Herencia del constructor ANIMAL
function Gato(nombre){
    Animal.call(this, nombre);
}

// Herencia de prototype ANIMAL Object.create();
Gato.prototype = Object.create(Animal.prototype);
// Apuntar al constructor GATO
Gato.prototype.constructor = Gato;


    Gato.prototype.maullar = function(){
        console.log(`El gato ${this.nombre} está maullando`);
    }

const garfield = new Gato("Garfield");
garfield.hablar();
garfield.maullar();


//-------------------------------------EJERCICIO 3---------------------------------------------//

console.log("-----3------");
/*Crea una función constructora Libro que tenga las propiedades titulo, autor y anioPublicacion. 
Luego, añade un método al prototype que calcule la edad del libro en años desde su publicación. 
Crea una instancia de Libro y muestra la edad del libro.*/

function Libro(titulo, autor, anioPublicacion){
    this.titulo = titulo;
    this.autor = autor;
    this.anioPublicacion = anioPublicacion;
}

Libro.prototype.edadLibro = function(){
    const edad = 2025 - this.anioPublicacion;
    console.log(`Los años de publicacion del libro son ${edad} años`);
}

const maquiavelo = new Libro("48 leyes del poder" , "Robert", 1998);

maquiavelo.edadLibro();

//-------------------------------------EJERCICIO 4---------------------------------------------//

console.log("-----4------");
/*Crea una función constructora Coche con las propiedades marca, modelo y precio. 
Luego, agrega un método al prototype llamado precioConDescuento que reciba un porcentaje de descuento 
y calcule el precio con el descuento aplicado. Crea una instancia de Coche y 
muestra el precio con un descuento del 20%.*/

function Coche(marca, modelo, precio){
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
}

Coche.prototype.precioConDescuento = function(descuentoP){

    const descuento = this.precio * descuentoP;
    const precioFinal = this.precio - descuento;

    console.log(`El precio con un descuento del 20% es ${precioFinal}`)
}

const volvo = new Coche("Volvo", "CX-40", 60000);

volvo.precioConDescuento(0.2);

//-------------------------------------EJERCICIO 5---------------------------------------------//

console.log("-----5------");
/*Crea una clase Empleado con propiedades nombre, apellido y salario, 
y un método informar que imprima un mensaje con el nombre, apellido y salario del empleado.
Luego, crea una clase Gerente que herede de Empleado y 
tenga un método adicional reunir que imprima "El gerente [nombre] está en una reunión". 
Crea una instancia de cada clase y llama a sus métodos.*/

class Empleado{

    constructor(nombre, apellido, salario){
        this.nombre = nombre;
        this.apellido = apellido;
        this.salario = salario;
    }
    
    informar(){
        console.log(`El empleado ${this.nombre} ${this.apellido} tiene un salario de ${this.salario}€.`);
    }
}

class Gerente extends Empleado{

    reunir(){
        console.log(`El gerente ${this.nombre} está en una reunión`);
    }
}

const isac = new Empleado("Isac", "Ingles", 17000);
const jesus = new Gerente("Jesus", "Villaverde", 22000);

isac.informar();
jesus.informar();


jesus.reunir();


//-------------------------------------EJERCICIO 6---------------------------------------------//

console.log("-----6------");
/*Utiliza Object.create() para crear una herencia entre los objetos. 
Crea un objeto Vehiculo con una propiedad tipo y un método informarTipo. 
Luego, crea un objeto Coche que herede de Vehiculo y tenga la propiedad puertas. 
Asegúrate de que Coche pueda usar el método informarTipo de Vehiculo.*/

const Vehiculo2 = {
    tipo: "generico",
    informarTipo: function(){
        console.log(`El vehiculo es de tipo ${this.tipo}`);
    }
}

const Coche2 = Object.create(Vehiculo2);

Coche2.puertas = 4;
Coche2.tipo = "Coche";

Coche2.informarTipo();

console.log(Coche2);