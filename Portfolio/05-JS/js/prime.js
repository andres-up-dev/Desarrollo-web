/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  if (typeof n === "undefined" && typeof document !== "undefined") {
    n = document.getElementById("num").value;
  }
  n = parseInt(n);
  var temp = n;
  while (temp % 2 === 0) {
    sequence.push(2);
    temp = temp / 2;
  }
  for (i = 3; i <= Math.sqrt(temp); i = i + 2) {
    while (temp % i === 0) {
      sequence.push(i);
      temp = temp / i;
    }
  }
  if (temp > 2) {
    sequence.push(temp);
  }
  var lbl = null;
  if (typeof document !== "undefined") {
    lbl = document.getElementById("pf");
  }
  if (lbl) {
    lbl.innerHTML = sequence.join(", ");
  }

  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
