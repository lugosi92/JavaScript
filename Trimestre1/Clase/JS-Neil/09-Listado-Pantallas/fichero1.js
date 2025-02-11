let monitores = [];
const table = document.getElementsByTagName("table")[0];
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
function previewFile() {
  let stringContent = "";
  let [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // this will then display a text file
      stringContent = reader.result;
      monitores = createArrayPerLine(separateFilePerLine(stringContent));
      console.log(monitores);
      pintarTabla(monitores);
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

function separateFilePerLine(fileString) {
  return fileString.split("\r\n");
}

function createArrayPerLine(monitores) {
  monitores.forEach((monitor, i) => {
    let tempMonitor = monitor.split(" ");
    let resultado = {};

    tempMonitor.forEach((parametro, j) => {
      if (typeof parametro === "string") {
        if (parametro.includes("€") || parametro.includes("$")){
            const moneda = parametro.includes("€") ? "€" : "$";
            parametro = stringParametroToFloat(parametro, moneda);
            resultado.precio = parametro;
            resultado.moneda = moneda;
        } else {
            resultado.nombre = parametro;
        }
      }
    });

    monitores[i] = resultado;
  });
  return monitores;
}

function stringParametroToFloat(string, character) {
  string = string.replace(",", ".");
  string = string.replace(character, "");
  string = parseFloat(string);
  return string;
}

function addNewRow(atrs) {
  const newTr = document.createElement("tr");
  const newTd = document.createElement("td");

  atrs.forEach((atr) => {
    newTd.innerHTML = atr;
    newTr.appendChild(newTd);
  });

  table.appendChild(newTr);
}

function addNewRow(value, tr) {
  const newTd = document.createElement("td");
  newTd.innerHTML = value;
  tr.appendChild(newTd);
}

function addHeader(thead, content) {
  const newTh = document.createElement("th");

  newTh.innerHTML = content;
  thead.appendChild(newTh);

  table.appendChild(thead);
}

function pintarTabla(monitores) {
  if (monitores.length > 0) {
    const thead = document.createElement("thead");

    addHeader(thead, "Nombre");
    addHeader(thead, "Precio");
    addHeader(thead, "Moneda");
    monitores.map(({ nombre, precio, moneda }) => {
      const newTr = document.createElement("tr");

      addNewRow(nombre, newTr);
      addNewRow(precio, newTr);
      addNewRow(moneda, newTr);

      table.appendChild(newTr);
    });
  } else {
    addNewRow("No hay monitores", "");
  }
}
