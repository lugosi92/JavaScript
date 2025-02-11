/*
  Este programa permite gestionar una lista de jugadores, asignándolos a equipos según su género y posición.
  Los jugadores se cargan desde un archivo csv, se eliminan los duplicados, y luego se distribuyen en los
  equipos de manera equitativa, respetando el número de jugadores necesarios para cada posición (4-3-3).
*/

// Define las posiciones y el número de jugadores requeridos por cada una
const positions = [
  {
    positionName: "portero", // Nombre de la posición
    positionNumber: 1, // Cantidad de jugadores necesarios
  },
  {
    positionName: "defensa",
    positionNumber: 4,
  },
  {
    positionName: "centro",
    positionNumber: 3,
  },
  {
    positionName: "delantero",
    positionNumber: 3,
  },
];

// Obtiene el elemento <body> del HTML para añadir contenido dinámico
const bodyHTML = document.getElementsByTagName("body")[0];

// Lista de equipos posibles, identificados por letras
const posibleTeams = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "M",
  "N",
  "L",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Función para leer un archivo seleccionado por el usuario
async function leerArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result); // Retorna el contenido del archivo
    reader.onerror = (e) => reject(e); // Manejo de errores
    reader.readAsText(file); // Lee el archivo como texto
  });
}

// Función para mostrar contenido en un elemento HTML con id "contenido-archivo"
function mostrarContenido(contenido) {
  var elemento = document.getElementById("contenido-archivo");
  elemento.innerHTML = contenido; // Muestra el contenido dentro del elemento
}

// Evento que se activa al seleccionar un archivo
document.getElementById("file-input").addEventListener(
  "change",
  async (e) => {
    try {
      const archivo = e.target.files[0]; // Obtiene el archivo seleccionado
      if (!archivo) {
        throw new Error("No se ha proporcionado un archivo");
      }
      const contenido = await leerArchivo(archivo); // Lee el contenido del archivo
      const jugadores = removeDuplicateElementsList(contenido, ";"); // Procesa los datos del archivo

      // Muestra los equipos (el bucle comentado es para medir el rendimiento)
      pintarEquipos(jugadores);
    } catch (error) {
      console.error(error); // Manejo de errores
    }
  },
  false
);

// Elimina duplicados en una lista de jugadores y retorna una lista procesada
function removeDuplicateElementsList(contenido, character) {
  const jugadoresString = contenido.split("\r\n"); // Separa las líneas del archivo
  const conj = new Set([...jugadoresString]); // Crea un conjunto para eliminar duplicados
  const newList = [];
  let i = 0;
  conj.delete(""); // Elimina entradas vacías

  // Procesa cada línea y crea un objeto jugador
  conj.forEach((contacto) => {
    const row = contacto.split(character);
    let resultado = {};
    resultado.nombre = row[0];
    resultado.genero = row[1];
    resultado.apellido = row[2];
    resultado.puesto = row[3];
    resultado.equipo = row[4];
    newList[i++] = resultado;
  });

  newList.shift(); // Elimina la primera fila si no contiene datos relevantes
  return newList;
}

// Desordena un array usando el algoritmo Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio
    [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
  }
  return array;
}

// Ordena jugadores por posición y género
function sortPlayersByPositionAndGenre(players, genero) {
  let newList = [];
  const team = players.filter((player) => player.genero === genero); // Filtra por género

  // Agrupa jugadores por posición
  positions.map((position) => {
    let playersPerPosition = team.filter(
      (player) => player.puesto.toLowerCase() === position.positionName
    );
    newList = [...newList, ...playersPerPosition]; // Añade los jugadores al nuevo arreglo
  });

  return newList;
}

// Calcula el número máximo de equipos que se pueden formar
function getNumberOfTeams(players, genero) {
  const sortPlayers = sortPlayersByPositionAndGenre(players, genero);
  let numEquipos = Number.MAX_SAFE_INTEGER;

  // Calcula el mínimo número de equipos basado en los jugadores disponibles por posición
  positions.map((position) => {
    const playersPerPosition = sortPlayers.filter(
      (player) => player.puesto.toLowerCase() === position.positionName
    );
    const actualNumEquipos =
      playersPerPosition.length / position.positionNumber;

    if (actualNumEquipos < numEquipos) numEquipos = actualNumEquipos;
  });

  return Math.trunc(numEquipos); // Devuelve un número entero
}

// Crea una lista de equipos basados en el número calculado
function createTeams(players, genero) {
  const numberTeams = getNumberOfTeams(players, genero);
  let teams = [];
  for (let i = 0; i < numberTeams; i++) teams.push(posibleTeams[i]);
  return teams;
}

// Asigna jugadores a equipos respetando posiciones y géneros
function assignTeams(players, genero, teams) {
  const sortPlayers = sortPlayersByPositionAndGenre(players, genero);
  const newListPlayer = [];

  positions.forEach((position) => {
    const playersPerPosition = sortPlayers.filter(
      (player) => player.puesto.toLowerCase() === position.positionName
    );

    let assignedCount = 0;

    // Distribuye jugadores a los equipos
    teams.forEach((equipo) => {
      let i = 0;
      while (i++ < position.positionNumber) {
        playersPerPosition[assignedCount].equipo = equipo;
        newListPlayer.push(playersPerPosition[assignedCount++]);
      }
    });

    // Marca como "Sin equipo" a los jugadores restantes
    for (let i = assignedCount; i < playersPerPosition.length; i++) {
      playersPerPosition[i].equipo = null;
      newListPlayer.push(playersPerPosition[i]);
    }
  });

  return newListPlayer;
}

// Añade un encabezado a una tabla HTML
function addHeaderHTML(table, thead, content) {
  const newTh = document.createElement("th");
  newTh.innerHTML = content;
  thead.appendChild(newTh); // Añade el encabezado a la tabla
  table.appendChild(thead);
}

// Añade un dato en una fila de la tabla
function addNewElementInARowHTML(value, tr) {
  const newTd = document.createElement("td");
  newTd.innerHTML = value ? value : "Sin equipo"; // Rellena con "Sin equipo" si no hay valor
  tr.appendChild(newTd);
}

// Inserta una tabla HTML con los datos de los jugadores
function insertTableHTML(items) {
  const table = document.createElement("table");
  if (items.length > 0) {
    const thead = document.createElement("thead");

    addHeaderHTML(table, thead, "Nombre");
    addHeaderHTML(table, thead, "Apellido");
    addHeaderHTML(table, thead, "Genero");
    addHeaderHTML(table, thead, "Puesto");
    addHeaderHTML(table, thead, "Equipo");

    items.forEach(({ nombre, genero, apellido, puesto, equipo }) => {
      const newTr = document.createElement("tr");
      addNewElementInARowHTML(nombre, newTr);
      addNewElementInARowHTML(apellido, newTr);
      addNewElementInARowHTML(genero, newTr);
      addNewElementInARowHTML(puesto, newTr);
      addNewElementInARowHTML(equipo, newTr);
      table.appendChild(newTr);
    });
  } else {
    const newTr = document.createElement("tr");
    addNewElementInARowHTML("No hay contactos", newTr);
    table.appendChild(newTr);
  }
  bodyHTML.appendChild(table);
}

// Inserta una leyenda HTML indicando el género y equipo
function insertLegendTHML(genero, equipo) {
  const legendGenero = genero === "F" ? "Femenino" : "Masculino";
  const legendEquipo = equipo !== null ? equipo : "suplentes";
  const legend = document.createElement("legend");
  legend.innerHTML = `Equipo ${legendEquipo} ${legendGenero}`;
  bodyHTML.appendChild(legend);
}

// Control principal para mostrar equipos y suplentes en el DOM
function pintarEquipos(jugadores) {
  const genres = ["F", "M"]; // Géneros disponibles
  let newPlayers = [];
  let playersWithTeam = [];
  let playersWithOutTeam = [];

  genres.forEach((genre) => {
    const teams = createTeams(jugadores, genre);
    console.log(`Numero de equipos ${genre}: ${teams.length}`);
    newPlayers = assignTeams(jugadores, genre, teams);

    // Mostrar equipos con jugadores asignados
    teams.forEach((nameEquipo) => {
      insertLegendTHML(genre, nameEquipo);
      playersWithTeam = newPlayers.filter(
        (player) => player.equipo === nameEquipo
      );
      insertTableHTML(playersWithTeam);
      console.log(playersWithTeam);
    });

    // Mostrar suplentes sin equipo
    insertLegendTHML(genre, null);
    playersWithOutTeam = newPlayers.filter((player) => player.equipo === null);
    insertTableHTML(playersWithOutTeam);
    console.log(`Jugadores reserva ${genre}: \n `, playersWithOutTeam);
  });
}
