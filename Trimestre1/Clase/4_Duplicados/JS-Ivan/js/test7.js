// Obtener la fecha y hora actual
const ahora = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Obtener día, mes y año actuales
const diaSemana = dias[ahora.getDay()];   // Día de la semana en español
const diaMes = ahora.getDate();           // Día del mes
const mes = meses[ahora.getMonth()];      // Mes en español
const año = ahora.getFullYear();          // Año completo

// Mostrar la fecha completa en una sola línea
console.log(`${diaSemana}, ${diaMes} de ${mes} de ${año}`); 
 