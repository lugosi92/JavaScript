function calculator() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    
    if (isNaN(num1) || isNaN(num2)) {
      alert("Please enter valid numbers");
      return false;
    } else {
      let result = eval(num1 + "+" + num2);
      document.getElementById("result").innerHTML = result;
    }
  }

