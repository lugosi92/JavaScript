/*----------------Pregunta 1: Conjuntos y Operaciones Avanzadas----------------*/

const conjunto1 = new Set([10, 20, 30, 40, 50]);
const conjunto2 = new Set([30, 40, 50, 60, 70]);

const interseccion = new Set([...conjunto1].filter(e => conjunto2.has(e)));
const union = new Set([...conjunto1, ...conjunto2]);
const diferencia = new Set([...conjunto2].filter(e => !conjunto1.has(e)));

console.log(interseccion.size, union.size, diferencia.size);
/*-----------------Pregunta 2: Funciones y Promesas con async/await---------------*/
function retraso(ms) {
    return new Promise(resolve => setTimeout(() => resolve(ms * 2), ms));
  }
  
  async function calcularResultados() {
    let resultado = 0;
    for (let i = 1; i <= 3; i++) {
      resultado += await retraso(i * 100);
    }
    return resultado;
  }
  
  calcularResultados().then(respuesta => console.log(respuesta));
  
/*----------------Pregunta 3: Destructuring y Manipulación de Datos Avanzada----------------*/
const datos = { p: 5, q: 10, r: 15, s: 20 };

const { p, ...resto } = datos;
const resultado2 = Object.values(resto).filter(v => v > 10).reduce((acc, v) => acc + v, 0);

console.log(resultado);

/*----------------Pregunta 4: Bucles y Control de Flujo Modificado---------------*/
let numeros1 = [];
for (let i = 1; i < 15; i++) {
  if (i % 3 === 0) {
    numeros.push(i);
    if (i > 9) break;
  }
}

console.log(numeros);//3,6,9

/*----------------Pregunta 5: Arrays y Operaciones Combinadas---------------*/
const numeros = [2, 4, 6, 8];
const resultado = numeros.map(x => x + 1).filter(x => x % 3 === 0).reduce((acc, x) => acc + x, 0);

console.log(resultado);

/*-----------------Pregunta 6: Bucles Asíncronos y Operaciones-----------------*/
function esperar(ms) {
    return new Promise(resolve => setTimeout(() => resolve(ms * 2), ms));
  }
  
  async function ejecutar() {
    let resultados = [];
    for (let i = 1; i <= 4; i++) {
      const valor = await esperar(i * 100);
      resultados.push(valor);
    }
    console.log(resultados);
  }
  
  ejecutar();
  
/*---------------Pregunta 7: this en Diferentes Contextos---------------*/
const obj = {
    nombre: 'Khaled',
    saludar: function() {
      return `Hola, soy ${this.nombre}`;
    },
    despedir: () => {
      return `Adiós, soy ${this.nombre}`;
    }
  };
  
  console.log(obj.saludar());
  console.log(obj.despedir());
  