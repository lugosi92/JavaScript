const nombres = new Set("Pepe", "Juan", "Pedro");

// Ver tamaño del conjunto
console.log(nombres.size);

// Borrar todo el conjunto
nombres.clear();
console.log(nombres.size);

// Añadir elementos al conjunto
nombres.add("Pepe");
nombres.add("Juan");
nombres.add("Pedro");
console.log(nombres.size);

// Ver si existe el elemento
console.log(nombres.has("Pepe"));
console.log(nombres.has("Juan"));

const names = ["Antonio", "Pedro", "Lucas", "Pedro"];
// Añadir una lista
nombres.add(names[0]);
nombres.add(names[1]); // No se añade ya que Pedro está repetido
nombres.add(names[2]);
console.log(nombres.size);

const names2 = [...nombres]; // Pasar de conjunto a lista
console.log(names2);
const names3 = new Set([...names]); // Transformar una lista a conjunto
console.log(names3);
