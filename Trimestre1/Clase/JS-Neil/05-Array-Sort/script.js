const arr = ["papa", "napa", "ñapa"];
console.log("El array es: " + arr.toString());
arr.sort((a, b) => a.localeCompare(b)); // 
console.log(arr.toString());