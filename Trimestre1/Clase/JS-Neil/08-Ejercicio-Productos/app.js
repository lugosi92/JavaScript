/**
 * Imprimir los productos (dados en string) en el html y ponerlos en una tabla
 * Si son mas de 5 productos, se te regala el más barato
 * Poner la fecha y hora
 * Añadir el nombre y el DNI
 * Si el DNI tiene letra se verifica y si no tiene se añade
 */

const productos = ["12,56 €", "7,25 €", "36,73 €", "11,90 €", "10,8 €"];
const table = document.getElementsByTagName("table")[0];

pintarFecha();
pintarTabla();
pintarNombreDNI("Neil Molina", "1414113");

function parseFloatProd(prod) {
  prod = prod.replace(",", ".");
  prod = prod.replace("€", "");
  prod = parseFloat(prod);
  return prod;
}

function prodToString(prod) {
  let prodToString = prod.toString();
  prodToString = prodToString.replace(".", ",");
  return prodToString + " €";
}

function parseFloatArrayProd() {
  const floatProductos = [];
  for (let i = 0; i < productos.length; i++) {
    floatProductos[i] = parseFloatProd(productos[i]);
  }

  return floatProductos;
}

function addTableElement(title, prod) {
  const newTr = document.createElement("tr");
  const newTh = document.createElement("th");
  const newTd = document.createElement("td");

  newTh.innerHTML = title;
  newTd.innerHTML = prod;

  // EL ORDEN DE IMPORTANCIA AL AÑADIR EN EL DOM:
  // 1- se añade los hijos del tr
  // 2- se añade el tr a la tabla que está ya definida en el html
  newTr.appendChild(newTh);
  newTr.appendChild(newTd);

  table.appendChild(newTr);
}

function generarPromocion(total) {
  const title = "Promoción";
  if (productos.length >= 5) {
    const prodBarato = Math.min(...parseFloatArrayProd());
    total -= prodBarato;
    addTableElement(title, prodToString(prodBarato));
    addTableElement("Total con descuento", prodToString(total));
  } else {
    addTableElement(title, "No hay promoción");
  }
}

function pintarTabla() {
  let total = 0;
  let numero = 0;
  if (productos.length > 0) {
    for (let i = 0; i < productos.length; i++) {
      numero = parseFloatProd(productos[i]);
      total += numero;
      addTableElement(`Producto ${i + 1}`, productos[i]);
    }

    addTableElement("Total", prodToString(total));
    generarPromocion(total);
  } else {
    addTableElement("No hay productos", "Añade tus productos en el carrito");
  }
}

function pintarFecha() {
  const date = new Date();
  let h2 = document.getElementsByTagName("h2")[0];
  h2.innerHTML = `Fecha: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  h2 = document.getElementsByTagName("h2")[1];
  h2.innerHTML = `Hora: ${date.getHours()}:${date.getMinutes()}`;
}

function validarDNI(dni) {
  // Verificar si la longitud es de 9
  const size = dni.length;
  let eightCharacters = "";
  let count = 0;
  const letras = [
    "T",
    "R",
    "W",
    "A",
    "G",
    "M",
    "Y",
    "F",
    "P",
    "D",
    "X",
    "B",
    "N",
    "J",
    "Z",
    "S",
    "Q",
    "V",
    "H",
    "L",
    "C",
    "K",
    "E",
  ];

  // Verificar la longitud del DNI
  switch (size) {
    case 7:
      eightCharacters = "0".concat(dni);
      break;
    case 8:
      eightCharacters = dni;
      break;
    case 9:
      eightCharacters = dni.substring(0, size - 1);
      break;
    default:
      return "La longitud no es válida";
  }

  // Validar que los primeros 8 caracteres sean números
  while (count < eightCharacters.length) {
    if (isNaN(eightCharacters[count])) return "Hay una letra en mitad del dni";
    count++;
  }

  if (letras[parseInt(eightCharacters) % 23] !== dni.charAt(size - 1)) {
    const letraCorrecta = letras[parseInt(eightCharacters) % 23];
    if (size === 8 || size === 7) dni = dni + letraCorrecta;
    else dni = dni.replace(dni.charAt(size - 1), letraCorrecta);
  }

  return dni;
}

function pintarNombreDNI(nombre, dni) {
  let h2 = document.getElementsByTagName("h2")[2];
  h2.innerHTML = `Nombre: ${nombre}`;
  h2 = document.getElementsByTagName("h2")[3];
  h2.innerHTML = `DNI: ${validarDNI(dni)}`;
}
