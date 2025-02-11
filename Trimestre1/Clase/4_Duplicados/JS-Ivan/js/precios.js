p1 = "12,56€";
p2 = "7,25€";
p3 = "36,73€";
p1_suma = parseFloat(p1.replace(",", "."));
p2_suma = parseFloat(p2.replace(",", "."));
p3_suma = parseFloat(p3.replace(",", "."));

console.log(p1);
console.log(p2);
console.log(p3);


 total = (p1_suma + p2_suma + p3_suma);
 total_string=total.toString();
 total_p=total_string.replace(".",",");


console.log(total);

document.getElementById("p1").innerHTML =  p1;
document.getElementById("p2").innerHTML =  p2 ;
document.getElementById("p3").innerHTML =  p3 ;
document.getElementById("total").innerHTML =  total_p+"€" ;



