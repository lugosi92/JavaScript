const ahora = new Date();

const [day, dayOfweek, month, year, hours, minutes, seconds] = [
  ahora.getDate(),
  ahora.getDay(), // devuelve un dia de la semana entre 0-6
  ahora.getMonth(),
  ahora.getFullYear(),
  ahora.getHours(),
  ahora.getUTCMinutes(),
  ahora.getSeconds(),
];


const getNameMonth = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

const getDaysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

console.log(ahora);
console.log(`${year}/${month + 1}-${getNameMonth[month]}/${getDaysOfWeek[dayOfweek]}-${day}`);
console.log(`${hours}:${minutes}:${seconds}`);
