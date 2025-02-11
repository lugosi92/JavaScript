const list = [1, 14, 31, 30, 15];

const date = new Date();
const dayOfMonth = date.getDate();

const message = list.includes(dayOfMonth)
  ? `El cumple ${dayOfMonth} ESTÁ en la lista`
  : `El cumple ${dayOfMonth} NO ESTÁ en la lista`;
console.log("Hoy es " + dayOfMonth);
console.log(message);
